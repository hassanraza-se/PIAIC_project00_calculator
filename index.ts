import inquirer from 'inquirer';
function add(x: number, y: number): number {
    return x + y;
}

function subtract(x: number, y: number): number {
    return x - y;
}

function multiply(x: number, y: number): number {
    return x * y;
}

function divide(x: number, y: number): number {
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
    ]).then(async ({operator}) => {
        const num1 = await inquirer.prompt([{type: 'input', name: 'num1', message: 'Enter the first number:'}]);
        const num2 = await inquirer.prompt([{type: 'input', name: 'num2', message: 'Enter the second number:'}]);

        // check if inputs are numbers
        const x = parseFloat(num1.num1);
        const y = parseFloat(num2.num2);

        if (isNaN(x) || isNaN(y)) {
            console.log('Please enter valid numbers.');
            return;
        }

        let result: number = 0;
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
        } else {
            console.log(`Result: ${result}`);
        }
    }).catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    })
}

calculator();