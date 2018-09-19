var ci = new GlideRecord('cmdb_ci');
//var qStr = 'sys_class_name!=service_offering^install_status=1^u_snow_admin_idISEMPTY';
var qStr = 'sys_class_name!=service_offering^install_status=1';
var ciSnowID = gs.getProperty("cmdb.snow_admin_id").toString();
var cnt = ciSnowID.substring(4, 12);
//gs.print(cnt);
ci.addQuery(qStr);
ci.query();

while (ci.next()){	
	ci.u_snow_admin_id = 'SNOW' + cnt;
	ci.autoSysFields(false);
	ci.update();
	//gs.print(cnt);
	cnt++;
}
//gs.print(cnt);
gs.setProperty("cmdb.snow_admin_id", 'SNOW' + cnt);