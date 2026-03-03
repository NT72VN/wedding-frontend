import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Thêm RouterModule ở đây
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule], // Thêm RouterModule vào đây
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  submit() {
    if (!this.email || !this.password) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        // Lưu token nếu có để duy trì đăng nhập
        if (res.token) localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Lỗi đăng nhập chi tiết:', err);
        // Lấy thông báo lỗi từ server hoặc dùng mặc định
        const message = err.error?.message || 'Sai email hoặc mật khẩu';
        alert(`❌ ${message}`);
      }
    });
  }
}