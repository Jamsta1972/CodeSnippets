//This code replaces HTML entities with the actual character.
//It's handy for if you get JSON responses that contain the entity codes.
//It's also a neat example of a nested anonymous function.

function parseHtmlEnteties(str) {
    return str.replace(/&#([0-9]{1,4});/gi, function(match, numStr) {
        var num = parseInt(numStr, 10); // read num as normal number
        return String.fromCharCode(num);
    });
}