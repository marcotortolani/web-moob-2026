# Setup de envío de mails

Este doc explica cómo está implementado el envío de mails del sitio (formularios de contacto y join-us), por qué se hizo así, y qué falta configurar.

## Contexto del cambio

### El problema original

Los endpoints `/api/contact` y `/api/join-us` enviaban mails vía **Nodemailer + Gmail SMTP**, autenticándose con una _app password_ generada en la cuenta `hola@memoob.com`. El form se rompió (502 Bad Gateway) cuando alguien con acceso a esa cuenta desactivó la verificación en 2 pasos: Google invalida automáticamente todas las app passwords cuando se baja la 2FA.

Diagnóstico: el envío depende de la configuración de seguridad de una cuenta humana compartida. Cualquiera con acceso al mailbox puede romperlo sin saberlo.

### La solución

Reemplazar Gmail por servicios transaccionales que se autentican con **API keys** (revocables desde dashboards propios, independientes de configuraciones de seguridad de Gmail).

Se integraron dos providers con la misma abstracción:

| Provider | Rol | Free tier | Requisitos |
|----------|-----|-----------|------------|
| **Resend** | Primario (cuando se tenga DNS) | 3.000/mes | Dominio verificado vía 3 registros DNS |
| **Brevo** | Activo ahora (sin DNS) | 300/día | Single sender verificado por click |

Nodemailer y Gmail quedaron eliminados completamente del código y del `package.json`.

## Arquitectura

### Archivos relevantes

- `src/lib/email/sender.ts` — abstracción única `sendEmail(opts)` y helper `getFromAddress()`. Selecciona el provider según env vars.
- `src/lib/email/resend.ts` — wrapper de `new Resend(apiKey)`.
- `src/lib/email/brevo.ts` — wrapper de la API REST de Brevo (`https://api.brevo.com/v3/smtp/email`) vía `fetch`. Convierte attachments de Buffer a base64.
- `src/app/api/contact/route.ts` — endpoint del form de contacto. Usa `getFromAddress()` + `sendEmail()`.
- `src/app/api/join-us/route.ts` — endpoint del form de join-us. Mismo patrón, soporta CV PDF hasta 5 MB.

### Selección de provider

`sendEmail()` decide qué provider usar en este orden:

1. Si `RESEND_API_KEY` está definido → **Resend**.
2. Si no, si `BREVO_API_KEY` está definido → **Brevo**.
3. Si no hay ninguna, tira error 500.

**Limitación conocida:** hoy NO existe un override explícito (`EMAIL_PROVIDER`) en el código. Si están las dos keys seteadas, Resend siempre gana, aunque esté bloqueado por sandbox. Para usar Brevo hay que **NO setear `RESEND_API_KEY`** mientras tanto. Ver sección "Pendiente / Mejoras".

### Formato de FROM

`getFromAddress()` devuelve el FROM según el provider activo:

- Resend activo → `process.env.RESEND_FROM_EMAIL` (o `Web Moob <onboarding@resend.dev>` por default).
- Brevo activo → `process.env.BREVO_FROM_EMAIL` (o `Web Moob <hola@memoob.com>` por default).
- Sin provider → `Web Moob <web@memoob.com>` (fallback, en la práctica nunca se usa porque `sendEmail()` ya tiró error).

Las routes nunca hardcodean el FROM. Reply-to siempre apunta al email del usuario que envió el form.

## El bloqueo con Resend (importante)

**Resend en modo sandbox (sin dominio verificado) restringe los destinatarios al email del titular de la cuenta.** Sí permite usar `onboarding@resend.dev` como FROM, pero el TO debe ser la dirección del titular (en nuestro caso, `marco-ext@memoob.com`). No deja enviar a `hola@memoob.com` ni a usuarios del form.

Error recibido al testear local con Resend activo:

```
[email] using resend
[contact] send failed: Error: validation_error: You can only send testing emails
to your own email address (marco-ext@memoob.com). To send emails to other recipients,
please verify a domain at resend.com/domains, and change the `from` address to an
email using this domain.
```

**Mientras no tengamos acceso al DNS de `memoob.com`, Resend no es usable** — ni en local ni en producción. La restricción se levanta solo verificando el dominio (3 registros DNS: SPF, DKIM, return-path).

## Estado actual

- ✅ Código refactorizado (sender.ts, brevo.ts, contact, join-us, package.json).
- ✅ Nodemailer y `@types/nodemailer` desinstalados.
- ✅ Cuenta Resend creada, `RESEND_API_KEY` generada con scope "All domains".
- ⚠️ Resend bloqueado por sandbox (sin DNS verificado).
- ❌ Brevo no configurado todavía.
- ❌ `GMAIL_USER` y `GMAIL_APP_PASSWORD` aún presentes en Vercel — deben borrarse cuando Brevo esté activo.

## Qué falta hacer (orden de ejecución)

### 1. Configurar Brevo (para usar HOY, sin DNS)

