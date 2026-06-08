# Google OAuth Setup Guide

Complete instructions for setting up Google OAuth 2.0 for the Task Manager application.

## 📋 Prerequisites

- Google Account
- Access to Google Cloud Console
- Application running on localhost:5000

## 🔧 Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the **Project** dropdown at the top
3. Click **NEW PROJECT**
4. Enter project name: "Task Manager"
5. Click **CREATE**

### 2. Enable OAuth 2.0 API

1. In the left sidebar, click **APIs & Services**
2. Click **Library**
3. Search for "Google+ API"
4. Click on it
5. Click **ENABLE**

Wait for the API to be enabled.

### 3. Create OAuth Consent Screen

1. In left sidebar, click **OAuth consent screen**
2. Select **External** user type
3. Click **CREATE**

Fill in the form:

**App Information:**
- App name: `Task Manager`
- User support email: (your email)
- Developer contact: (your email)

**Scopes:**
- Click **ADD OR REMOVE SCOPES**
- Add these scopes:
  - `email`
  - `profile`
- Click **UPDATE** and **SAVE AND CONTINUE**

**Test Users:**
- Click **ADD USERS**
- Add your Google account email
- Click **ADD**
- Click **SAVE AND CONTINUE**

### 4. Create OAuth Credentials

1. In left sidebar, click **Credentials**
2. Click **+ CREATE CREDENTIALS**
3. Select **OAuth client ID**
4. Choose **Web application**

**Configure:**
- Name: `Task Manager Web Client`
- **Authorized JavaScript origins:** Add:
  - `http://localhost:5000`
  - `http://localhost:3000`
  
- **Authorized redirect URIs:** Add:
  - `http://localhost:5000/api/auth/google/callback`

5. Click **CREATE**

A popup appears with your credentials:
```
Client ID: xxxxxxxxxxxxxxxx.apps.googleusercontent.com
Client Secret: xxxxxxxxxxxxxxxx
```

### 5. Update .env File

Copy your credentials to `server/.env`:

```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 6. Test Google OAuth

1. Start your backend server: `npm run dev`
2. Start your frontend: `npm start`
3. Go to http://localhost:3000/login
4. Click "Sign in with Google"
5. Login with the Google account you added as a test user
6. You should be redirected to the dashboard

## 🚀 Production Setup

For production, update your .env:

```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=https://your-domain.com/api/auth/google/callback
FRONTEND_URL=https://your-domain.com
```

And in Google Cloud Console:

1. Go to **OAuth consent screen**
2. Change from **External** to **Internal** (if using organization)
3. Go to **Credentials**
4. Edit your OAuth client
5. Update **Authorized origins:**
   - `https://your-domain.com`
6. Update **Authorized redirect URIs:**
   - `https://your-domain.com/api/auth/google/callback`

## 🔒 Security Best Practices

### Client Secret

- ✅ Never commit `.env` with real secrets
- ✅ Use environment variables in production
- ✅ Rotate secrets periodically
- ✅ Use different credentials for dev/prod

### Token Security

- ✅ Store tokens in HTTP-only cookies
- ✅ Set `secure` flag only in production
- ✅ Implement token refresh
- ✅ Clear tokens on logout

### CORS Configuration

- ✅ Only allow trusted origins
- ✅ Use specific URLs, not wildcards (*)
- ✅ Include credentials: true

## ❓ Troubleshooting

### "Invalid OAuth State"

```
Error: invalid_request
Error details: OAuth state parameter mismatch
```

**Solution:**
- Clear browser cookies
- Make sure callback URL matches exactly
- Check GOOGLE_CLIENT_ID and SECRET are correct

### "Redirect URI Mismatch"

```
Error: redirect_uri_mismatch
```

**Solution:**
- In Google Cloud Console, check authorized redirect URIs
- Make sure URL is exactly: `http://localhost:5000/api/auth/google/callback`
- No trailing slashes
- Match protocol (http/https)

### "Credentials Not Working Locally"

**Solution:**
- Add `http://localhost:5000` and `http://localhost:3000` to authorized origins
- Use 127.0.0.1 instead of localhost if needed
- Clear browser cache and cookies

### "Sign in with Google Button Not Appearing"

**Solution:**
- Check GOOGLE_CLIENT_ID is set in .env
- Verify .env is in server directory
- Restart backend server after changing .env
- Check browser console for errors

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)

## 🔄 Switching Between Accounts

To test with different Google accounts:

1. Add more test users in OAuth consent screen
2. Logout from current Google account
3. Add the new account as authorized user
4. Login with the new account

## 💡 Pro Tips

- Use [Google OAuth Playground](https://developers.google.com/oauthplayground) to test OAuth flows
- Check browser DevTools → Application → Cookies to see stored tokens
- Use curl with bearer token to test protected endpoints
- Monitor OAuth requests in Network tab

---

**OAuth Setup Complete! 🎉**

Your Task Manager is now ready to authenticate users with Google!
