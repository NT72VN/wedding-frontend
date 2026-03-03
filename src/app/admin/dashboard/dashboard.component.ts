import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductService } from '../services/admin-product.service';
import { AdminOrderService } from '../services/admin-order.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  today: Date = new Date();
  stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  };

  // ✅ Dữ liệu bổ sung
  topSellingProducts: any[] = [];
  monthlyRevenue: any[] = [];
  loading = true;

  constructor(
    private productService: AdminProductService,
    private orderService: AdminOrderService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    forkJoin({
      products: this.productService.getAll(),
      orders: this.orderService.getAllOrders()
    }).subscribe({
      next: (result) => {
        this.stats.totalProducts = result.products.length;
        this.stats.totalOrders = result.orders.length;
        this.stats.pendingOrders = result.orders.filter((o: any) => o.status === 'pending').length;
        this.stats.totalRevenue = result.orders
          .filter((o: any) => o.status === 'completed')
          .reduce((sum: number, o: any) => sum + (o.totalPrice || 0), 0);

        // ✅ 1. Xử lý Thống kê Sản phẩm bán chạy
        this.calculateTopProducts(result.orders);

        // ✅ 2. Xử lý Doanh thu theo tháng
        this.calculateMonthlyRevenue(result.orders);

        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi tải dữ liệu dashboard:', err);
        this.loading = false;
      }
    });
  }

  private calculateTopProducts(orders: any[]) {
    const productMap = new Map();
    orders.forEach(order => {
      // Giả sử order có mảng items hoặc tương đương
      const items = order.items || [];
      items.forEach((item: any) => {
        const current = productMap.get(item.name) || { name: item.name, quantity: 0, total: 0 };
        current.quantity += item.quantity || 1;
        current.total += (item.price * (item.quantity || 1));
        productMap.set(item.name, current);
      });
    });
    this.topSellingProducts = Array.from(productMap.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Lấy top 5
  }

  private calculateMonthlyRevenue(orders: any[]) {
    const revenueByMonth: { [key: string]: number } = {};
    const completedOrders = orders.filter(o => o.status === 'completed');

    completedOrders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthYear = `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;
      revenueByMonth[monthYear] = (revenueByMonth[monthYear] || 0) + order.totalPrice;
    });

    this.monthlyRevenue = Object.keys(revenueByMonth).map(key => ({
      month: key,
      amount: revenueByMonth[key]
    })).reverse().slice(0, 6); // Lấy 6 tháng gần nhất
  }
}