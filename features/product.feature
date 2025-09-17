Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I sort the items by "<sort>"
    Then I should see all <count> items sorted by price <order>
  Examples:
    | sort                | order         | count |
    | Price (low to high) | low to high   | 6     |
    | Price (high to low) | high to low   | 6     |

  Scenario Outline: Validate product sort by name <sort>
    Then I will login as 'standard_user'
    Then I sort the items by "<sort>"
    Then I should see all <count> items sorted by name <order>
  Examples:
    | sort          | order    | count |
    | Name (A to Z) | A to Z   | 6     |
    | Name (Z to A) | Z to A   | 6     |