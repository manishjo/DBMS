select * from student;
-- avg in each sub for a student;
select 
avg(Sub1) as 'avg_of_sub1' ,
avg(Sub2 ) as 'avg_of_Sub2' ,
avg(Sub3) as 'avg_of_Sub3' ,
avg(Sub4) as 'avg_of_Sub4' ,
avg(Sub5) as 'avg_of_Sub5' 
from student;
 -- totel of all sub for each student
 select 
 Name , Sub1+Sub2+Sub3+Sub4+Sub5 as 'totel'
 from student;
 
 -- if else conditions 
 select name,Sub4,Sub5, if(Sub4>Sub5,Sub4,Sub5) as 'bigone'  
from student; 

select if (Sub1>Sub2,Sub1,Sub2) from student;

-- switch case example 
select case rno 
when 1 then 10
when 10 then current_date
end
from student;  

------ conditional case 

select sub1,case
when Sub1>80 then 'A1'
when Sub1>70 then 'A'
when Sub1>60 then 'B'
when Sub1>45 then 'c'
else 'fail'
end
from student;

-- ifnull cheaks if first expression is null prints second and else first
select ifnull (10,20);
select ifnull (null,20);

select ifnull (null,null);

-- null if compares both expression if it same returns null else prints first expression;
select nullif (10,10);
select nullif (30,20);
select nullif (null,null);

-- number functions ...........

-- ceil rounds of the value to the next sammlest value
select sqrt(4);
select ceil(6.23);
select ceil (-1.23);
select ceil (null);
select ceil (0);

-- floor -> greatest int less then given value
select floor(5.33);
select floor(null);
select floor(1);

-- round rounds of value to its nearest int

select round(1.4);
select round (134,2);
select round(1.34,2);
select round(1.36,2);

-- truncate will only remove the decimal

select truncate(1.34,1);
select truncate(1.45,2);

-- greatest will take list of value and return which one is big
select greatest(2,3,5);
select greatest(2,null);
select greatest (10,20,ifnull(null,0));

-- least will give least value 

select least (2,3,4,ifnull(null,0));

-- sign will return 1 if it is positive value o if o and -1 if no is negative

select sign(1);
select sign(0);
select sign(-1);

-- mod
select mod(100,20);
select mod(201,10);
select mod(101,0);

-- random function rand

select rand();