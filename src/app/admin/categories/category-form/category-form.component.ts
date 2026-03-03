import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategoryService } from '../../services/admin-category.service';

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
    isEdit = false;
    // Object category để bind ngModel - Giữ nguyên vẹn cấu trúc của bạn
    category = {
        _id: '', // Bổ sung trường này để làm việc với MongoDB từ server.js
        id: 0,
        name: '',
        description: ''
    };

    constructor(
        private categoryService: AdminCategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Lấy ID từ URL (có thể là số hoặc chuỗi hex của MongoDB)
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.isEdit = true;
            // FIX: Gọi API lấy dữ liệu theo ID để đảm bảo thông tin mới nhất từ database
            this.categoryService.getById(id).subscribe({
                next: (data) => {
                    // Gán dữ liệu nhận được vào object category
                    this.category = { ...data } as any;
                },
                error: (err) => {
                    console.error('Lỗi khi lấy chi tiết loại:', err);
                    alert('Không tìm thấy loại sản phẩm này!');
                    this.router.navigate(['/admin/categories']);
                }
            });
        }
    }

    submit() {
        if (this.isEdit) {
            // Xác định ID cần cập nhật (ưu tiên _id từ MongoDB)
            const updateId = this.category._id || this.category.id;

            // FIX LỖI "Expected 2 arguments": Truyền ID và Body cho hàm update
            this.categoryService.update(updateId, this.category as any).subscribe({
                next: () => this.afterSave(),
                error: (err) => {
                    console.error('Lỗi cập nhật:', err);
                    alert('Cập nhật thất bại. Vui lòng kiểm tra lại!');
                }
            });
        } else {
            // Thêm mới: Chỉ cần gửi Body đối tượng (1 đối số)
            this.categoryService.add(this.category as any).subscribe({
                next: () => this.afterSave(),
                error: (err) => {
                    console.error('Lỗi thêm mới:', err);
                    alert('Thêm mới thất bại!');
                }
            });
        }
    }

    // Hàm phụ trợ điều hướng sau khi lưu thành công - Giữ nguyên vẹn
    private afterSave() {
        alert(this.isEdit ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
        this.router.navigate(['/admin/categories']);
    }
}