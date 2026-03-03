import { Injectable } from '@angular/core';

export interface Category {
    id: number;
    name: string;
    description?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categories: Category[] = [];

    getAll(): Category[] {
        return this.categories;
    }

    getById(id: number): Category | undefined {
        return this.categories.find(c => c.id === id);
    }

    add(category: Category) {
        this.categories.push(category);
    }

    update(category: Category) {
        const index = this.categories.findIndex(c => c.id === category.id);
        if (index !== -1) {
            this.categories[index] = category;
        }
    }

    delete(id: number) {
        this.categories = this.categories.filter(c => c.id !== id);
    }
}
