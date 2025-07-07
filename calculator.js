// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   calculator.js                                      :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelona.co  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 11:57:31 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 12:04:09 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

function sum(x, y) {
	return (x + y);
}

function rest(x, y) {
	return (x - y);
}

function multiply(x, y) {
	return (x * y);
}

function div(x, y) {
	if (y == 0)
		return ("Cannot divide by zero");
	return (x / y);
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Calculator");

rl.question("Enter first number: ", function(first) {
    rl.question("Enter second number: ", function(second) {
        rl.question("Enter operation (+, -, *, /): ", function(op) {
            const x = parseFloat(first);
            const y = parseFloat(second);
            let result;

            switch (op) {
                case '+':
                    result = sum(x, y);
                    break;
                case '-':
                    result = rest(x, y);
                    break;
                case '*':
                    result = multiply(x, y);
                    break;
                case '/':
                    result = div(x, y);
                    break;
                default:
                    result = 'Invalid operation';
            }

            console.log(`Result: ${result}`);
            rl.close();
        });
    });
});
