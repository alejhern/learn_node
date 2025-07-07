// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   stream.js                                          :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 15:38:06 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 15:38:11 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const fs = require('fs');

const stream = fs.createReadStream('loremipsum.txt');

const ws = fs.createWriteStream('loremipsum2.txt');

stream.pipe(ws);