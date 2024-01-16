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
                    if (Number.isNaN(parsedValue)) {
                        return 'Please enter a valid number.';
                    }
                    return true;
                },
            },
            {
                type: 'input',
                name: 'num2',
                message: 'Enter the second number:',
                validate(input) {
                    const parsedValue = parseFloat(input);
                    if (Number.isNaN(parsedValue)) {
                        return 'Please enter a valid number.';
                    }
                    return true;
                },
            }
        ]);
        const { num1, num2 } = numbers;
        const x = parseFloat(num1);
        const y = parseFloat(num2);
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
        inquirer.prompt([
            {
                type: "confirm",
                name: "retry",
                message: "Want to try again?"
            }
        ]).then(({ retry }) => {
            if (retry) {
                calculator();
            }
            else {
                console.log('Thank you for using the calculator. \nCreated by: Hassan Raza (https://hassanraza.net)');
            }
        });
    }).catch(error => {
        console.error(error);
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        }
        else {
            // Something else went wrong
        }
    });
}
calculator();
