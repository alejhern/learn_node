// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   filesystem.js                                      :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 12:40:11 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 12:40:16 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const fs = require('fs');

fs.writeFile('hello.txt', 'Hello World!', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("File written");
    }
});

fs.readFile('hello.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});