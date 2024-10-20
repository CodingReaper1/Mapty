'use strict'; // Always write this at start of code prevents bugs from happening

//////////////////////////////////////////////////////////
// Valuable information

// If you want to add/remove css by javascript using html classes is good option

// Most variables defined in function will only be avalable in same function

// Const and let are block-scoped

// Var is function-scoped

// Arrow functions "this" uses outside scope's "this"

// "this" in normal functions points to undefined

// "this" on event handler will always point to selected DOM element

// Primitives: Number, String, Boolean, Undefined, Null, Symbol, Bigint

// Objects/Reference: Object literal, Arrays, Functions, Many more...

// Even if we use const on object we can still change it becouse value is not changed in call stack, but change happens in heap

// Iterables: arrays, strings, maps, sets. NOT objects

// We can only use spread when building an array or when we pass argument in function

// JSON is data format which is coming from web APIs, which can be easily converted into javascript objects

// We should use maps as data structure when we need something other than strings as keys of maps

// Destructuring can be rly strong :)

// FIRST-CLASS FUNCTIONS(are simply values) are just concept which makes possible HIGHER-ORDER FUNCTIONS in practise

// Closure is connection between innerfunction and outerfunction even after outerfunction has finished executing CLOSURES also have priority over scope chain

// in console something shown in [[]] (example: [[Scopes]]) we cant access them by code

// Higher-order function requires call-back function in order to use it

// When in html form is btn when adding event listner it reloades page so use .preventDefault()

// When you want to load script overall best option is writing in head with DEFER this guarantees order of script loading but if you are not using 3rd party library/scripts then you can use ASYNC in head but this doesnt guarrantees order of script execution

// Prototpal inheritance is different from class inheriting from class this is simlpy instance inheriting from class

// Any object has acces to methods and properties from its prototype

// Person.prototype is actualy not prototype of person but instead it is whats gonna be used as prototype of all the objects that are created with person constructor function so it is prototype of object created by person constructor function

//////////////////////////////////////////////////////////
// Functions

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

const greet = () => console.log('Hey Giorgi'); // Callback function
btnClose.addEventListener('click', greet); // Higher-order function

const greet2 = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet2('Hey');

greeterHey('Jonas');
greeterHey('Giorgi');

greet2('Hello')('Giorgi');

const greet3 = greeting => name => console.log(`${greeting} ${name}`);

book.call(eurowings, 23, 'Sarah Williams'); // First argument points to what "this" keyword should be
book.apply(swiss, flightData); // Similar like .call but second argument must be array of data (always use .call anyways (we can use spread operator))
const bookEW = book.bind(eurowings); // Sets "this" keyword to eurowings, first is to what we want to set this keyword to and second what should we pass as argument(maybe in function)
bookEW(23, 'Steven Williams');
const bookEW23 = book.bind(eurowings, 23); // Partial application, so we can preset parameters

(function () {
  console.log(`This will never run again`);
})(); // Function which will be executed only once

(() => console.log(`This will also never run again`))();

//////////////////////////////////////////////////////////

debugger; // Stops javascript and opens debugger in console
console.dir(booker); // To see closures
prompt(); // Popup window which returns string
alert();
const guestCorrect = restaurant.numGuests ?? 10; // If restaurants.numGuests===0 variable will be 0. Nullish coalesing operator works on Nullish: null and undefined
rest1.numGuests ||= 10; // === rest1.numGuests = rest1.numGuests || 10;
rest1.numGuests ??= 10;
rest1.owner &&= '<ANNONYMOUS>'; // === rest2.owner = rest2.owner && '<ANNONYMOUS>';
(answer === 0 || answer) && this.answers[answer]++; // Maybe be usefull as ??s && version
e.preventDefault(); // To prevent default
inputLoginPin.blur(); // Input field to lose focus
inputDistance.focus(); // Oposite of blur()

// Toggle example
let sorted = false;
sorted = !sorted; // add this to click event

