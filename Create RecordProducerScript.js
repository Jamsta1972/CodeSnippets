/*This script loops through the Task Cats and creates the Record producers and associates
them with the correct category based on the service the Task Cats are against.
*/

var tCat = new GlideRecord('u_task_categories');
var qStr = 'u_table=sc_request^u_servicesLIKEe7e42554db34f640741d70bdae9619f9^ORu_servicesLIKE27e42554db34f640741d70bdae9619f9^ORu_servicesLIKEe3e42554db34f640741d70bdae9619fa^ORu_servicesLIKE23e42554db34f640741d70bdae9619fa^ORu_servicesLIKEafe42554db34f640741d70bdae9619f8^ORu_servicesLIKE63e42554db34f640741d70bdae9619f9^ORu_servicesLIKEabe42554db34f640741d70bdae9619f9^ORu_servicesLIKE6fe42554db34f640741d70bdae9619f9';
tCat.addEncodedQuery(qStr);
//tCat.setLimit(10);
tCat.query();
while(tCat.next()){
	
	//Exclude categories that have children (as we only want to create record producers for the lowest in each branch of the hierarchy). 	
	var tCatChild = new GlideRecord('u_task_categories');
	tCatChild.addQuery('u_parent', tCat.sys_id);
	tCatChild.query();
	if(!tCatChild.hasNext()){ //create the record producer.
		
		var recProd = new GlideRecord('sc_cat_item_producer');
		recProd.name = tCat.u_name;
		recProd.short_description = tCat.u_name;
		recProd.description = tCat.u_name;
		recProd.table_name = 'sc_request';
		recProd.active = true;
		recProd.order = tCat.u_order; //put them in the same order as the categories.
		recProd.u_administrator_notes = recProd.u_administrator_notes = tCat.u_administrator_notes;
		recProd.u_tokens = tCat.u_tokens;
		
		var recCat = new GlideRecord('sc_category'); //look up the category.
		var svce_sys_id = tCat.u_services.toString(); //Service referenced from the tCat
		var svceRecord = new GlideRecord('u_service');
		svceRecord.get(svce_sys_id); //Grab that actual service record.
		var svceName = svceRecord.u_name; //and Grab the Name of it.
		var recCatName = svceName + ' IMACs'; //and ' IMACs' to the name.
		recCat.get('title', recCatName); //and grab the equivalent Category record (ie the one with the same name as the service but with ' IMACs' at the end.
		recProd.category = recCat.sys_id;
		recProd.sc_catalogs = 'e0d08b13c3330100c8b837659bba8fb4'; //The Service Catalog.
		recProd.insert();
		
		//Now add the variable set (Requester):
		var vSetRel = new GlideRecord('io_set_item');
		vSetRel.variable_set = 'de6bd7527cd9d000e29a1c87acd928b5';
		vSetRel.sc_cat_item = recProd.sys_id;
		vSetRel.insert();
	}
	
}

