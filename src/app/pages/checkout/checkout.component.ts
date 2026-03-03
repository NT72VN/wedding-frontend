import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    name: string = '';
    phone: string = '';
    weddingDate: string = '';
    note: string = '';
    loading: boolean = false; // Thêm biến để quản lý trạng thái nút bấm

    constructor(
        public cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) { }

    submit() {
        if (!this.name || !this.phone || !this.weddingDate) {
            alert('⚠️ Vui lòng nhập đầy đủ thông tin bắt buộc');
            return;
        }

        this.loading = true; // Bật trạng thái đang xử lý

        const order: Order = {
            name: this.name,
            phone: this.phone,
            weddingDate: this.weddingDate,
            note: this.note,
            items: this.cartService.items, //
            totalPrice: this.cartService.getTotalPrice(), //
            status: 'pending' as any
        };

        this.orderService.create(order).subscribe({
            next: () => {
                alert('🎉 Đặt dịch vụ thành công!');
                this.cartService.clearCart(); // Gọi hàm xóa giỏ hàng
                this.loading = false;
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error('Lỗi kết nối:', err);
                this.loading = false; // Tắt loading để người dùng có thể thử lại
                alert('❌ Không thể kết nối đến máy chủ. Hãy kiểm tra:\n1. Backend đã chạy chưa?\n2. Cổng 5000 có đúng không?\n3. Đã bật CORS ở Backend chưa?');
            }
        });
    }
}