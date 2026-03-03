import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminCategoryService, Category } from '../../services/admin-category.service';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private categoryService: AdminCategoryService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories() {
        // Fix: Subscribe để lấy dữ liệu từ API Backend
        this.categoryService.getAll().subscribe({
            next: (data) => {
                this.categories = data;
            },
            error: (err) => {
                console.error('Lỗi khi tải danh sách loại:', err);
            }
        });
    }

    delete(id: any) {
        if (confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này?')) {
            this.categoryService.delete(id).subscribe({
                next: () => {
                    this.loadCategories(); // Tải lại danh sách sau khi xóa thành công
                },
                error: (err) => alert('Lỗi khi xóa: ' + err.message)
            });
        }
    }

    edit(id: any) {
        this.router.navigate(['/admin/categories/edit', id]);
    }
}