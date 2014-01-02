create table college(
	rollNo int primary key,
	name char(20),
	percentage double	
);

insert into college values(2,'Manish',65.7);
select * from college;

create table library(
	noofBooks int,
	studentId int,
	foreign key(studentId) references college(rollNo)
);

desc library;      
select * from library;
insert into library values(5,3);