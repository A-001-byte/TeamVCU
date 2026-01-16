# Supabase JWT Integration Guide

## Current Frontend Status

### ✅ Already Ready:
1. **Token Storage**: Uses localStorage with `thinktwice_token` key
2. **API Client**: Already sends `Authorization: Bearer {token}` header
3. **Auth Context**: Proper React context structure for auth state
4. **Protected Routes**: Route protection is implemented
5. **Token Format**: Already using Bearer token format (compatible with Supabase JWT)

### ⚠️ Needs Integration:
1. **Supabase Client**: Not yet installed/configured
2. **Auth Service**: Currently in demo mode, needs Supabase auth methods
3. **Session Management**: Need Supabase session handling
4. **Token Refresh**: Need automatic token refresh logic

## Integration Steps

### 1. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 2. Create Supabase Config
Create `src/config/supabase.js` with your Supabase credentials

### 3. Update Auth Service
Replace demo mode with Supabase auth methods:
- `supabase.auth.signInWithPassword()` for login
- `supabase.auth.signUp()` for signup
- `supabase.auth.signOut()` for logout
- `supabase.auth.getSession()` for session management

### 4. Update Token Storage
Supabase JWT will be in `session.access_token`
Store it in the same `thinktwice_token` key (already compatible)

### 5. Flask Backend
Your Flask backend needs to:
- Verify Supabase JWT using Supabase's public key
- Extract user info from JWT claims
- No changes needed on frontend API client (already sends Bearer token)

## Current Code Structure

The frontend is **95% ready**. You just need to:
1. Install Supabase client
2. Replace demo mode in `LoginPage.jsx` with Supabase auth
3. Update `authService.js` to use Supabase instead of direct API calls
4. Add session refresh logic

The API client, token storage, and auth context are already properly structured for Supabase JWT.
