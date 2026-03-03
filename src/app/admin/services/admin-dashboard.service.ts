import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminDashboardService {
    private apiUrl = 'http://localhost:5000/api/admin/stats'; // Điều chỉnh theo route Backend của bạn

    constructor(private http: HttpClient) { }

    // Thống kê sản phẩm bán chạy
    getTopSellingProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/top-products`);
    }

    // Thống kê doanh thu theo tháng
    getMonthlyRevenue(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/monthly-revenue`);
    }

    // Các chỉ số tổng quan (Tổng user, tổng đơn, tổng doanh thu)
    getSummaryStats(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/summary`);
    }
}