-- creating a view ... it gives you behaviour of real table.
create view 
vehicle_info_view
as
select vehicle_type, color
from vehicle_info;

-- watching a view..
 select * from vehicle_info_view;
 
 