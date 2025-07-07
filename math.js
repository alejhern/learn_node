// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   math.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelona.co  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 12:18:55 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 12:18:58 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const Math = {};

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

Math.sum = sum;
Math.rest = rest;
Math.multiply = multiply;
Math.div = div;

module.exports = Math;