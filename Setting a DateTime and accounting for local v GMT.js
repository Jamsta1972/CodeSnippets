var req = new GlideRecord('sc_request');
req.get('number', 'REQ0150329');
gs.print(req.u_unify_action_due);

/*This is the best way to set a dateTime.
Get the time into the YYYY-MM-DD HH:MM:SS.
Create a GlideDateTime object out of it.
If you have the local time, the standard way to apply the offset is as 

*/

var y = new GlideDateTime("2018-07-15 17:13:14");
var offSt = y.getDSTOffset() / 1000; //UTC/GMT offset in seconds.
y.addSeconds(-offSt); //this accounts for UTC/GMT v BST. NOTE It's MINUS OffSt
gs.print(y.getDSTOffset());
req.u_unify_action_due = y;
req.update();
gs.print(req.u_unify_action_due);