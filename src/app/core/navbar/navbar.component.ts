import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Đảm bảo đường dẫn này chính xác tuyệt đối với cấu trúc tree của bạn
import { AuthService } from '../../services/auth.service'; 
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // CommonModule là bắt buộc để dùng *ngIf, *ngFor trong Standalone Component
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Thêm dòng này nếu bạn có file css
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService, // Để 'public' để file HTML có thể truy cập
    public cart: CartService
  ) { }

  ngOnInit(): void {
    // Khởi tạo các logic kiểm tra đăng nhập nếu cần
  }

  // Getter để lấy thông tin user hiện tại từ AuthService
  get user(): User | null {
    return this.auth.getUser();
  }
}