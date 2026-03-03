import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderService } from '../services/admin-order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-admin-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = false; // Thêm dòng này để hết lỗi đỏ ở HTML

  constructor(private orderService: AdminOrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  changeStatus(id: string, status: string) {
    this.orderService.updateStatus(id, status).subscribe(() => {
      alert('Đã cập nhật trạng thái đơn hàng!');
      this.loadOrders();
    });
  }
}