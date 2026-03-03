import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../products/product.model'; // Sửa đường dẫn này

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private api = 'http://localhost:5000/api/services'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  create(data: Product): Observable<Product> {
    return this.http.post<Product>(this.api, data);
  }

  update(id: string, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}