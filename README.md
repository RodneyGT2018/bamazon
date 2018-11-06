#### Assignment

Create an Amazon-like storefront with the MySQL skills you learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. 


#### Technologies Used:

* Javascript
* nodeJS
* MySQL
* npm packages:
- [mysql](https://github.com/felixge/node-mysql)
- [prompt](https://github.com/flatiron/prompt)
- [cli-table](https://github.com/Automattic/cli-table)
- [colors/safe](https://github.com/Marak/colors.js)


#### Bamazon Customer Portal

The Bamazon Customer Portal allows users to view a table of available items to buy.  The user will be prompted to enter the Item id number and the quantity to purchase.  If the current stock is greater than or equal to the requested quantity, the order will be completed and the user will see the total amount of their purchase.

![Customer Portal](Images/Pic01_PurchSuccess.png)


If the current stock is less than the requested quantity, the user will receive a message in red letters stating, "Sorry, the requested quantity of this item exceeds our current inventory."

![Customer Portal](Images/Pic02_PurchFailure.png)



#### Bamazon Manager Portal

The Bamazon Manager Portal provides a Manager's view of the current inventory.  The inventory will also update after purchases are made through the customer portal.  The user will be prompted to choose from the following Manager options:

* View products for sale
* View low inventory
* Add to inventory
* Add a new product


#### Manager Options 1

The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, product price, and how much stock is left for that product.  The inventory will also update after a successful purchase.


![Bamazon Manager Portal - Option 1.1](Images/Pic03_InvBeforePurchase.png)

![Bamazon Manager Portal - Option 1.2](Images/Pic04_InvPurchase.png)

![Bamazon Manager Portal - Option 1.3](Images/Pic05_InvAfterPurchase.png)




#### Manager Options 2, 3, & 4

The second option allows the user to see a list of all inventory items that have less than 5 items in stock.  If there are no products that meet this criteria, the user will see an empty table.

![Bamazon Manager Portal - Option 2](Images/Pic06_LowInv.png)


The third option allows the user to update the inventory for a specific product.  A prompt asks what the id is for the product the user wants to update.  A second prompt asks how many items the user wishes to increase the quantity by.

![Bamazon Manager Portal - Option 3](Images/Pic07_AddToExistInv.png)


The last option allows the user to add a new product to the inventory.  Prompts ask the user for the product id#, the product name, the department name, the price and the stock quantity.

![Bamazon Manager Portal - Options 4](Images/Pic08_AddProd01.png)
![Bamazon Manager Portal - Options 4](Images/Pic09_AddProd02.png)



#### Thank You

Many thanks to the classmates that assisted with this assigment!
