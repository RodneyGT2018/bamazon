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

var inventoryUpdate = [];
var addedProduct = [];

connection.connect();

// List a set of menu options: 1) View Products for Sale 2) View Low Inventory 3) Add to Inventory 4) Add New Product

//Create the prompt that will be loaded when the app starts
var managerOptions = {
	properties:{
		mOptions:{
			description: colors.yellow('Please choose one of the following options: \n1) View Products for Sale \n2) View Low Inventory \n3) Add to Inventory \n4) Add New Product')
		},
	},
};

//Start the prompt 
prompt.start();

//Prompt the question above and below it state what will be done based on the selected choice
prompt.get(managerOptions, function(err, res){
	if(res.mOptions == 1){
		viewProducts();
	} else if(res.mOptions == 2){
		viewInventory();
	} else if(res.mOptions == 3){
		addInventory();
	} else if(res.mOptions ==4){
		addNewProduct();
	} else {
		console.log(colors.red('You picked an invalid choice.'));
		connection.end();
	}
});

//1) View Products for Sale - Function for viewProducts
var viewProducts = function(){
	connection.query('SELECT * FROM Products', function(err, res){
		console.log('');
		console.log('Products for Sale')
		console.log('');	

		//Create a table outline to organize the data
		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['yellow'],
				compact: false,
				colAligns: ['center'],
			}
		});

		//Loop through and push data for each item returned
		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].ItemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]
			);
		}

		//Display the table and end the mysql query connection
		console.log(table.toString());
		connection.end();
	})
};

//2) View Low Inventory - Function for viewInventory
var viewInventory = function(){

	//Connect to database Products return only the items that have a stock quantity of less than 7
	connection.query('SELECT * FROM Products WHERE StockQuantity < 7', function(err, res){
		console.log('');
		console.log('Items With Low Inventory');
		console.log('');

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['yellow'],
				compact: false,
				colAligns: ['center'],
			}
		});

		//Loops through the data returned from mysql and pushes it into the table to be logged on the console
		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].ItemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]
			);
		}

		console.log(table.toString());
		connection.end();
	})
};

//3) Add to Inventory - Function for addInventory
var addInventory = function(){
	//Ask user to select the product and how many to add to that inventory
	var addInvt = {
		properties:{
			inventoryID: {
				description: colors.red('Product ID number needing inventory: ')
			},
			inventoryAmount:{
				description: colors.green('Number of items to add: ')
			}
		},
	};

	prompt.start();

	//Get the information entered in response to the prompt above
	prompt.get(addInvt, function(err, res){

		//creates a variable for the answers to the prompt questions
		var invtAdded = {
			inventoryAmount: res.inventoryAmount,
			inventoryID: res.inventoryID,
		}

		//Push new amount to inventory and update the inventoryUpdate array created earlier
		inventoryUpdate.push(invtAdded);

		//Connect to the Products database and calculate the new stock quanitity by adding the number entered above to the current stock quantity for the specified item ID
		connection.query("UPDATE Products SET StockQuantity = (StockQuantity + ?) WHERE ItemID = ?;", [inventoryUpdate[0].inventoryAmount, inventoryUpdate[0].inventoryID], function(err, result){

			if(err) console.log('error '+ err);

			//Select the newly updated information from the mysql database and send a confirmation to the user with the updated stock amount
			connection.query("SELECT * FROM Products WHERE ItemID = ?", inventoryUpdate[0].inventoryID, function(error, resOne){
				console.log('');
				console.log('The new updated stock quantity for id# '+inventoryUpdate[0].inventoryID+ ' is ' + resOne[0].StockQuantity);
				console.log('');
				connection.end();
			})
		})
	})
};

//4) Add New Product - Function for addNewProduct
var addNewProduct = function(){
	//Create the variable newProduct which contains the questions for the user and change their color to gray
	var newProduct = {
		properties: {
			newIdNum:{ description: colors.gray('Please enter a unique 5 digit item Id #')},
			newItemName:{ description: colors.gray('Please enter the name of the product you wish to add')},
			newItemDepartment: { description: colors.gray('What department does this item belong in?')},
			newItemPrice: { description: colors.gray('Please enter the price of the item in the format of 00.00')},
			newStockQuantity: { description: colors.gray('Please enter a stock quantity for this item')},
		}
	}

	prompt.start();

	//Get the responses for adding the new product above and put them in a variable so they can be pushed to the array holding response data (addedProduct variable above)
	prompt.get(newProduct, function(err, res){

		//Create a variable for the user responses to be logged to
		var newItem = {
			newIdNum: res.newIdNum,
			newItemName: res.newItemName,
			newItemDepartment: res.newItemDepartment,
			newItemPrice: res.newItemPrice,
			newStockQuantity: res.newStockQuantity,

		};

		//Push the variable with the response data to the addedProduct array defined at the top of this page
		addedProduct.push(newItem);

		//Connect to the database and insert the responses to create a new product within the database
		connection.query('INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (?, ?, ?, ?, ?);', [addedProduct[0].newIdNum, addedProduct[0].newItemName, addedProduct[0].newItemDepartment, addedProduct[0].newItemPrice, addedProduct[0].newStockQuantity], function(err, result){

			if(err) console.log('Error: ' + err);

			console.log(colors.green('New item below successfully added to the inventory!'));
			console.log(' ');
			console.log('Item id#: ' + addedProduct[0].newIdNum);
			console.log('Item name: ' + addedProduct[0].newItemName);
			console.log('Department: ' + addedProduct[0].newItemDepartment);
			console.log('Price: $' + addedProduct[0].newItemPrice);
			console.log('Stock Quantity: ' + addedProduct[0].newStockQuantity);

			connection.end();
		})
	})
};