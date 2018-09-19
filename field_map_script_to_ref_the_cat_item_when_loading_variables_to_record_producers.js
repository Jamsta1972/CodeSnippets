var rp = new GlideRecord('sc_cat_item_producer');
var rpID = source.u_rp;
rp.addEncodedQuery('active=true^u_unique_id=' + rpID);
rp.query();
if(rp.next())
	answer = rp.sys_id;

/*
RP is the column header in your spreadsheet, containing the unique ID of the record producer to which you want to load this variable.
And, have the reference field name on the map as 'u_unique_id'.
Why not just map directly? Because it doesn't recognise the target class as a record producer. Instead, it thinks it's a cat_item and creates a brand new one, rather than linking to the existing RP. So, this script specifies that it's a record producer (child of cat_item).

*/