select * from student;
-- concat function
select concat('raja',' manish');
select concat('joshi','manish',null);
select concat('manish',123);
select concat ('raja            ','manish',ifnull(null,''));
-- concat with saprater (this function also exclude null values)
select concat_ws(',','manish','joshi','chandra');
select concat_ws(',','manish','joshi','chandra',null,'hello');
-- ascii function will give ascii value
select ascii('a');
select ascii(null);
select ascii('');
select ascii('manish');
select ascii('m');
-- char function will return ascii value
select char(77);
select char(97,98,99);
select char(97,98,null,99);
select char(null);
-- left function will give n caracter from left side
select left('raja',3);
select left(null,3);
select left('manish',null);
-- right function will give n caracter from right side
select right('manish',3);
select right('manish',null);
select right('raja',10);
-- cast & convert function will typecast a type to another type  
select cast(10 as char(10));
select cast(current_Date as char(20));
select convert('2013-12-26',char(20));
select convert(100,char(10));
-- substr & substring will take a part of strings
select substr('manish',2,5);
select substring('manish chandra joshi',5,10);
select substring('manish',-2,1);
-- reverse function will reverse the string
select reverse('manish');
-- insert function will replace a substing with new substring 
select insert('raja sekhar',6,6,'redey');
-- instr will return the index of substing in string
select instr('manish','m');
-- date & time functions
select current_Date();
select curDate();
select current_time();
select curtime();
select current_timestamp();
select now();
select adddate(current_date,6);
select adddate(current_date,-6);
select subdate(current_date,6);--adddate with minus 
------------------------------------------------------------------------------
select rno,Name,Sub1 as 'markes'
'english' as Sub_name
case 
when Sub1>80 then 'A+'
when Sub1>70 then 'b'
end from student;
where rno is 1;