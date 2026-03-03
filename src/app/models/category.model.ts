export interface Category {
    _id?: string;     // ID tự sinh bởi MongoDB
    name: string;    // Tên loại (ví dụ: Decor, Photo, Food...)
    description?: string;
    createdAt?: Date;
}