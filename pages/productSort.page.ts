import { Page } from "@playwright/test";

export class ProductSort {
    private readonly page: Page;
    private readonly sortDropdown = '[data-test="product_sort_container"]';
    private readonly itemPrices = '.inventory_item_price';
    private readonly itemNames = '.inventory_item_name';

    constructor(page: Page) {
        this.page = page;
    }

    async sortBy(option: string) {
        await this.page.locator(this.sortDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.sortDropdown).selectOption({ label: option });
        // Wait for the product list to update
        await this.page.waitForTimeout(1000);
    }

    async getAllPrices(): Promise<number[]> {
        await this.page.locator(this.itemPrices).first().waitFor({ state: 'visible', timeout: 10000 });
        const priceElements = await this.page.locator(this.itemPrices).allInnerTexts();
        return priceElements.map(text => parseFloat(text.replace('$', '')));
    }

    async arePricesSorted(order: 'asc' | 'desc'): Promise<boolean> {
        const prices = await this.getAllPrices();
        const sorted = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a);
        return prices.every((val, idx) => val === sorted[idx]);
    }

    async getAllNames(): Promise<string[]> {
        await this.page.locator(this.itemNames).first().waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.itemNames).allInnerTexts();
    }

    async areNamesSorted(order: 'asc' | 'desc'): Promise<boolean> {
        const names = await this.getAllNames();
        const sorted = [...names].sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
        return names.every((val, idx) => val === sorted[idx]);
    }
}
