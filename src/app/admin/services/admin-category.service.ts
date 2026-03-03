import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
    _id?: string; // MongoDB sử dụng _id
    id?: number;  // Giữ lại để tương thích với code cũ của bạn
    name: string;
    description?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminCategoryService {
    // URL này khớp với cấu hình trong server.js của bạn
    private apiUrl = 'http://localhost:5000/api/categories';

    constructor(private http: HttpClient) { }

    // Lấy toàn bộ danh sách từ database
    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    getById(id: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }

    add(cat: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, cat);
    }

    // src/app/admin/services/admin-category.service.ts

    update(id: string | number, cat: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${id}`, cat);
    }
    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}