let g = 10; // g++ returns 10 however g =11 so we have to use ++g which returns 11

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const map = L.map('map').setView([51.505, -0.09], 13); // Map here must be html element id in which we want to display map

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position!');
    }
  );

//////////////////////////////////////////////////////////
// For Arrays

const friends = ['Michael', 'Steven', 'Peter'];
friends.push('Jay'); // Adds element at the end
friends.unshift('John'); // Adds element at the start
friends.length; // To get length of array
// all 3 of them returns length of array
console.log(...friends); // Logs whole array but inside of it, we can only use it in places where we would otherwise write values seperated by comas
friends[friends.length] = 'someone'; // Adds at the end
const ar3 = array1.concat(array2); // To merge 2 arrays

friends.pop(); // Removes last in array
friends.shift(); // Removes first in array
// Returns value of removed element

friends.indexOf('Steven'); // Finds index of element in array
friends.includes('Steven'); // Checks if element is in array

const [x, y, z] = arr; // Array destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;

const arr = [1, 2, ...[3, 4]]; // SPREAD,becouse on RIGHT side of =

const [a, b, ...others] = [1, 2, 3, 4, 5]; // REST, becouse on LEFT side of =

const [players1, players2] = game.players;
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;
const allPlayers = [...players1, ...players2];
const players1Finals = [...players1, 'Thiago', 'Countinho', 'Perisic'];

console.log(users[0]?.name ?? 'Users array empty'); // Checks if array is empty

console.log(arr.slice(2, 4)); // Doesnt mutate original array and returns new array and not includes
console.log(arr.slice()); // Shallow copy
console.log([...arr]); // Shallow copy
console.log(arr.splice(2)); // MUTATES ARRAY and does alot
console.log(arr2.reverse()); // MUTATES ARRAY
const letters = arr.concat(arr2);
console.log([...arr, ...arr2]);
console.log(letters.join(' - '));
console.log(arr.at(0)); // Same as console.log(arr[0]);
console.log(arr[arr.length - 1]); // Get last element
console.log(arr.at(-1)); // Get last element

movements.forEach(function (movement, index, array) {}); // Recieves current element as argument(movement),index and whole array. doesnt have continue/break

const movementsUSD = movements.map(function (mov) {}); // Just like .forEach method but returns new array(not mutates original)

// Functions should recieve data instead of using global variable to get data

const deposits = movements.filter(function (mov) {
  return mov > 0;
}); // filters out new array

const balance = movements.reduce((acc, cur, i, arr) => (acc += cur), 0); // First argument is accumulator = "sum" , reduces second parameter is where to start counting from. OP OP OP

const maxValue = movements.reduce(
  (acc, mov) => (mov > acc ? (acc = mov) : acc),
  movements[0]
);

const firstWithdrawal = movements.find(mov => mov < 0); // Returns first elemnt of array which satisfys condition

const index = accounts.findIndex(acc => acc.owner === currentAccount.owner);

const anyDeposits = movements.some(mov => mov > 0); // (ANY) if theres any value which satisfys condition it returns true(or false)

console.log(movements.every(mov => mov > 0)); // Returns true if all satisfy codition

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8].flat(2); // unnests array takes as argument how deep should unnesting be

const overalBalance2 = accounts.flatMap(acc => acc.movements); // map+flat but only goes one lvl deep in nest

console.log(owners.sort()); // Sorts alphabetally and MUTATES ARRAY WORKS ONLY ARRAY WITH STRINGS

movements.sort((a, b) => a - b); // SORTING WORKING FOR NUMBERS ARRAY

x.fill(1, 3, 5); // First parameter with what to be filled two and thrid from which possition to where

const d = Array.from({ length: 7 }, (cur, i) => i + 1); // Array constructure, Array here is function and on that we call .from() method

const movmentsUI = Array.from(
  document.querySelectorAll('.movements__value')
).map(el => Number(el.textContent.replace('€', ''))); // Turining dom elements into nodelist ,array and getting textcontent at the en

