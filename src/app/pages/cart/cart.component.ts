import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    constructor(public cart: CartService) { }

    // Hàm lấy ID linh hoạt vì MongoDB dùng _id, nhưng code cũ có thể dùng id
    private getItemId(item: any): any {
        return item._id || item.id;
    }

    increase(item: any) {
        const id = this.getItemId(item);
        this.cart.updateQuantity(id, item.quantity + 1);
    }

    decrease(item: any) {
        const id = this.getItemId(item);
        if (item.quantity > 1) {
            this.cart.updateQuantity(id, item.quantity - 1);
        }
    }

    remove(item: any) {
        const id = this.getItemId(item);
        if (confirm('Bạn có chắc muốn xóa dịch vụ này khỏi danh sách?')) {
            this.cart.remove(id);
        }
    }
}