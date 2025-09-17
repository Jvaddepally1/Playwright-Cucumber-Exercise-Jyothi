import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I select the cart', async () => {
  await new Purchase(getPage()).goToCart();
});

Then('I select checkout', async () => {
  await new Purchase(getPage()).checkout();
});

Then('I fill in the First Name {string}, Last Name {string}, and Zip/Postal Code {string}', async function (first, last, zip) {
  await new Purchase(getPage()).fillCheckoutInfo(first, last, zip);
});

Then('I select continue', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I select finish', async () => {
  await new Purchase(getPage()).finishCheckout();
});

Then("I should see the purchase confirmation text {string}", async (expectedText) => {
  const actualText = await new Purchase(getPage()).getThankYouText();
  if (actualText !== expectedText) {
    throw new Error(`Expected confirmation text to be '${expectedText}' but found '${actualText}'`);
  }
});
