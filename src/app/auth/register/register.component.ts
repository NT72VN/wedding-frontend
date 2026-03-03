import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Thêm RouterModule để dùng routerLink
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  // Bổ sung thêm trường name để khớp với yêu cầu của Backend
  user = {
    name: '',
    email: '',
    password: ''
  };

  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  register() {
    // 1. Kiểm tra tính hợp lệ cơ bản
    if (!this.user.name || !this.user.email || !this.user.password) {
      alert('Vui lòng nhập đầy đủ thông tin: Tên, Email và Mật khẩu');
      return;
    }

    this.loading = true;

    // 2. Gọi API đăng ký từ AuthService
    this.auth.register(this.user).subscribe({
      next: (res: any) => {
        this.loading = false;
        alert('✅ Đăng ký tài khoản thành công!');

        // Tự động đăng nhập sau khi đăng ký (tùy chọn)
        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Lỗi đăng ký:', err);
        // Hiển thị lỗi từ Backend (ví dụ: "Email đã tồn tại")
        const errorMsg = err.error?.message || 'Đăng ký thất bại, vui lòng thử lại';
        alert(`❌ ${errorMsg}`);
      }
    });
  }
}