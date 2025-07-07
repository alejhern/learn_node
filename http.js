// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   http.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelona.co  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 12:53:49 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 12:53:52 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const http = require('http');
const colors = require('colors');

const hostname = '127.0.0.1';
const port = 3000;

http.createServer(function(req, res) {
    res.writeHead(200);
    res.write("<h1>Hello World!</h1>");
    res.end("");
}).listen(port, hostname, function() {
    const msg = "Server running at http://" + hostname + ":" + port + "/";
    console.log(msg.green);
});