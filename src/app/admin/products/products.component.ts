import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminProductService } from '../services/admin-product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;

  constructor(
    private productService: AdminProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Lỗi khi tải danh sách sản phẩm');
        this.loading = false;
      }
    });
  }

  delete(id: string | undefined) {
    if (!id) return;

    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.toastr.warning('Đã xóa sản phẩm thành công', 'Thông báo');
          this.loadProducts();
        },
        error: (err) => {
          this.toastr.error('Xóa thất bại: ' + (err.error?.message || err.message));
        }
      });
    }
  }
}