import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, RouterModule],
    styleUrls: ['./products.component.css'],
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

    loading = true;
    products: Product[] = [];

    // ✅ Bổ sung để phục vụ chức năng phân loại
    allProducts: Product[] = [];
    categories: string[] = ['all'];
    selectedCategory: string = 'all';

    // Đường dẫn ảnh mặc định nếu ảnh từ server bị lỗi
    defaultImg = '/images/default-service.jpg" alt="Service Image'; // Nên trỏ đến 1 file cụ thể

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.loading = true;
        this.productService.getAll().subscribe({
            next: (data) => {
                // Xử lý chuẩn hóa đường dẫn ảnh trước khi hiển thị
                const formattedData = data.map(p => ({
                    ...p,
                    image: this.formatImagePath(p.image)
                }));

                // ✅ Đồng bộ dữ liệu cho chức năng lọc
                this.allProducts = formattedData;
                this.products = formattedData;

                // Tự động trích xuất danh sách phân loại từ dữ liệu trả về
                const types = data
                    .map(p => p.category)
                    .filter((value, index, self) => value && self.indexOf(value) === index);
                this.categories = ['all', ...types as string[]];

                this.loading = false;
            },
            error: (err) => {
                console.error('Lỗi khi lấy danh sách sản phẩm:', err);
                this.loading = false;
            }
        });
    }

    // ✅ Bổ sung: Hàm thực hiện lọc sản phẩm theo category
    filterByCategory(category: string) {
        this.selectedCategory = category;
        if (category === 'all') {
            this.products = this.allProducts;
        } else {
            this.products = this.allProducts.filter(p => p.category === category);
        }
    }

    // Hàm kiểm tra và sửa đường dẫn ảnh (GIỮ NGUYÊN)
    formatImagePath(path: string): string {
        if (!path) return this.defaultImg;
        if (path.startsWith('http')) return path; // Nếu là link web
        // Nếu thiếu 'assets/' thì tự thêm vào
        return path.startsWith('assets/') ? path : `assets/${path}`;
    }

    // Hàm xử lý khi ảnh bị die (404) (GIỮ NGUYÊN)
    handleImageError(event: any) {
        event.target.src = this.defaultImg;
    }
}