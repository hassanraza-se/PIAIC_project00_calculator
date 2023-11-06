var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    if (y === 0) {
        return NaN; // Handle division by zero
    }
    return x / y;
}
function calculator() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'operator',
            message: 'Select an operation:',
            choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
        },
    ]).then(({ operator }) => __awaiter(this, void 0, void 0, function* () {
        console.log(operator);
        const num1 = yield inquirer.prompt([{ type: 'input', name: 'num1', message: 'Enter the first number:' }]);
        const num2 = yield inquirer.prompt([{ type: 'input', name: 'num2', message: 'Enter the second number:' }]);
        // check if inputs are numbers
        const x = parseFloat(num1.num1);
        const y = parseFloat(num2.num2);
        if (isNaN(x) || isNaN(y)) {
            console.log('Please enter valid numbers.');
            return;
        }
        let result = 0;
        switch (operator) {
            case 'Add':
                result = add(x, y);
                break;
            case 'Subtract':
                result = subtract(x, y);
                break;
            case 'Multiply':
                result = multiply(x, y);
                break;
            case 'Divide':
                result = divide(x, y);
                break;
        }
        if (isNaN(result)) {
            console.log('Error: Division by zero');
        }
        else {
            console.log(`Result: ${result}`);
        }
    })).catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        }
        else {
            // Something else went wrong
        }
    });
}
calculator();
