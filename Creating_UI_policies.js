//
//Update the assignment of qStr in the script below, so that it correctly identifies only the record producers that have not yet had ui policies added.

for (var i = 1; i < 13; i++){
	
	var primFieldName = 'u_mds_1_' + i;
	
	var vrb = new GlideRecord('item_option_new');
	var qStr = 'cat_item.ref_sc_cat_item_producer.u_unique_idLIKEIMACS^cat_item.active=true^name=' + primFieldName;
	vrb.addEncodedQuery(qStr);
	//gs.log('qStr: ' + qStr);
	//vrb.setLimit(1);
	vrb.query();
		
	while(vrb.next()){
		//gs.log('in vrb loop. primFieldName is ' + primFieldName + '. i is ' + i + '.');
		var uip = new GlideRecord('catalog_ui_policy');
		uip.applies_to = 'item';
		uip.catalog_item = vrb.cat_item;
		uip.short_description = 'Show optional Amendment #' + i;
		uip.catalog_conditions = 'IO:' + vrb.sys_id + 'ISNOTEMPTY';
		uip.insert();
		
		var vrb2 = new GlideRecord('item_option_new');
		var qStr2 = 'cat_item=' + vrb.cat_item + '^nameENDSWITH_' + i + '^sys_id!=' + vrb.sys_id;
		vrb2.addEncodedQuery(qStr2);
		vrb2.query();
		
		while(vrb2.next()){
			//gs.log('in vrb2 loop. primFieldName is ' + primFieldName + '. i is ' + i + '. vrb is ' + vrb.name + ', vrb2 is ' + vrb2.name + '.');
			var uipA = new GlideRecord('catalog_ui_policy_action');
			
			uipA.catalog_item = vrb.cat_item;
			uipA.catalog_variable = 'IO:' + vrb2.sys_id;
								
			uipA.ui_policy = uip.sys_id;
			uipA.visible = true;
			
			//Set mandatory, if the equivalent field in the first set of variables for this IMAC is mandatory.
			var str = vrb2.name.toString();
			var pos = 0; //position of last underscore
			var last = false;
			for (var z = str.length - 1; z > str.length - 4; z--){
				if (str.substring(z, z + 1) == '_' && !last){
					pos = z;
					last = true;
				}
			}
			var str2;
			
			if (pos > 0)
				str2 = str.substring(0, pos);
			else
				str2 = 'no pos';
			
			gs.log('pos is: ' + pos + ', str is: ' + str + ', str2 is: ' + str2);
			var vrb3 = new GlideRecord('item_option_new');
			vrb3.addQuery('cat_item', vrb.cat_item);
			vrb3.addQuery('name', str2);
			vrb3.query();
			if (vrb3.next()){
				gs.log('NAME: ' + vrb3.name);
				gs.log('CAT ITEM: ' + vrb3.cat_item.name);
				gs.log('MAND: ' + vrb3.mandatory);
				if (vrb3.mandatory){
					uipA.mandatory = true;
				//end setting mandatory if necessary.
				}
			}
			uipA.insert();
		}
		
		var uipANextNumber = new GlideRecord('item_option_new');
		var qStr3 = 'cat_item=' + vrb.cat_item + '^name=u_mds_1_' + (parseInt(i) + 1);
		uipANextNumber.addEncodedQuery(qStr3);
		uipANextNumber.query();
		
		if (uipANextNumber.next()){
			var uipA2 = new GlideRecord('catalog_ui_policy_action');
			
			uipA2.catalog_item = vrb.cat_item;
			uipA2.catalog_variable = 'IO:' + uipANextNumber.sys_id;
		
			uipA2.ui_policy = uip.sys_id;
			uipA2.visible = true;
			uipA2.insert();
		}
	}
}