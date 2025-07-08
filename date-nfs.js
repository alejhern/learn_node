// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   date-nfs.js                                        :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/08 10:30:32 by alejhern          #+#    #+#             //
//   Updated: 2025/07/08 10:30:35 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const dateFns = require('date-fns');

console.log(dateFns.format(new Date(), 'yyyy-MM-dd'));
console.log(dateFns.format(new Date(), 'HH:mm:ss'));

console.log('--- 1 day ---');
const date2 = new Date();
date2.setDate(date2.getDate() + 1);
console.log(dateFns.format(date2, 'yyyy-MM-dd'));
console.log(dateFns.format(date2, 'HH:mm:ss'));

console.log('--- 1 day ago ---');
const date3 = new Date();
date3.setDate(date3.getDate() - 1);
console.log(dateFns.format(date3, 'yyyy-MM-dd'));
console.log(dateFns.format(date3, 'HH:mm:ss'));
