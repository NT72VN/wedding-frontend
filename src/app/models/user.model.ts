export interface User {
    _id?: string;
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'user';
    active: boolean;
    avatar: string;
    // Thuộc tính phục vụ tính năng quên mật khẩu
    resetPasswordToken?: string;
    resetPasswordExpires?: Date | string;
}