//////////////////////////////////////////////////////////
// For Objects. Properties/keys with their values. Order doesnt matter which is different from arrays.

const giorgi = {
  firstName: 'Giorga',
  lastName: 'Gamgebeli',
  birthYear: 2005,
  job: 'programmer',
  friends: ['Michael', 'Steven', 'Peter'],

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  }, // this gets same object in which method is in and also to be able to use age as property first you need to call the method
};

const { name, openingHours, categories } = restaurant; // Destructuring objects

const {
  fri: { open: o, close: c },
} = openingHours; // Destructuring nested object

const { menu = [], starterMenu: starter = [] } = restaurant; // Default values

({ a, b } = obj); // Mutating variables

const jessicaCopy = Object.assign({}, jessica2); // Only creates shallow copy and not deep clone
const restaurantCopy = { ...restaurant }; // Shallow copy

console.log(giorgi.lastName); // Only real properties
console.log(giorgi['lastName']); // Can wrie any expresion

giorgi.location = 'Tbilisi'; // To add property and value
giorgi['discord'] = 'Reaper'; // To add property and value

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // Checks if restaurant.order exists
console.log(restaurant.openingHours?.mon?.open); // Checks if restaurant.opening hours and restaurant.openinghours.mon exists

// property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours); // Converts object into Iterable
console.log(entries);
console.log(entries[0][0]);

// [key, value]
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// If we want index
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// If we want key and value
for (const [key, val] of Object.entries(game.odds)) {
  console.log(`Odd of victory ${game[key] ?? 'Draw'}: ${val}`);
}

//////////////////////////////////////////////////////////
// Sets

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Rissotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza')); // Methods
ordersSet.add('Garlic Bread');
ordersSet.delete('Rissotto');
ordersSet.clear();
currenciesUnique.forEach(function (value, key, map) {});

//////////////////////////////////////////////////////////
// MAPS similar like objects but keys can be anything (number, boolean) also after updating it returns new map value

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.has('categories'));
rest.delete(2);
console.log(rest.size);
rest.clear();

const arra = [1, 2];
rest.set(arr, 'Test');

console.log(rest.get(arr));

rest.set(document.querySelector('h1'), 'Heading');

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]); // Is very similar to Object.entries(obj)
const hoursMap = new Map(Object.entries(openingHours)); // Creating map by object
console.log([...question]); // Converting back to object but to question.entries()
console.log(question.keys());
console.log(question.values());
currencies.forEach(function (value, _, map) {});

//////////////////////////////////////////////////////////
// For loop keeps running while condition 2 is TRUE

// const giorga = [
//   "Giorga",
//   "Gamgebeli",
//   2037 - 2005,
//   "programmer",
//   ["Michael", "Steven", "Peter"],
//   true,
// ];
// const types = [];

for (let i = 0; i < giorga.length; i++) {
  console.log(giorga[i], typeof giorga[i]);

  types.push(typeof giorga[i]);
  // types[types.length] = typeof giorga[i];
  // types[i] = typeof giorga[i];
}
for (let i = 0; i < giorga.length; i++) {
  if (typeof giorga[i] !== 'string') continue;
  // "continue" If condition is true cycle will be skipped
  // if (typeof giorga[i] === "number") break;
  // "break" if codition is true stops loop

  console.log(giorga[i], typeof giorga[i]);
}

for (const item of menu) console.log(item); // for of loop

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
} // Prints index with its element

//////////////////////////////////////////////////////////
// While loops