1. Crear cuenta en https://www.brevo.com.
2. **Verificar single sender**: Brevo Dashboard → **Senders, Domains & Dedicated IPs** → **Senders** → **Add a sender**:
   - From name: `Moob`
   - From email: `hola@memoob.com`
   - Llega un email de verificación a esa inbox → click en el link. Una sola vez, sin DNS.
3. Generar API key: Brevo → **SMTP & API** → **API Keys** → **Generate a new API key** → nombre `web-moob-2026` → copiar la key (solo se muestra una vez).
4. **Local** (`.env.local`):
   ```
   BREVO_API_KEY=xkeysib-...
   BREVO_FROM_EMAIL=Moob <hola@memoob.com>
   # Comentar o borrar RESEND_API_KEY mientras Resend no funcione:
   # RESEND_API_KEY=re_...
   ```
   Reiniciar `next dev`.
5. **Vercel** (Settings → Environment Variables, scope: Production + Preview + Development):
   - Agregar `BREVO_API_KEY` y `BREVO_FROM_EMAIL`.
   - **Borrar** `RESEND_API_KEY` (o renombrar temporalmente a `_RESEND_API_KEY`) para que la prioridad caiga a Brevo.
   - Borrar `GMAIL_USER` y `GMAIL_APP_PASSWORD`.

### 2. Verificación tras configurar Brevo

- Local: enviar contact form desde `localhost:3000` → log debe decir `[email] using brevo` → mail debe llegar a `hola@memoob.com`.
- Local: enviar join-us con CV PDF (<5 MB) → debe llegar con el adjunto.
- Local: probar CV >5 MB → debe responder 400 sin tocar Brevo (validación en `join-us/route.ts`).
- Producción: repetir en deploy de preview antes de promote a production.
- Brevo Dashboard → Transactional → Logs → confirmar status `delivered`, sin bounces.

### 3. Migración a Resend (cuando se obtenga DNS de `memoob.com`)

1. Resend Dashboard → **Domains** → **Add Domain** → `memoob.com` → agregar los 3 registros DNS → esperar verificación (5-30 min).
2. En Vercel:
   - Re-habilitar `RESEND_API_KEY`.
   - Cambiar `RESEND_FROM_EMAIL` a `Web Moob <web@memoob.com>`.
3. Como `RESEND_API_KEY` gana sobre `BREVO_API_KEY` por prioridad en `sender.ts`, Resend vuelve a ser primario automáticamente. Brevo queda armado como switch manual de emergencia (basta con borrar `RESEND_API_KEY` para volver a Brevo).
4. Probar en preview antes de production.

## Pendiente / Mejoras

- **Override explícito de provider**: agregar soporte para `EMAIL_PROVIDER=resend|brevo` en `src/lib/email/sender.ts`, de forma que se pueda tener las dos keys seteadas al mismo tiempo y elegir cuál usar sin tener que borrar la otra. Quedó fuera del scope en esta iteración.
- **Auto-fallback ante error de red**: si Resend devuelve 5xx o timeout, reintentar con Brevo. Suma resiliencia pero complica métricas y debugging. Evaluar si el volumen lo justifica.
- **Atribución del FROM en Brevo**: el sender verificado debe coincidir EXACTO con `BREVO_FROM_EMAIL` (Brevo rechaza el envío si difiere). Documentar si se cambia.

## Variables de entorno (referencia)

| Var | Cuándo se usa | Ejemplo |
|-----|--------------|---------|
| `RESEND_API_KEY` | Resend activo | `re_xxx` |
| `RESEND_FROM_EMAIL` | FROM cuando Resend activo | `Web Moob <web@memoob.com>` (con DNS verificado) |
| `BREVO_API_KEY` | Brevo activo (cuando no hay `RESEND_API_KEY`) | `xkeysib-xxx` |
| `BREVO_FROM_EMAIL` | FROM cuando Brevo activo | `Moob <hola@memoob.com>` (debe matchear sender verificado en Brevo) |
| `CONTACT_TO_EMAIL` | Destinatario del form de contacto | `hola@memoob.com` (default si no se setea) |
| `JOIN_US_TO_EMAIL` | Destinatario del form de join-us | `hola@memoob.com` (default si no se setea) |
| ~~`GMAIL_USER`~~ | Removido | — |
| ~~`GMAIL_APP_PASSWORD`~~ | Removido | — |

## Historia del incidente (2026-05-19)

- **Síntoma**: form de contacto empieza a tirar 502 en producción.
- **Causa raíz**: alguien con acceso a `hola@memoob.com` desactivó la verificación en 2 pasos. Google invalidó la app password de Nodemailer.
- **Decisión**: migrar a providers con auth por API key (Resend + Brevo). Eliminar Gmail/Nodemailer.
- **Bloqueo descubierto al testear**: Resend en sandbox restringe destinatarios al titular de la cuenta. Brevo no tiene esa restricción. Se prioriza Brevo hasta tener DNS.
- **Próximo paso**: configurar Brevo end-to-end y validar en producción. Cuando se obtenga acceso al DNS de `memoob.com`, verificar el dominio en Resend y promoverlo a primario.
