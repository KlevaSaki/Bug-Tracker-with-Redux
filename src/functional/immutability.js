const person = {
    name: "John",
    age: 24,
    address: {
        country: "KENYA",
        city: "Nairobi"
    }
}

//to use immutability in the above object, we need to make a copy of the object first before we can change the properties.
//This is done by 1. Object.assign function or 2. the Spread operator.

//Object.assign
// const updated = Object.assign({}, person, {name: "Bob", age: 30});

// console.log(person)
// console.log(updated);


//Spread Operator
// const updated = {...person, name : "Bob", age: 30};
// console.log(updated);


//Remember both these methods perform a shallow copying, which can cause problem with nested objects.
// const updated = {...person, name : "Bob", age: 46}
// updated.address.city = "Mombasa" //updating the address city for the "updated" person updates even the original copy, i.e person.

// console.log(person);

//The above problem can be solved by performing a deep copy.
const updated = {
    ...person,
    address: {
        ...person.address,
        city: "Mombasa"
    },
    age: 46
}

console.log(person);
console.log(updated);

//In short, immutability does not work on nested objects, and updating the copy will make a change to the original


//IMMUTABILITY WITH ARRAYS
const numbers = [1,2,3];

    //Adding at the end
const added = [...numbers, 4];  //This adds a new number at the end of the array
console.log(added);

    //Adding at the beginning
const added2 = [4, ...numbers]; //This adds a new number at the beginning of the array
console.log(added2);

    //Adding in between
const index = numbers.indexOf(2);
const added3 = [...numbers.slice(0, index), 4, ...numbers.slice(index)]

console.log(added3);

    //Removing
const removed = numbers.filter((n) => n !== 2); //returns a new array with the filtered item. **immutability**
console.log(removed);

    //Updating
const updating = numbers.map(n => n === 2 ? 20 : n)
console.log(updating);



//Javascript does not enforce immutabilty, although we have libraries that can help to enforce this. e.g Immutable, immer, Mori.

//Immutable.js
// import {Map} from "immutable"

// let book = Map({title: "Harry Potter"});

// function publish(book) {
//     return book.set("isPublished", true)
// }

// book = publish(book)

// console.log(book.toJS());
// console.log(book.get("title"));


//Immer.js
import {produce} from "immer";

let book = {title: "Harry Potter"}

function publish(book){
    return produce(book, updatedBook => {
        updatedBook.isPublished = true;
    })
}

const newBook = publish(book)
console.log(newBook);

