import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private getToken(): string | null {
    return sessionStorage.getItem("accessToken");
  }

  public getNameToken(): string | boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decodedToken: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < now) { 
        sessionStorage.removeItem("accessToken")
        return false;
      }
      const name = decodedToken.name
      return name
    } catch {
      return false;
    }
  }

  public isAuthenticated(scopePermission: string): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < now) { 
        sessionStorage.removeItem("accessToken")
        return false;
      }

      const scopes = decodedToken.scope?.split(' ') || [];
      if (scopePermission == 'client') {
        if (scopes.includes(scopePermission) || scopes.includes('admin')) {
          return true
        }
      }
      return scopes.includes(scopePermission)
    } catch {
      return false;
    }
  }
}
