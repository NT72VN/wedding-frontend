import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Đảm bảo đúng đường dẫn tới AuthService của bạn
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // 1. Kiểm tra xem đã đăng nhập chưa
    // 2. Kiểm tra xem có phải là Admin không (dựa trên role hoặc isAdmin trong AuthService)
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }

    // Nếu không phải Admin, điều hướng về trang chủ hoặc trang login
    alert('Bạn không có quyền truy cập vào khu vực này!');
    return this.router.createUrlTree(['/']); 
  }
}