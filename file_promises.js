// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   file_promises.js                                   :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 15:30:43 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 15:30:47 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const fs = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const filePath = path.join(__dirname, 'hello.txt');
        await fs.writeFile(filePath, 'Hello World!', 'utf8');
        console.log('File written');
        await fs.appendFile(filePath, "\nGoodbye World!", 'utf8');
        console.log('File appended');
        await fs.rename(filePath, path.join(__dirname, 'goodbye.txt'));
        console.log('File renamed');
        const data = await fs.readFile(path.join(__dirname, 'goodbye.txt'), 'utf8');
        console.log(data);
        await fs.unlink(path.join(__dirname, 'goodbye.txt'));
        console.log('File deleted');
    } catch (err) {
        console.log(err);
    }
};

fileOps();