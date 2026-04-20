// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   http_express.js                                    :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alejhern <alejhern@student.42barcelona.co  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/07 13:20:43 by alejhern          #+#    #+#             //
//   Updated: 2025/07/07 13:20:45 by alejhern         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const express = require("express");
const colors = require("colors");

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   if (req.method !== "POST") return next();

//   const contentType = req.headers["content-type"] || "";
//   if (!contentType.includes("application/json")) return next();

//   let body = "";

//   req.on("data", (chunk) => {
//     body += chunk;

//     // límite de seguridad (~1MB)
//     if (body.length > 1e6) {
//       req.socket.destroy();
//     }
//   });

//   req.on("end", () => {
//     try {
//       req.body = JSON.parse(body);
//       next();
//     } catch {
//       res.status(400).send("Invalid JSON");
//     }
//   });

//   req.on("error", () => {
//     res.status(500).send("Error reading request");
//   });
// });

app.get("/", function (req, res) {
  res.header("Content-Type", "text/html");
  res.send("<h1>Hello !</h1>");
});

app.get("/about", function (req, res) {
  res.header("Content-Type", "text/html");
  res.send("<h1>About us</h1>");
});

app.get("/contact", function (req, res) {
  res.header("Content-Type", "text/html");
  res.send("<h1>Contact us</h1>");
});

app.get("/api/data", function (req, res) {
  res.header("Content-Type", "application/json");
  res.json({ name: "John", age: 30, city: "New York" });
});

app.post("/api/data", function (req, res) {
  res.header("Content-Type", "application/json");
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!".green);
});
