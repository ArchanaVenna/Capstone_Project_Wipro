import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface LoginResponse {
  token?: string; // Make token optional to handle cases where it might be missing
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(username: string, password: string): Observable<LoginResponse | null> {
    return this.api.post('auth/login', { username, password }).pipe(
      tap((response: LoginResponse) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          throw new Error('Invalid login response: No token received' + (response?.error ? `: ${response.error}` : ''));
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null); // Return null on error
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}