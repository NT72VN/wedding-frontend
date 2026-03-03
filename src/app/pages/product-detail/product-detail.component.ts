import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Thêm RouterModule để fix lỗi routerLink
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  // QUAN TRỌNG: Phải có RouterModule ở đây để kích hoạt routerLink trong HTML
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Lấy ID từ URL (Hỗ trợ cả trường hợp ID thay đổi khi đang ở chính trang đó)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProductDetail(id);
      }
    });
  }

  private fetchProductDetail(id: string): void {
    this.productService.getById(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Lỗi khi tải chi tiết sản phẩm:', err);
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      // Thông báo thẩm mỹ hơn (tùy chọn sử dụng SweetAlert2 hoặc Toastr thay vì alert)
      alert(`🛒 ${this.product.name} đã được thêm vào danh sách dịch vụ!`);
    }
  }

  // Hàm xử lý lỗi ảnh nếu link từ database bị hỏng
  handleImageError(event: any) {
    event.target.src = 'assets/images/default-wedding.jpg';
  }
}