// Dependencies
var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon' 
});

var prodPurchased = [];

connection.connect();

//Connect to the mysql database and pull the information from the Products database to display to the user
connection.query('SELECT ItemID, ProductName, Price FROM Products', function(err, result){
	if(err) console.log(err);

	//Create a table for the information from the mysql database to be placed and style it with color and alignment
	var table = new Table({
		head: ['Item Id#', 'Product Name', 'Price'],
		style: {
			head: ['yellow'],
			compact: false,
			colAligns: ['center'],
		}
	});

	//Loop through each item in the mysql database and push that information into a new row in the table
	for(var i = 0; i < result.length; i++){
		table.push(
			[result[i].ItemID, result[i].ProductName, result[i].Price]
		);
	}
	console.log(table.toString());

	purchase();
});

//The purchase function for one of the items listed above
var purchase = function(){

	//Create prompts for the user in different colors
	var productInfo = {
		properties: {
			itemID:{description: colors.yellow('Please enter the ID # of the item you wish to purchase')},
			Quantity:{description: colors.blue('How many items would you like to purchase?')}
		},
	};

	prompt.start();

	//"Get" the responses to the prompts above
	prompt.get(productInfo, function(err, res){

		//Put these responses in a variable called custPurchase
		var custPurchase = {
			itemID: res.itemID,
			Quantity: res.Quantity
		};
		
		//The variable is then pushed to the prodPurchased array defined at the top of the page
		prodPurchased.push(custPurchase);

		//Code that connects to the database and selects the item ID the user selected above 
		connection.query('SELECT * FROM Products WHERE ItemID=?', prodPurchased[0].itemID, function(err, res){
				if(err) 
				console.log(colors.red(err, 'Sorry, but that item ID does not exist.'));
				
				//If the existing StockQuanity is less than the amount that the user wanted to purchase, then the user will be alerted that the product is out of stock (in red letters)
				if(res[0].StockQuantity < prodPurchased[0].Quantity){
					console.log(colors.red('Sorry, the requested quantity of this item exceeds our current inventory.'));
					connection.end();

				//If the existing StockQuantity is more than or equal to the amount being purchased, then the purchase is continued and the user is alerted of what item is being purchased, the cost per item, and the total amount
				} else if(res[0].StockQuantity >= prodPurchased[0].Quantity){

					console.log('');

					console.log(prodPurchased[0].Quantity + ' items purchased');

					console.log(res[0].ProductName + ' ' + res[0].Price);

					//Create the variable saleTotal to hold the calculation of the total amount owed by the user
					var saleTotal = res[0].Price * prodPurchased[0].Quantity;

					//Connect to the mysql database Departments and update the saleTotal for the id of the item purchased
					connection.query("UPDATE Departments SET TotalSales = ? WHERE DepartmentName = ?;", [saleTotal, res[0].DepartmentName], function(err, resultOne){
						if(err) console.log('error: ' + err);
						return resultOne;
					})

					console.log('Total: ' + saleTotal);

					//Update stock quantity of the item purchased in a variable called newQuantity
					newQuantity = res[0].StockQuantity - prodPurchased[0].Quantity;
			
					// Connect to the mysql database of products and update the stock quantity for the item bought.  Also inform the user that the item has been processed (in green)
					connection.query("UPDATE Products SET StockQuantity = " + newQuantity +" WHERE ItemID = " + prodPurchased[0].itemID, function(err, res){
						if(err) 
						console.log(colors.green('Your order has been processed.  Thank you for your business!'));
						console.log('');

						connection.end();
					})
				};
		})
	})
};