let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep}`);
  rep++;
}

//////////////////////////////////////////////////////////
// Dom manipulation starter

document.querySelector('.message'); // Selecting html element
document.querySelector('.message').textContent; // Text
document.querySelector('.guess').value; // Other than text
document.querySelector('.check').addEventListener('click', function () {});
document.querySelector('body').style.backgroundColor = 'green';
modal.classList.remove('hidden');
modal.classList.add('hidden');
modal.classList.contains('hidden');
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
section1.classList.toggle('player--active'); // Removes class if its there, adds class if not

containerMovements.insertAdjacentHTML('afterbegin', html); // insert html

containerMovements.innerHTML = ''; // Like text.content but returns html elements

document.getElementsByTagName('button'); // Updates automatically whenever html element is deleted but nodelist doesnt
console.log(document.getElementsByClassName('btn'));
const message = document.createElement('div');

header.prepend(message); // Adds html element at start
header.append(message); // Adds html element at the end can move around elements
header.append(message.cloneNode(true)); // Creates clone so doesnt move around element on page
header.before(message);
header.after(message);
message.remove();
message.parentElement.removeChild(message); // Old way
console.log(getComputedStyle(message).color); // To check real styles diplayed on page
document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

const s1coords = section1.getBoundingClientRect();
window.scrollTo({
  left: s1coords.left + window.pageXOffset,
  top: s1coords.top + window.pageYOffset,
  behavior: 'smooth',
}); // Old way of setting up smooth scroll

section1.scrollIntoView({ behavior: 'smooth' }); // New way of setting up smooth scroll

h1.removeEventListener('mouseenter', alertH1);

document.querySelector('.nav__link').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('LINK', e.target, e.currentTarget); // e.targe selects without bubling
    console.log(e.currentTarget === this); // True for all event listeners

    // Stop propagation
    e.stopPropagation(); // Stops bubbling
  }
  // true  // To set to capturing phase(not that usefull)
);

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
}); // Event delegation attaching event handler to parent element of all nav links

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // Finds child no matter how far down it is
console.log(h1.childNodes);
console.log(h1.children); // Direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // No matter how far up it will find it

h1.closest('h1').style.background = 'var(--gradient-primary)'; // RLY helpfull in event delegation

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});

nav.addEventListener('mouseover', function () {}); // Can bubble up and also  'mouseout'

// STICKY NAV BELOW
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}; // This callback function will be called each time observed element(section1) is intersecting root element at threshold that we defined

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // IntersectionRatio so baisicly this activates if viewport is either leaving 0% or entering 0% of header
  rootMargin: `-${navHeight}px`, // This is height of nav
});
headerObserver.observe(header);

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HMTL parsed and DOM tree built!', e);
}); // Html Loaded ALSO DEPENDS WHERES YOUR SCRIPT TAG IN HTML

window.addEventListener('load', function (e) {
  console.log(`PAGE fully loaded`, e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
}); // Before of leaving page

//////////////////////////////////////////////////////////
// Object Oriented Programming

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
}; // Constructor function

const giorga = new Person('Giorgi', 2005);
console.log(giorga);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(giorga instanceof Person);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

giorga.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(giorga.__proto__);
console.log(giorga.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(giorga));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person)); // Proves that person.prototype is not prototype of person

// .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(giorga.species, matilda.species);

console.log(giorga.hasOwnProperty('firstName'));
console.log(giorga.hasOwnProperty('species'));

console.log(giorga.__proto__.__proto__);

console.log(arr.__proto__); // Shows methods!!!

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists(could be used for validation)
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  } // Validation

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log(`Hey there `);
    console.log(this);
  } // Should be called on person itself DOESNT work on instances
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();
// 1. Classes are NOT hoisted(cant use before declare)
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode

PersonCl.fullName = ''; // Executes setter

const steven = Object.create(PersonProto); // Creates new object which has PersonProto object as prototype

Student.prototype = Object.create(Person.prototype); // Linking prototypes and its chain

const workout = Object.setPrototypeOf(workoutData, Cycling.prototype); // To give back prototype chain after losing by local storage

console.dir(Student.prototype.constructor);

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) private methods
// (there is also the static version)
class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan apporved`);
      return this;
    }
  }

  static helper() {
    console.log(`Helper`);
  }

  // 4) private methods
  #approveLoan(val) {
    return true;
  }
}

