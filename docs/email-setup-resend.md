# Setup de Resend (proveedor primario)

Resend es la primera opción que usa el sitio para mandar los emails de los formularios (`/api/contact` y `/api/join-us`). Si `RESEND_API_KEY` está seteada, el código toma esta rama; si no, cae al fallback de Gmail (ver `email-setup-gmail.md`).

## 1. Crear cuenta y API key

1. Ir a <https://resend.com> y registrarse (Google / GitHub / email).
2. En el dashboard: **API Keys → Create API Key**.
   - Name: `web-moob-2026 (local)` o `web-moob-2026 (prod)` según el entorno.
   - Permission: **Sending access** (no hace falta full access).
   - Domain: dejar "All domains" si todavía no verificaste el dominio; sino, restringir a `memoob.com`.
3. Copiar la key (`re_...`). Se muestra una sola vez.

## 2. Verificar el dominio `memoob.com`

Sin dominio verificado, Resend sólo permite enviar desde `onboarding@resend.dev` y sólo al email del owner de la cuenta. Para producción hay que verificar.

1. **Domains → Add Domain** → ingresar `memoob.com`.
2. Resend muestra los registros DNS a cargar en el proveedor del dominio (Cloudflare, Namecheap, GoDaddy, etc.):
   - **MX** (sólo si se quiere recibir bounces en Resend; opcional)
   - **TXT (SPF)**: `v=spf1 include:amazonses.com ~all` (o el que muestre Resend)
   - **TXT (DKIM)**: hay 1–3 registros tipo `resend._domainkey.memoob.com`
   - **TXT (DMARC)** (opcional pero recomendado): `v=DMARC1; p=none;`
3. Guardar en el panel DNS y volver a Resend → **Verify DNS Records**. Tarda entre minutos y unas horas en propagar.
4. Cuando los tres registros estén en verde, el dominio queda "Verified" y se puede enviar desde cualquier dirección `@memoob.com`.

## 3. Configurar la variable de entorno

En `.env.local` (no commitear) agregar:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=hola@memoob.com
JOIN_US_TO_EMAIL=hola@memoob.com
```

`CONTACT_TO_EMAIL` y `JOIN_US_TO_EMAIL` son las casillas a las que llegan los formularios. Si no se setean, se usa `hola@memoob.com` por default (ver `src/app/api/contact/route.ts` y `src/app/api/join-us/route.ts`).

Para producción en Vercel: **Project → Settings → Environment Variables** y agregar las mismas keys en `Production` (y `Preview` si se quiere probar PRs).

## 4. Validar el envío

1. Limpiar cache de Next y arrancar dev:
   ```bash
   rm -rf .next
   pnpm dev
   ```
2. Abrir `http://localhost:3000`, sección "Hablemos", completar el form, enviar.
3. En la consola del server debería loguear:
   ```
   [email] using resend
   ```
4. Esperado: toast "¡Mensaje enviado!" y `POST /api/contact 200`.
5. Revisar la casilla configurada en `CONTACT_TO_EMAIL`. También llega un auto-reply al email cargado en el form.

## 5. Probar sin verificar dominio (atajo dev)

Si todavía no propagaron los DNS pero se quiere validar end-to-end:

1. En `src/app/api/contact/route.ts` cambiar temporalmente:
   ```ts
   const FROM = 'Moob <onboarding@resend.dev>'
   ```
2. En `.env.local`, setear `CONTACT_TO_EMAIL` al **email del owner de la cuenta de Resend** (es la única dirección a la que Resend permite enviar desde el remitente de sandbox).
3. Probar el form. Cuando termine la validación de dominio, revertir `FROM` a `'Web Moob <web@memoob.com>'`.

## 6. Errores comunes

| Error en log                                         | Causa                                      | Fix                                                       |
| ---------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| `validation_error: The from address is not verified` | Dominio del `FROM` no verificado en Resend | Verificar dominio (paso 2) o usar `onboarding@resend.dev` |
| `restricted_api_key`                                 | API key con permisos insuficientes         | Crear key con "Sending access"                            |
| `missing_api_key`                                    | `RESEND_API_KEY` no se cargó               | Reiniciar `pnpm dev` después de editar `.env.local`       |
| `rate_limit_exceeded`                                | Plan gratis: 100 emails/día, 3 req/s       | Esperar o pasar a plan pago                               |
| `403` sin detalle                                    | Email destino no verificado en sandbox     | Verificar dominio en Resend                               |

## 7. Monitoreo

- Resend dashboard → **Emails**: muestra cada envío, bounces, opens, clicks.
- Recomendado en prod: activar **Webhooks** (Settings → Webhooks) para que Resend avise bounces/complaints a un endpoint propio.

## Referencias

- Docs Resend: https://resend.com/docs
- Verificar dominio: https://resend.com/docs/dashboard/domains/introduction
- API send: https://resend.com/docs/api-reference/emails/send-email
- SDK Node: https://resend.com/docs/send-with-nodejs
