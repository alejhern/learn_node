// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   dir.js                                             :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelon      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 15:43:31 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 15:43:34 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const fs = require("node:fs");
const path = require("node:path");

fs.readdir(".", function (err, files) {
  if (err) {
    console.log(err);
  } else {
    console.log(files);
  }
});

if (!fs.existsSync("files")) {
  fs.mkdir("files", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Directory created");
    }
  });
}

if (fs.existsSync("files")) {
  const files = fs.readdirSync("files");
  files.forEach((file) => {
    const baseName = path.basename(file);
    const extension = path.extname(file);
    const filePath = path.join(__dirname, "files", file);
    console.log(
      `File: ${baseName}, Extension: ${extension}, Path: ${filePath}`,
    );
  });

  //   fs.rmdir("test", function (err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Directory deleted");
  //     }
  //   });
}
