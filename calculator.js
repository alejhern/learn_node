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

const math = require('./math.js');

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
                    result = math.sum(x, y);
                    break;
                case '-':
                    result = math.rest(x, y);
                    break;
                case '*':
                    result = math.multiply(x, y);
                    break;
                case '/':
                    result = math.div(x, y);
                    break;
                default:
                    result = 'Invalid operation';
            }

            console.log(`Result: ${result}`);
            rl.close();
        });
    });
});
