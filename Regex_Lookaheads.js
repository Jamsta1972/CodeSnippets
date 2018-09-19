var str = 'This is the update:\nsend';
var myReg = /update:(.|\n|\r)*(?=end)/i;
var res = str.match(myReg);
gs.print(res);
gs.print(res[0]);
var upd2 = res[0].replace("update:","");
gs.print(upd2);

/*
For a look ahead, where the match excludes the pattern at the end,
do this as in the example above (?=end). Note that the match pattern MUST be inside brackets.
JS does not have a lookbehind, so you when you want to find a string between two strings,
you have to first include the starting text in the match, and then replace it.

The 'inbetween' bit is as below. So that's: any character, new line or carriage return, any number of times:
(.|\n|\r)*

*/