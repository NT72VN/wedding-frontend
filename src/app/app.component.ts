import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component'; // 1. Import Footer ở đây

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent], // 2. Thêm FooterComponent vào danh sách này
  template: `
    <app-navbar></app-navbar>

    <div style="margin-top:70px; min-height: 80vh;">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer> `
})
export class AppComponent { }