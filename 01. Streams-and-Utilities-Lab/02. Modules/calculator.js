export function subtract(a, b) {
    return a - b;
}

const calculator = {
    sum(a, b) {
        return a + b;
    },
    multiply(a, b) {
        return a * b;
    },
    subtract,
}

// commonJS export statement
// module.exports = calculator;

// ESM module system default export 
export default calculator;