//////////////////////////////////////////////////////////
// Number

console.log(+'23');
console.log(Number.parseInt('30px', 10)); // Must start with number to get number
console.log(Number.parseFloat('2.5rem')); // Returns with decimals
console.log(Number.isNaN(20)); // Checks if something is not a number (dont use this)
console.log(Number.isFinite(20)); // Checks if value is number (better way than .isNaN)
console.log(Number.isInteger(23)); // Not that usefull
console.log(Number.MAX_SAFE_INTEGER);
console.log(234233333333333333423434234234234324234234234n);
console.log(huge * BigInt(num));

const options1 = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log(
  `US: `,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

//////////////////////////////////////////////////////////
// Dates

const now1 = new Date();
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
console.log(future.getFullYear()); // never use .getYear
console.log(future.getMonth()); // 0 based
console.log(future.getDate()); // day
console.log(future.getDay()); // day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString()); // Diff
console.log(future.getTime());
console.log(Date.now());

future.setFullYear(2040);

const calcDayPassed = (date1, date2) =>
  Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'short',
};
// const locale = navigator.language;
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(
  currentAccount.locale,
  options
).format(now);

//////////////////////////////////////////////////////////
// Timers

const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza with ${ing1} and ${ing2}`);
  },
  3000,
  ...ingredients
);
console.log(`Waiting...`);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  console.log(`${hour}:${min}:${sec}`);
}, 1000);

clearInterval(timer);

//////////////////////////////////////////////////////////
// Math

secretNumber = Math.trunc(Math.random() * 20) + 1;
Math.abs(movement); // Removes -
console.log(Math.sqrt(25));
console.log(8 ** (1 / 3));
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.min(5, 18, 23, 11, 2));
console.log(Math.PI * Number.parseFloat('10px') ** 2); // PR**2 calculates area of circle
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; // To generate random number from min to max
console.log(Math.round(23.3)); // Rounds to closest (better than trunc)
console.log(Math.ceil(23.3)); // Rounds to up
console.log(Math.floor(23.9)); // Rounds to down
console.log(Math.trunc(23.3)); // Removes decimal part
console.log(+(2.345).toFixed(2)); // Showing decimals
console.log(5 % 2); // Reminder

//////////////////////////////////////////////////////////
// STRINGS

console.log('B737'[0]);
console.log('B737'.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
console.log(airline.slice(4)); // Substring returns new string
console.log(airline.slice(4, 7)); // Excluding 4, including 7
airline.slice(-1); // Gets last one
airline.toLowerCase();
airline.toUpperCase();
lowerEmail.trim(); // Removes whitespace
// trim start, trim end exist -_-
priceGB.replace('#', '$').replace(',', '.');
announcement.replaceAll('door', 'gate');
announcement.replace(/door/g, 'gate');
plane.includes('A320');
plane.startsWith('Air');
plane.endsWith('neo');
console.log('a+very+nice+string'.split('+')); // Creates array of words divided by +
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log(message2.repeat(5));

//////////////////////////////////////////////////////////
// code from mapty

containerWorkouts.addEventListener('submit', e => {
  e.target.classList.contains('form') &&
    e.target.classList.contains('form__original') &&
    this.#newWorkout(e);
});

class mapty {
  #workouts;
  #renderWorkout() {}
  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  #getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts')); // After converting to string and then converting back to normal object they lose prototype chain
    if (!data) return;
    this.#workouts = data.map(workoutData => {
      if (workoutData.type === 'running') {
        // Create a new Running instance with the prototype chain restored
        const workout = Object.setPrototypeOf(workoutData, Running.prototype);
        return workout;
      } else if (workoutData.type === 'cycling') {
        // Create a new Cycling instance with the prototype chain restored
        const workout = Object.setPrototypeOf(workoutData, Cycling.prototype);
        return workout;
      }
    });

    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
    });
  }
}
