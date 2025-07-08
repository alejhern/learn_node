// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   indexLogEvents.js                                  :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/08 10:53:26 by alejhern          #+#    #+#             //
//   Updated: 2025/07/08 10:53:31 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const { logEvents } = require('./logEvents');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// instance of MyEmitter
let myEmitter = new MyEmitter();

myEmitter.on('event1', (msg) => logEvents(msg));
myEmitter.on('event2', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('event1', 'Hello Event1!');
}, 1000);

setTimeout(() => {
    myEmitter.emit('event2', 'Hello Event2!');
}, 2000);