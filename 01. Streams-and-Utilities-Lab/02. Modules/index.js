// CommonJS import statement
// const calculator = require('./calculator');

// ESM module system default import
import calc from './calculator.js';
import fs from 'fs';
import calculator from 'calculator';

// import { subtract } from './calculator.js'

console.log('Hello from Node.js!');

const sum = calc.sum(2, 3);

console.log(sum);

console.log(calc.subtract(5, 1));

// console.log(subtract(5, 2));

// Using core module
console.log(fs.readdirSync('./'))

// Using third party module
const f = calculator.func('f(x) = x*10 - 20');
const result = f(10);
console.log(result);
