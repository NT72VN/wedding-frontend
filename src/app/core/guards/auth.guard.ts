import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private USER_KEY = 'wedding_user';

    constructor(private router: Router) { }

    // Đăng ký
    register(user: any) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        return true;
    }

    // Đăng nhập
    login(email: string, password: string): boolean {
        const user = JSON.parse(localStorage.getItem(this.USER_KEY)!);

        if (user && user.email === email && user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            return true;
        }
        return false;
    }

    // Đăng xuất
    logout() {
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/login']);
    }

    // Kiểm tra đăng nhập
    isLoggedIn(): boolean {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
}
