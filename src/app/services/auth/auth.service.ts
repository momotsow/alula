import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = '/assets/users.json';
  private isAuthenticated = false;

  // Initialize isLoggedIn as false by default
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  // Register a user
  register(user: User): Observable<any> {
    debugger;
    return this.getUsers().pipe(
      map((data: User[]) => {
        const existingUser = data.find((u) => u.email === user.email);
        if (existingUser) {
          return { success: false, message: 'User already exists' };
        }

        data.push(user);
        this.saveUsers([user]);

        return { success: true, message: 'Registration successful' };
      })
    );
  }

  // Login a user
  login(email: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map((data: User[]) => {
        const user = data.find((u) => u.email === u.email);

        if (user && user.password === password) {
          this.isLoggedIn = true;

          return { success: true, message: 'Login successful' };
        }

        return { success: false, message: 'Invalid username or password' };
      })
    );
  }

  // Logout a user
  logout() {
    this.isLoggedIn = false;
  }

  // Check if a user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  private saveUsers(newUser: User): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      catchError((error) => {
        console.error('Error retrieving user data:', error);
        return throwError('Error retrieving user data');
      }),
      mergeMap((data: any[]) => {
        // Ensure that the data is an array and cast it to User[] if needed
        const userData: User[] = Array.isArray(data) ? data : [];

        // Add the new user object to the array
        userData.push(newUser);

        // Save the updated data back to the JSON file
        return this.http.put(this.usersUrl, userData).pipe(
          catchError((error) => {
            console.error('Error saving user data:', error);
            return throwError('Error saving user data');
          })
        );
      })
    );
  }


}
