function add(a) {
    return function (b) {
        return a + b;
    }
        
}

const result = add(1)(5)
console.log(result);


//using arrow function 
const add2 = a => b => a + b;
const add2result = add2(1)(9);

console.log(add2result);

//currying is a javascript function utility that takes a function with "n" number of arguments and outputs a function with 1 argument. 