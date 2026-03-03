import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    email: string = '';
    otp: string = '';
    newPassword: string = '';
    step: number = 1; // Bước 1: Nhập email, Bước 2: Nhập OTP & Pass mới
    loading: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    // Bước 1: Gửi yêu cầu lấy OTP
    sendOTP() {
        if (!this.email) return alert('Vui lòng nhập email');
        this.loading = true;
        this.authService.forgotPassword(this.email).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.step = 2; // Chuyển sang giao diện nhập mã
                alert('Mã OTP đã được gửi vào Email của bạn');
            },
            error: (err: any) => {
                this.loading = false;
                alert(err.error?.message || 'Lỗi gửi mã');
            }
        });
    }

    // Bước 2: Xác nhận đổi mật khẩu
    confirmReset() {
        if (!this.otp || !this.newPassword) return alert('Vui lòng điền đủ thông tin');
        this.loading = true;

        // Chuẩn hóa dữ liệu trước khi gửi
        const emailFinal = this.email.toLowerCase().trim();
        const otpFinal = this.otp.trim();

        this.authService.resetPassword(emailFinal, otpFinal, this.newPassword).subscribe({
            next: (res: any) => {
                this.loading = false;
                alert('✅ Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
                this.router.navigate(['/login']);
            },
            error: (err: any) => {
                this.loading = false;
                alert(err.error?.message || 'Mã xác nhận sai hoặc đã hết hạn');
            }
        });
    }
}