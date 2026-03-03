import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
    items: any[] = [];

    constructor() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }

    private save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    addToCart(product: any) {
        const item = this.items.find(i => (i._id || i.id) === (product._id || product.id));
        if (item) {
            item.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
    }

    updateQuantity(id: any, quantity: number) {
        const item = this.items.find(i => (i._id || i.id) === id);
        if (item && quantity > 0) {
            item.quantity = quantity;
            this.save();
        }
    }

    remove(id: any) {
        this.items = this.items.filter(i => (i._id || i.id) !== id);
        this.save();
    }

    // Hàm quan trọng để fix lỗi Checkout
    clearCart() {
        this.items = [];
        localStorage.removeItem('cart');
    }
    // Thêm hàm này vào trong class CartService
    getTotalQuantity(): number {
        return this.items.reduce((sum, i) => sum + i.quantity, 0);
    }
    getTotalPrice(): number {
        return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    }
}