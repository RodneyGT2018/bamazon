# Assignment

Create an Amazon-like storefront with the MySQL skills you learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. 


### Technologies Used:

* Javascript
* nodeJS
* MySQL
* npm packages:
- [mysql](https://github.com/felixge/node-mysql)
- [prompt](https://github.com/flatiron/prompt)
- [cli-table](https://github.com/Automattic/cli-table)
- [colors/safe](https://github.com/Marak/colors.js)



## Bamazon Customer Portal

The Bamazon Customer Portal allows users to view a table of available items to buy.  The user will be prompted to enter the Item ID number and the quantity to purchase.  If the current stock is greater than or equal to the requested quantity, the order will be completed and the user will see the total amount of their purchase.

<img width="629" alt="pic01_purchsuccess" src="https://user-images.githubusercontent.com/38221513/48067423-47c56000-e19e-11e8-8a80-b40faf5b8221.png">


If the current stock is less than the requested quantity, the user will receive a message in red letters stating, "Sorry, the requested quantity of this item exceeds our current inventory."

<img width="655" alt="pic02_purchfailure" src="https://user-images.githubusercontent.com/38221513/48067657-ce7a3d00-e19e-11e8-8dff-01d6464acf22.png">



## Bamazon Manager Portal

The Bamazon Manager Portal provides a Manager's view of the current inventory.  The inventory will also update after purchases are made through the customer portal.  The user will be prompted to choose from the following Manager options:

* View products for sale
* View low inventory
* Add to inventory
* Add a new product


### Manager Option 1

The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, product price, and how much stock is left for that product.  The inventory will also update after a successful purchase.

#### Inventory BEFORE purchasing Item Id #67891
<img width="831" alt="pic03_invbeforepurchase" src="https://user-images.githubusercontent.com/38221513/48067695-e18d0d00-e19e-11e8-8cab-ec42bc965bd9.png">


#### PURCHASE 4 of Item Id #67891
<img width="624" alt="pic04_invpurchase" src="https://user-images.githubusercontent.com/38221513/48067722-f5387380-e19e-11e8-8934-c3b62a6fac1d.png">


#### Inventory AFTER purchasing 4 of Item Id #67891
<img width="829" alt="pic05_invafterpurchase" src="https://user-images.githubusercontent.com/38221513/48067895-6c6e0780-e19f-11e8-865b-3826aae5a575.png">



### Manager Options 2, 3, & 4

The second option allows the user to see a list of all inventory items that have less than 5 items in stock.  If there are no products that meet this criteria, the user will see an empty table.

<img width="814" alt="pic06_lowinv" src="https://user-images.githubusercontent.com/38221513/48067996-a8a16800-e19f-11e8-8166-5ba41e2c086c.png">


The third option allows the user to update the inventory for a specific product.  A prompt asks what the id is for the product the user wants to update.  A second prompt asks how many items the user wishes to increase the quantity.

<img width="868" alt="pic07_addtoexistinv" src="https://user-images.githubusercontent.com/38221513/48068020-b951de00-e19f-11e8-8931-f472aaf9f5d2.png">


The last option allows the user to add a new product to the inventory.  Prompts ask the user for the product id#, the product name, the department name, the price and the stock quantity.

<img width="654" alt="pic08_addprod01" src="https://user-images.githubusercontent.com/38221513/48068074-d686ac80-e19f-11e8-9e8d-afff89bf0d90.png">
<img width="852" alt="pic09_addprod02" src="https://user-images.githubusercontent.com/38221513/48068094-e56d5f00-e19f-11e8-9ecf-540de440b446.png">



## Thank You

Many thanks to the classmates that assisted with this assigment!
