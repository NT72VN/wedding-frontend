import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Đảm bảo URL này khớp với Router ở Backend (ví dụ: /api/services hoặc /api/products)
  private API = 'http://localhost:5000/api/services'; 

  constructor(private http: HttpClient) { }

  /* ================= LẤY DANH SÁCH (PUBLIC) ================= */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  /* ================= LẤY CHI TIẾT (PUBLIC) ================= */
  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  /* ================= THÊM MỚI (CẦN ADMIN TOKEN) ================= */
  create(product: Product): Observable<Product> {
    // Không cần gắn Header thủ công, Interceptor sẽ tự thêm Bearer Token
    return this.http.post<Product>(this.API, product);
  }

  /* ================= CẬP NHẬT (CẦN ADMIN TOKEN) ================= */
  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${id}`, product);
  }

  /* ================= XÓA (CẦN ADMIN TOKEN) ================= */
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}