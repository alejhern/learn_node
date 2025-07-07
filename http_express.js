// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   http_express.js                                    :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelona.co  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 13:20:43 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 13:20:45 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const express = require('express');
const colors = require('colors');

const app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!'.green);
});