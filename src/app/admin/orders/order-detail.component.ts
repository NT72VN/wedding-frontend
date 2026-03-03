import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, DecimalPipe],
    templateUrl: './order-detail.component.html'
})
export class AdminOrderDetailComponent {
    order?: any;
}
