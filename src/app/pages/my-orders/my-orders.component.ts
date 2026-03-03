import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
    selector: 'app-my-orders',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
    orders: Order[] = [];
    loading: boolean = true;

    constructor(private orderService: OrderService) { }

    ngOnInit(): void {
        this.fetchOrders();
    }

    fetchOrders(): void {
        this.loading = true;
        this.orderService.getAll().subscribe({
            next: (data: Order[]) => {
                // Sắp xếp đơn hàng mới nhất lên đầu dựa trên trường createdAt
                this.orders = data.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                this.loading = false;
            },
            error: (err) => {
                console.error('Lỗi khi lấy danh sách đơn hàng:', err);
                this.loading = false;
            }
        });
    }

    /**
     * Hàm hỗ trợ hiển thị màu sắc Badge cho từng trạng thái
     * Đã bổ sung trường hợp 'completed' để hiển thị màu xanh (bg-success)
     */
    getStatusClass(status: string): string {
        switch (status) {
            case 'pending':
                return 'badge bg-warning text-dark';
            case 'confirmed':
                return 'badge bg-primary';
            case 'completed':
                return 'badge bg-success';
            case 'cancelled':
                return 'badge bg-danger';
            default:
                return 'badge bg-secondary';
        }
    }
}