import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { ProductSort } from '../pages/productSort.page';

Then('I sort the items by {string}', async (sortOption) => {
  await new ProductSort(getPage()).sortBy(sortOption);
});

Then('I should see all {int} items sorted by price {string}', async (itemCount, order) => {
  const productSort = new ProductSort(getPage());
  const prices = await productSort.getAllPrices();
  if (prices.length !== itemCount) {
    throw new Error(`Expected ${itemCount} items, but found ${prices.length}`);
  }
  const isSorted = await productSort.arePricesSorted(order === 'low to high' ? 'asc' : 'desc');
  if (!isSorted) {
    throw new Error(`Prices are not sorted by ${order}`);
  }
});

Then('I should see all {int} items sorted by name {string}', async (itemCount, order) => {
  const productSort = new ProductSort(getPage());
  const names = await productSort.getAllNames();
  if (names.length !== itemCount) {
    throw new Error(`Expected ${itemCount} items, but found ${names.length}`);
  }
  const isSorted = await productSort.areNamesSorted(order === 'A to Z' ? 'asc' : 'desc');
  if (!isSorted) {
    throw new Error(`Names are not sorted by ${order}`);
  }
});
