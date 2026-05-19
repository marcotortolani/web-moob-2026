# Setup de Gmail + Nodemailer (fallback)

Si no hay `RESEND_API_KEY` en el entorno, el sitio cae a esta rama: SMTP de Gmail vía Nodemailer (`src/lib/email/sender.ts`). Sirve para desarrollo local o como respaldo si Resend está caído.

**Importante**: Gmail SMTP **no permite spoofear el remitente**. Aunque el código pase `from: 'Web Moob <web@memoob.com>'`, Gmail reescribe el `From` con la cuenta autenticada (`GMAIL_USER`). Por eso para producción conviene Resend con dominio verificado; Gmail queda como conveniencia de dev.

## 1. Prerequisitos en la cuenta de Google

Gmail rechaza el password normal vía SMTP desde 2022. Hay que usar un **App Password**, y para generarlo la cuenta necesita 2FA habilitado.

1. Decidir qué cuenta enviará los mails (ej.: `noreply@memoob.com` si es Workspace, o una cuenta `@gmail.com` de la agencia).
2. Activar 2-Step Verification:
   - Ir a <https://myaccount.google.com/security>
   - Sección "How you sign in to Google" → **2-Step Verification** → **Turn on**.
   - Seguir el flujo (teléfono SMS o app autenticadora).
3. Verificar que esté en estado **On** antes de continuar.

## 2. Generar un App Password

1. Ir a <https://myaccount.google.com/apppasswords>
   - Si el link te redirige a `/security` sin mostrar la página de App Passwords, es porque 2FA no está activado todavía. Volver al paso 1.
2. **App name**: `Moob Web` (o el nombre que prefieras; es sólo para identificarlo).
3. Click **Create**.
4. Google muestra un código de **16 caracteres** alfanuméricos agrupados como `xxxx xxxx xxxx xxxx`. **Copialo sin los espacios** → `xxxxxxxxxxxxxxxx`.
5. El código sólo se muestra una vez. Si lo perdés, revocá el viejo y generá uno nuevo.

## 3. Configurar variables de entorno

En `.env.local`:

```env
GMAIL_USER=tu-cuenta@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=hola@memoob.com
JOIN_US_TO_EMAIL=hola@memoob.com
```

Reglas:

- `GMAIL_USER` debe ser exactamente la cuenta que generó el App Password (no un alias).
- `GMAIL_APP_PASSWORD` va **sin comillas** y **sin espacios** (los 16 caracteres seguidos).
- Si Resend también está configurado, `RESEND_API_KEY` gana. Para forzar la rama de Gmail en dev, comentar `RESEND_API_KEY` con `#`.

## 4. Workspace (cuentas con dominio propio)

Si `GMAIL_USER` es una cuenta de Google Workspace (`@memoob.com`), además de 2FA + App Password el admin del dominio tiene que:

1. Entrar al **Admin Console** (<https://admin.google.com>).
2. **Apps → Google Workspace → Gmail → User settings → Less secure apps**: dejar en "Allow users to manage their access to less secure apps".
3. Verificar que **SMTP** esté habilitado para la unidad organizativa: **Apps → Google Workspace → Gmail → End User Access → POP and IMAP** = ON.
4. (Opcional) Para envíos masivos, configurar **SMTP relay service** en `Apps → Google Workspace → Gmail → Routing → SMTP relay service`. No es necesario para el volumen de los formularios.

Si la cuenta es Workspace y nada de esto funciona, lo más rápido es pasar a Resend.

## 5. Validar el envío

1. Limpiar cache y arrancar:
   ```bash
   rm -rf .next
   pnpm dev
   ```
2. Submit del formulario en `http://localhost:3000`.
3. En consola del server debería aparecer:
   ```
   [email] using nodemailer gmail
   ```
4. Esperado: toast "¡Mensaje enviado!" y `POST /api/contact 200`.
5. Revisar:
   - La casilla `CONTACT_TO_EMAIL`: llega el mail desde `GMAIL_USER`.
   - El email cargado en el form: llega el auto-reply.
   - En la cuenta `GMAIL_USER`, carpeta **Sent**: deberían aparecer los dos envíos.

## 6. Errores comunes

| Error en log                                                             | Causa                                                                 | Fix                                                                                        |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Error: Invalid login: 535-5.7.8 Username and Password not accepted`     | App Password mal copiado, cuenta sin 2FA, o usuario/password mismatch | Regenerar App Password, copiar sin espacios, confirmar que `GMAIL_USER` es la misma cuenta |
| `Error: Invalid login: 534-5.7.9 Application-specific password required` | La cuenta tiene 2FA pero estás mandando la password normal            | Generar App Password (paso 2)                                                              |
| `Error: Missing credentials for "PLAIN"`                                 | `GMAIL_USER` o `GMAIL_APP_PASSWORD` no se cargaron                    | Reiniciar `pnpm dev` después de editar `.env.local`                                        |
| `Error: getaddrinfo ENOTFOUND smtp.gmail.com`                            | Sin conexión / firewall bloquea SMTP puerto 587                       | Probar otra red                                                                            |
| `Error: self signed certificate in certificate chain`                    | TLS interceptado (VPN corporativa)                                    | Salir de la VPN o usar Resend                                                              |
| Mail enviado pero llega a Spam                                           | `From` no coincide con `GMAIL_USER` y no hay SPF/DKIM del dominio     | Usar Resend con dominio verificado para prod                                               |

## 7. Límites de Gmail

- Gmail gratis: ~500 destinatarios por día por cuenta.
- Workspace: ~2.000 destinatarios por día.
- Si se superan, Gmail bloquea la cuenta 24 hs. Para el volumen de un formulario de contacto está sobrado, pero **no usar Gmail para newsletters o campañas**.

## Referencias

- App Passwords (Google): https://support.google.com/accounts/answer/185833
- Nodemailer + Gmail: https://nodemailer.com/usage/using-gmail/
- Límites de envío Gmail: https://support.google.com/a/answer/166852
