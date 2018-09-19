
var tCat = new GlideRecord('u_task_categories');
var qStr = 'u_administrator_notesLIKECategory added ref: REQ97663 when S4B categories revised.';
tCat.addEncodedQuery(qStr);
//tCat.setLimit(10);
tCat.query();
while(tCat.next()){
	
	//Exclude categories that have children (as we only want to create record producers for the lowest in each branch of the hierarchy). 	
	var tCatChild = new GlideRecord('u_task_categories');
	tCatChild.addQuery('u_parent', tCat.sys_id);
	tCatChild.query();
	if(!tCatChild.hasNext()){ //create the template.
		var tmpStr = '';
		
		if (tCat.u_level == 1)
			tmpStr = 'u_cat_lev_1=' + tCat.sys_id;
		else
			tmpStr = 'u_cat_lev_1=' + tCat.u_parent + '^u_cat_lev_2=' + tCat.sys_id;
		
		tmpStr += '^short_description=' + tCat.u_name + '^contact_type=self-service';
		
		var tmple = new GlideRecord('sys_template');
		tmple.name = tCat.u_name;
		tmple.short_description = tCat.u_name;
		tmple.table = tCat.u_table;
		tmple.template =  tmpStr;
		tmple.roles = 'admin';
		var id = tCat.u_administrator_notes.toString();
		id = id.substring(0,9);
		tmple.u_unique_id = id;
		tmple.insert();
		
		/*
		//And here, the bit to look up the record producer and associate it with this template.
		var recProd = new GlideRecord('sc_cat_item_producer');

		var svce_sys_id = tCat.u_services.toString(); //Service referenced from the tCat
		var svceRecord = new GlideRecord('u_service');
		svceRecord.get(svce_sys_id); //Grab that actual service record.
		var svceName = svceRecord.u_name; //and Grab the Name of it.
		var recCatName = svceName + ' IMACs'; //and ' IMACs' to the name.
		
		recProd.addQuery('name', tCat.u_name);
		recProd.addQuery('category.title', recCatName);
		recProd.setLimit(1);
		recProd.query();
		if(recProd.next()){
			recProd.template = tmple.sys_id;
			recProd.update();
		}
	*/
	}
	
}