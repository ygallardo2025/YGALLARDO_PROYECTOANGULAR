import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  email: string | null;
  name: string | null;
  isAdmin: boolean | null;
  isLoggedIn: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  email: null,
  name: null,
  isAdmin: null,
  isLoggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(
    AuthActions.login,
    (state: AuthState, { email, name, admin }: { email: string; name: string; admin: boolean }) => ({
      ...state,
      email,
      name,
      isAdmin: admin,
      isLoggedIn: true,
      error: null,
    })
  ),
  on(AuthActions.logout, (state: AuthState) => ({
    ...state,
    email: null,
    name: null,
    isAdmin: null,
    isLoggedIn: false,
    error: null,
  })),
  on(
    AuthActions.loginFailure,
    (state: AuthState, { error }: { error: string }) => ({
      ...state,
      error,
    })
  )
);
