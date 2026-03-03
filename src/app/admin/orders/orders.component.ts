import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminOrderService } from '../services/admin-order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  loading = false;

  constructor(
    private orderService: AdminOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi tải đơn hàng:', err);
        this.loading = false;
      }
    });
  }

  // 🔁 Cập nhật trạng thái đơn hàng - Đã fix logic nhận ID
  updateStatus(orderId: string, newStatus: string) {
    // Kiểm tra nếu không có ID thì dừng lại để tránh lỗi API
    if (!orderId) {
      console.error('Không tìm thấy ID đơn hàng');
      alert('❌ Lỗi: Không xác định được đơn hàng cần cập nhật');
      return;
    }

    // Hiển thị trạng thái đang xử lý nếu cần (tùy chọn)
    this.orderService.updateStatus(orderId, newStatus).subscribe({
      next: (response) => {
        alert('✅ Cập nhật trạng thái thành công!');
        // Tải lại danh sách để đồng bộ dữ liệu mới nhất từ server
        this.fetchOrders();
      },
      error: (err) => {
        console.error('Lỗi cập nhật từ Server:', err);
        // Thông báo lỗi chi tiết hơn nếu server trả về message
        const errorMsg = err.error?.message || 'Cập nhật thất bại';
        alert(`❌ ${errorMsg}`);
      }
    });
  }

  // ✅ FIX NÚT "XEM" - Giữ nguyên logic điều hướng của bạn
  viewDetail(orderId: string) {
    if (!orderId) return;
    this.router.navigate(['/my-orders', orderId]);
  }
}