
/*
This loops through all the templates associated with the change table,
grabs the template field,
isolates the references to categories,
and replaces them with equivalent categories on the change table.*/

var tmple = new GlideRecord('sys_template');
var q = 'table=change_request^u_administrator_notesLIKEREQ0097663';
tmple.addEncodedQuery(q);
tmple.query();

while(tmple._next()){
	
	var str = tmple.template;

 	var regEx = /u_cat_lev_.{34}/gi;
	var sysIDs = str.match(regEx);
	gs.print('all cat syses: ' + sysIDs);
	for (var i = 0; i < sysIDs.length; i++){
		var thisSys = sysIDs[i].substring(12,sysIDs[i].length);
		
		var tCat = new GlideRecord('u_task_categories');
		tCat.get(thisSys);
		var tCatName = tCat.u_name;
		
		var tCat2 = new GlideRecord('u_task_categories');
		var qStr = 'u_active=true^u_table=change_request^u_administrator_notesLIKEREQ0097663^u_name=' + tCatName;
		tCat2.addEncodedQuery(qStr);
		tCat2.query();
		if (tCat2.next()){
			var str2 = str.replace(thisSys, tCat2.sys_id.toString());
			gs.print('old Str: ' + str + ' /new Str: ' + str2);
		}
	}
	
	tmple.template = str2;
	tmple.update();
}
