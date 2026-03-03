import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminGuard } from './core/guards/admin.guard'; // Import Guard của bạn
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    // 1. Trang chủ
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },

    // 2. Sản phẩm & Chi tiết sản phẩm dành cho khách hàng
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
    },

    // 3. Thông tin chung
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
    },

    // 4. Xác thực người dùng
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
    },

    // 5. Giỏ hàng & Thanh toán
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },

    // 6. PHÂN HỆ ADMIN (Đã được bảo vệ bởi AdminGuard)
    {
        path: 'admin',
        canActivate: [AdminGuard], // Bảo vệ "người gác cổng" tại đây
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },

    // 7. Quản lý đơn hàng cá nhân (Dành cho khách hàng)
    {
        path: 'my-orders',
        loadComponent: () => import('./pages/my-orders/my-orders.component').then(m => m.MyOrdersComponent)
    },
    {
        path: 'my-orders/:id',
        loadComponent: () => import('./pages/order-detail/order-detail.component').then(m => m.OrderDetailComponent)
    },

    // 8. Hồ sơ cá nhân
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    // 10. quên mật khẩu
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', redirectTo: '' }
];