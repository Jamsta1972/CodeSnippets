function onLoad() {
   g_form.showFieldMsg('issue_description','To add an attachment, first submit this incident and then use the paperclip icon at top right of the form. Please attach a screenshot for console issues.','error');
 
	var msg = "Are emails being updated on the PC/Laptop/Mac? If not, this is not an MDM issue.*Does Internet access work on the device? If not, this is not an MDM issue.*Symptoms present when the device is connected to the WiFi but working over 3G/4G – not an MDM issue.*Symptoms present when device is connected to the 3G/4G but working over the WiFi – not an MDM issue (SIM/carrier issues).*Admin portal not accessible using the URL but working using the IP – not an MDM issue.*Admin portal not accessible over WiFi but working over LAN – not an MDM issue (also applies for the opposite).*A non-compliance error message displayed on the device(s) – this is an MDM issue.";
	var spli = msg.split('*');
	var len = spli.length;
	 
	for(var i = len - 1; i > -1; i--)
	{
	g_form.showFieldMsg('client_ref', spli[i], 'error');
	}
 
}

//Put a separator in the string. Split on that. Loop BACKWARDS - because later messages are displayed on TOP of earlier ones.