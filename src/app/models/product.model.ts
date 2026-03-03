export interface Product {
    _id?: string;
    id?: string;        // Thêm trường này để fix lỗi TS2339 trong HTML
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
}