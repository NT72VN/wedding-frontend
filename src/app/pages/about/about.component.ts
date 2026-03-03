import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import Lenis from 'lenis'; // Sử dụng thư viện lenis mới nhất

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    // Khởi tạo AOS với cấu hình tối ưu
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out-quad',
    });
  }

  ngAfterViewInit(): void {
    // Khởi tạo Lenis - Cuộn mượt chuẩn Apple
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Đã thêm kiểu dữ liệu :number cho t
      smoothWheel: true
    });

    // Vòng lặp yêu cầu khung hình (Request Animation Frame)
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }
}