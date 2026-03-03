import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form.component';

// ✅ Bổ sung các Import bị thiếu để hết lỗi đỏ
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            // Trang tổng quan
            { path: '', component: DashboardComponent },

            // Quản lý người dùng & Đơn hàng
            { path: 'users', component: UsersComponent },
            { path: 'orders', component: OrdersComponent },

            // ✅ Cấu hình cho phần Sản phẩm (Giữ nguyên vẹn)
            { path: 'products', component: ProductsComponent },
            { path: 'products/create', component: ProductFormComponent },
            { path: 'products/edit/:id', component: ProductFormComponent },

            // ✅ Cấu hình cho phần Loại sản phẩm (Bổ sung đầy đủ)
            { path: 'categories', component: CategoryListComponent },
            { path: 'categories/create', component: CategoryFormComponent }, // Đổi 'new' thành 'create' cho đồng bộ với link nút bấm
            { path: 'categories/edit/:id', component: CategoryFormComponent }
        ]
    }
];