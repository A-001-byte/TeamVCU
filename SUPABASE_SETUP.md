# Supabase Integration Setup

## ✅ What's Already Done

1. **Supabase Client Installed**: `@supabase/supabase-js` package is installed
2. **Supabase Config Created**: `src/config/supabase.js` is ready
3. **Auth Service Updated**: Uses Supabase for login/signup/logout
4. **Auth Context Updated**: Listens to Supabase auth state changes
5. **Login Page Updated**: Removed demo mode, uses real Supabase auth
6. **API Client Ready**: Sends Supabase JWT token to Flask backend

## 🔧 Setup Steps

### 1. Create `.env` file in project root

Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get these:**
1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### 2. Restart your dev server

After adding the `.env` file:
```bash
npm run dev
```

### 3. Test the integration

1. **Sign Up**: Create a new account
2. **Login**: Use your credentials
3. **Check**: Token should be stored and sent to Flask backend

## 🔐 How It Works

1. **Login/Signup**: Uses `supabase.auth.signInWithPassword()` and `supabase.auth.signUp()`
2. **Token Storage**: Supabase JWT token is stored in `localStorage` as `thinktwice_token`
3. **API Calls**: Flask backend receives token in `Authorization: Bearer {token}` header
4. **Session Management**: Supabase handles token refresh automatically
5. **Auth State**: React context listens to Supabase auth state changes

## 📝 Flask Backend Integration

Your Flask backend should:
1. Extract the JWT token from `Authorization: Bearer {token}` header
2. Verify the token using Supabase's public key
3. Extract user info from JWT claims

The frontend is **100% ready** - just add your Supabase credentials to `.env`!
