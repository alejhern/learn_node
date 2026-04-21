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

import { addDays, format, subDays } from "date-fns";

const now = new Date();

console.log(format(now, "yyyy-MM-dd"));
console.log(format(now, "HH:mm:ss"));

console.log("--- 1 day ---");
const tomorrow = addDays(now, 1);
console.log(format(tomorrow, "yyyy-MM-dd"));
console.log(format(tomorrow, "HH:mm:ss"));

console.log("--- 1 day ago ---");
const yesterday = subDays(now, 1);
console.log(format(yesterday, "yyyy-MM-dd"));
console.log(format(yesterday, "HH:mm:ss"));
