import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    // Thay đổi URL này khớp với cổng Backend của bạn (Node.js/Express)
    private apiUrl = 'http://localhost:5000/api/orders';

    constructor(private http: HttpClient) { }

    // Gửi đơn hàng mới lên Server (Dùng cho trang Checkout)
    create(order: Order): Observable<any> {
        return this.http.post<any>(this.apiUrl, order);
    }

    // Lấy tất cả đơn hàng (Dùng cho trang Admin)
    getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    // Lấy chi tiết 1 đơn hàng theo ID
    getById(id: string) {
        return this.http.get<any>(`http://localhost:5000/api/orders/${id}`);
    }

    // Cập nhật trạng thái đơn hàng (Dùng cho Admin duyệt đơn)
    updateStatus(id: string, status: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, { status });
    }
}