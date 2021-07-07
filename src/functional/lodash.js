import {compose, pipe} from "lodash/fp";

let input = "      Javascript       ";
let output = '<div>' + input.trim() + '</div';


const trim = str => str.trim();
const wrap = type => str => `<${type}>${str}</${type}>` //here we use currying.
const toLowerCase = str => str.toLowerCase();

// const result = wrapInDiv(toLowerCase(trim(input))); //this is known functional composition in javascript.
//problem with this function omposition is that we need to read it from the right to left, i.e input-trim it-convert to lowercase-then wrap in div.
//another problem is the parantheses gets bigger n bigger the more we add in more functions.

//How to solve it:
//Using Lodash.
// const transform = compose(wrapInDiv, toLowerCase, trim); //this still has the problem of reading from right to left.  To solve it, we use pipe : a built in function from lodash.
// transform(input)

const transform = pipe(trim, toLowerCase, wrap("span")); //pipe is a lodash built in function that reverses "compose" which lists arguments in reverse order.
console.log(transform(input));





