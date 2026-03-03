import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // admin-order.service.ts
  updateStatus(orderId: string, newStatus: string): Observable<any> {
    // Đảm bảo URL là /api/orders/{id}/status và gửi kèm object { status: newStatus }
    return this.http.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
  }
}