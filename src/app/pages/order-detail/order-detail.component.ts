import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-order-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {

    order: any;
    loading = true;
    error = false;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (!id) {
            this.error = true;
            this.loading = false;
            return;
        }

        this.orderService.getById(id).subscribe({
            next: (data) => {
                this.order = data;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
}
