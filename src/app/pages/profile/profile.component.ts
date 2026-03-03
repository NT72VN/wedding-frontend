import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    imports: [CommonModule, FormsModule]
})
export class ProfileComponent {

    user!: User;

    constructor(private auth: AuthService) {
        const u = this.auth.getUser();
        if (u) this.user = { ...u };
    }

    onAvatarChange(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            this.user.avatar = reader.result as string;
            this.auth.updateProfile(this.user);
        };
        reader.readAsDataURL(file);
    }

    save() {
        this.auth.updateProfile(this.user);
        alert('Cập nhật thành công!');
    }
}
