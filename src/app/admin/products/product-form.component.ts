import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminProductService } from '../services/admin-product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, category: 'Decor', description: '', image: '' };
  isEdit = false;
  id: string | null = null;

  constructor(
    private productService: AdminProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.productService.getById(this.id).subscribe({
        next: (res) => this.product = res,
        error: (err) => this.toastr.error('Không thể tải thông tin sản phẩm')
      });
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Lấy file đầu tiên người dùng chọn

    if (file) {
      const reader = new FileReader();

      // Sự kiện chạy sau khi file được đọc xong
      reader.onload = (e: any) => {
        // Gán dữ liệu ảnh đã đọc (Base64) vào biến image của product
        this.product.image = e.target.result;
      };

      // Đọc file dưới dạng URL (Base64 string)
      reader.readAsDataURL(file);
    }
  }
  save() {
    const request = (this.isEdit && this.id)
      ? this.productService.update(this.id, this.product)
      : this.productService.create(this.product);

    request.subscribe({
      next: () => {
        this.toastr.success(this.isEdit ? 'Cập nhật thành công!' : 'Thêm sản phẩm mới thành công!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        this.toastr.error('Có lỗi xảy ra: ' + (err.error?.message || err.message));
      }
    });
  }
}