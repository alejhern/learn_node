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
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { logEvents } = require('./logEvents');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

// Instancia del emisor
const myEmitter = new MyEmitter();
myEmitter.on('log', (msg) => logEvents(msg));

const hostname = '127.0.0.1';
const port = 3000;

// Función para servir archivos de forma asíncrona
const serverFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath);
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.end('500 Internal Server Error');
        myEmitter.emit('log', `500 Error: ${filePath} -> ${err.message}`);
    }
};

// Crear el servidor
http.createServer(async (req, res) => {
    const safeUrl = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    const extension = path.extname(safeUrl);

    let contentType;
    switch (extension) {
        case '.html': contentType = 'text/html'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg':
        case '.jpeg': contentType = 'image/jpeg'; break;
        case '.ico': contentType = 'image/x-icon'; break;
        default: contentType = 'text/html';
    }

    let filePath;
    if (contentType === 'text/html') {
        if (safeUrl === '/' || safeUrl === '') {
            filePath = path.join(__dirname, 'index.html');
        } else if (safeUrl.endsWith('/')) {
            filePath = path.join(__dirname, safeUrl, 'index.html');
        } else {
            filePath = path.join(__dirname, safeUrl);
        }

        if (!extension && safeUrl.endsWith('/')) {
            filePath += '.html';
        }
    } else {
        filePath = path.join(__dirname, safeUrl);
    }

    try {
        await fsPromises.access(filePath);
        myEmitter.emit('log', `200 OK: ${filePath}`);
        serverFile(filePath, contentType, res);
    } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        myEmitter.emit('log', `404 Not Found: ${filePath}`);
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`.green);
});
