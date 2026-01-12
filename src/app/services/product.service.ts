import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike, Accessory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/bikes`);
  }

  getBike(id: number): Observable<Bike> {
    return this.http.get<Bike>(`${this.apiUrl}/bikes/${id}`);
  }

  searchBikes(category?: string, minPrice?: number, maxPrice?: number): Observable<Bike[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (minPrice) params = params.set('minPrice', minPrice.toString());
    if (maxPrice) params = params.set('maxPrice', maxPrice.toString());
    return this.http.get<Bike[]>(`${this.apiUrl}/bikes/search`, { params });
  }

  getAccessories(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(`${this.apiUrl}/accessories`);
  }

  getAccessory(id: number): Observable<Accessory> {
    return this.http.get<Accessory>(`${this.apiUrl}/accessories/${id}`);
  }

  searchAccessories(minPrice?: number, maxPrice?: number): Observable<Accessory[]> {
    let params = new HttpParams();
    if (minPrice) params = params.set('minPrice', minPrice.toString());
    if (maxPrice) params = params.set('maxPrice', maxPrice.toString());
    return this.http.get<Accessory[]>(`${this.apiUrl}/accessories/search`, { params });
  }
}
