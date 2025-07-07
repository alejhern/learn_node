// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   dir.js                                             :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 15:43:31 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 15:43:34 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const fs = require('fs');

fs.readdir('.', function (err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
});

if (!fs.existsSync('test')) {
    fs.mkdir('test', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Directory created");
        }
    });
}

if (fs.existsSync('test')) {
    fs.rmdir('test', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Directory deleted");
        }
    });
}