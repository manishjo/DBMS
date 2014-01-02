-- creating a product ....
create table product (
productId int,
productName varchar(20),
unitPrise int,
productCategory varchar(10),
productAvailability char(1)
)
select * from product;

-- adding primary key 
Alter table product 
add constraint productId primary key(productId);

-- adding values ......
insert into product values (01,'pen',10,'Stationery','y');
insert into product values (02,'carrot',15,'vagitable','y');

-- creating sales table....
create table sales(
	salesId int,
	productId int,
	itemSold int
)

-- adding primary key ...
Alter table sales
add constraint salesId primary key(salesId);

-- adding foreign key for table sales
Alter table sales
add constraint foreign key(salesId) references product(productId);

-- adding valus to sales table
insert into sales values (001,01,2);
insert into sales values (001,01,2);

select * from sales;

-- adding forign key with on delete cascade..
Alter table sales
add constraint foreign key(salesId) references product(productId)
on delete cascade;

-- adding quantity to sales table  
Alter table sales
add column quantity int;

-- updating quantity
update sales
set quantity = 2 where salesId = 1;

-- joining table....

select sales.salesId, product.productName,sales.quantity
from sales,product
where
product.productId = sales.productId
and product.productName = 'pen';

-- showing both table...
select * from product , sales;

