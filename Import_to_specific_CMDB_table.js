
var dTyp = source.u_class; //equip type

if ( dTyp.match(/Router/i) != null ){
 target.sys_class_name="cmdb_ci_ip_router";
}

else if ( dTyp.match(/Access Point/i) != null ){
 target.sys_class_name="u_access_point";
}

else if ( dTyp.match(/Switch/i) != null ){
 target.sys_class_name="cmdb_ci_ip_switch";
}

else if ( dTyp.match(/Module/i) != null ){
 target.sys_class_name="u_router_cards";
}

else if ( dTyp.match(/Appliance/i) != null || dTyp.match(/Firewall/i) != null){
 target.sys_class_name="u_security_appliance";
}

else if ( dTyp.match(/Software/i) != null ){
 target.sys_class_name="cmdb_ci_spkg";
}

else{ //Default to Network Gear
 target.sys_class_name="cmdb_ci_netgear";
}

