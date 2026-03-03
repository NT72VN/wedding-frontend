import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
    private apiUrl = 'http://localhost:5000/api/users'; // URL API của bạn

    // Mảng này bây giờ chỉ đóng vai trò lưu trữ tạm thời sau khi fetch từ server
    users: User[] = [];

    constructor(private http: HttpClient) { }

    // Lấy danh sách từ MongoDB
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    // Thêm tài khoản mới vào MongoDB
    createUser(user: any): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    // Cập nhật thông tin (Quyền, Trạng thái...) vào MongoDB
    updateUser(id: string, data: any): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, data);
    }

    // Xóa tài khoản khỏi MongoDB
    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    // Hàm bổ trợ để lấy dữ liệu cũ (nếu cần)
    getAll(): User[] {
        return this.users;
    }
}