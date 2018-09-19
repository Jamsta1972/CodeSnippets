delContractRecords();   


function delContractRecords()   


{   


var gr= new GlideRecord("ast_contract");   


gr.query();


gr.setWorkflow(false); //Don't fire Business rule,notifications   


gr.deleteMultiple();   


} 