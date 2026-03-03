import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserService } from '../services/admin-user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showAddModal = false;
  showPassword = false;
  selectedUser: User | null = null;

  newUser = {
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user',
    active: true,
    avatar: 'assets/images/default-avatar.png'
  };

  constructor(private adminUserService: AdminUserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // ĐỒNG BỘ: Luôn lấy dữ liệu mới nhất từ Server
  loadUsers() {
    this.adminUserService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.adminUserService.users = data; // Cập nhật mảng trong service
      },
      error: (err) => console.error('Lỗi lấy dữ liệu:', err)
    });
  }

  addUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    this.adminUserService.createUser(this.newUser).subscribe({
      next: () => {
        alert('Thêm tài khoản thành công!');
        this.loadUsers(); // Load lại để đồng bộ ID từ MongoDB
        this.resetForm();
        this.showAddModal = false;
      },
      error: (err) => alert('Lỗi khi thêm: ' + err.message)
    });
  }

  changeRole(user: User, newRole: string) {
    const targetId = user._id || user.id;
    if (confirm(`Xác nhận đổi quyền của ${user.name} thành ${newRole}?`)) {
      this.adminUserService.updateUser(targetId, { role: newRole }).subscribe({
        next: () => this.loadUsers(),
        error: (err) => alert('Cập nhật quyền thất bại')
      });
    } else {
      this.loadUsers(); // Reset lại giá trị select trên giao diện
    }
  }

  toggleStatus(user: User) {
    const targetId = user._id || user.id;
    this.adminUserService.updateUser(targetId, { active: !user.active }).subscribe({
      next: () => this.loadUsers(),
      error: (err) => alert('Cập nhật trạng thái thất bại')
    });
  }

  deleteUser(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa thành viên này vĩnh viễn?')) {
      this.adminUserService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => alert('Xóa thất bại')
      });
    }
  }

  viewDetails(user: User) {
    this.selectedUser = user;
  }

  resetForm() {
    this.newUser = {
      name: '', email: '', password: '',
      role: 'user', active: true,
      avatar: 'assets/images/default-avatar.png'
    };
    this.showPassword = false;
  }
}