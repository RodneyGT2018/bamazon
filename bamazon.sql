DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products (
ItemID INTEGER NOT NULL,
ProductName VARCHAR(50) NOT NULL,
DepartmentName VARCHAR(50) NOT NULL,
Price DECIMAL(5,2) NOT NULL,
StockQuantity INTEGER NOT NULL
);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES 
(12345,
'Vacuum',
'Home',
89.99,
50),

(67891,
'Mens Zip-up Hoodie',
'Mens Clothing',
29.99,
40),

(23456,
'Silverware Set for 4',
'Home',
39.99,
30),

(78912,
'Wireless Headphones',
'Electronics',
69.99,
15),

(34567,
'Full Zip Windbreaker - Any Color',
'Womens Clothing',
59.99,
300),

(89123,
'Clemson Football Long Sleeve T-Shirt',
'Womens Clothing',
34.99,
60),

(45678,
'Mens Winter Gloves - Black',
'Mens Clothing',
14.99,
45),

(91234,
'1800 Count Bed Sheet Set - King',
'Home',
59.99,
10),

(56789,
'Winter Vest - Medium Sized Dogs',
'Pets',
25.99,
10),

(11234,
'Small Dog Carrier with Plush Bedding',
'Pets',
109.99,
50),

(12234,
'Kids Glow-in-the-Dark Air Jordan',
'Shoes',
199.99,
100);

USE Bamazon;
CREATE TABLE Departments(
DepartmentId INTEGER AUTO_INCREMENT,
PRIMARY KEY(DepartmentId),
DepartmentName VARCHAR(50) NOT NULL,
OverHeadCosts DECIMAL(11,2) NOT NULL,
TotalSales DECIMAL(11,2) NOT NULL
);


INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES 
('Mens Clothing',
1000,
0),
 
('Pets',
3000,
0),

('Home',
4000,
0),
 
('Shoes',
1000,
0),

('Electronics',
500,
0),

('Womens Clothing',
1500,
0);


