// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   os.js                                              :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 12:33:28 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 12:33:37 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const os = require('os');

console.log("homedir: " + os.homedir());
console.log("tmpDir: " + os.tmpdir());
console.log("hostname: " + os.hostname());
console.log("type: " + os.type());
console.log("platform: " + os.platform());
console.log("arch: " + os.arch());
console.log("release: " + os.release());
console.log("uptime: " + os.uptime());
console.log("loadavg: " + os.loadavg());
console.log("totalmem: " + os.totalmem());
console.log("freemem: " + os.freemem());