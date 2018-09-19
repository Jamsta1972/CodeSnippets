
//This function gets the text content from HTML.
//Originally used to handle rogue HTML data being received from Wolseley

var str = 'blah blah lots of HTML';

var desc = getTextfromHTML(str);

function getTextfromHTML(html) {
    var el = document.createElement( 'html' );
    el.innerHTML = html;
    return el.textContent;
}