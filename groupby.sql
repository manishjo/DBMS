select * from emp_table;
insert into emp_table values (10,NULL,"raj2","20");
insert into emp_table values (14,8000,"harjas2",NULL);
insert into emp_table values (14,0,"harjas2",NULL);
select dep_no, max(salary) from emp_table group by dep_no;
select dep_no, sum(salary) from emp_table group by dep_no;
select dep_no, sum(salary),avg(salary) from emp_table group by dep_no;
select 4000+NULL from emp_table;
select dep_no, sum(salary),avg(salary) from emp_table group by dep_no,emp_no;
select dep_no,emp_no,sum(salary) from emp_table group by dep_no;
select dep_no, max(salary) from emp_table 
where dep_no is not null  group by dep_no
having max(salary)>= 5000;
select dep_no, sum(salary) from emp_table 
where dep_no is not null  group by dep_no
having count(*)>= 2;
select emp_name, salary+5000 as newsal 
from emp_table
where newsal >= 5000;