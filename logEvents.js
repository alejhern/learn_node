// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   logEvents.js                                       :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/08 10:48:21 by alejhern          #+#    #+#             //
//   Updated: 2025/07/08 10:48:26 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`;
    const logItem = `${dateTime} ${uuid()} ${message}`;
    console.log(logItem);
    try {
        await fsPromises.appendFile(path.join(__dirname, 'log.txt'), logItem + '\n');
    } catch (err) {
        console.log(err);
    }
};

exports.logEvents = logEvents;