#!/usr/bin/env node
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
    ]).then(async ({ operator }) => {
        const numbers = await inquirer.prompt([
            {
                type: 'input',
                name: 'num1',
                message: 'Enter the first number:',
                validate(input) {
                    const parsedValue = parseFloat(input);
                    return !isNaN(parsedValue) && parsedValue > 0;
                }
            },
            {
                type: 'input',
                name: 'num2',
                message: 'Enter the second number:',
                validate(input) {
                    const parsedValue = parseFloat(input);
                    return !isNaN(parsedValue) && parsedValue > 0;
                }
            }
        ]);
        const { num1, num2 } = numbers;
        const x = num1;
        const y = num2;
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
    }).catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        }
        else {
            // Something else went wrong
        }
    });
}
calculator();
