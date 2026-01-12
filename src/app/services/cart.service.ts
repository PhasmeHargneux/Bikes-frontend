import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/carts';
  private userId = 1; // Default user ID for simplicity
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshCart();
  }

  refreshCart(): void {
    this.http.get<Cart>(`${this.apiUrl}/${this.userId}`).subscribe({
      next: (cart) => this.cartSubject.next(cart),
      error: (err) => console.error('Error fetching cart', err)
    });
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${this.userId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  addBikeToCart(bikeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${this.userId}/bikes/${bikeId}`, {}).pipe(
      tap(() => this.refreshCart())
    );
  }

  removeBikeFromCart(bikeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.userId}/bikes/${bikeId}`).pipe(
      tap(() => this.refreshCart())
    );
  }

  addAccessoryToCart(accessoryId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${this.userId}/accessories/${accessoryId}`, {}).pipe(
      tap(() => this.refreshCart())
    );
  }

  removeAccessoryFromCart(accessoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.userId}/accessories/${accessoryId}`).pipe(
      tap(() => this.refreshCart())
    );
  }
}
