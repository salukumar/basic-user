import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import * as credentials from '../../credentials.json';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginData: any = (credentials as any).default;

  constructor(private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Login with credentials from json file
    if (context.username !== this.loginData.username && context.password !== this.loginData.password)
      return throwError('invalid_credentials');
    const data = {
      username: context.username,
      token: context.password
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
