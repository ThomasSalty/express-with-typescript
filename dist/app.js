"use strict";
// We can execute this code either in the browser or in Node.js.
/* console.log("Something..."); */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ❯ tsc app.ts
// ❯ node app.js
// Something...
// But when I delete the app.js and try run the .ts file it also works:
// ❯ rm app.js
// ❯ node app.ts
// Something...
// Node is still not able to execute TS, it just ignores the
//  file extension and whatever it finds it executes.
// But as soon as we use something TS specific like this:
/* let age: number;

age = 30;

console.log(age); */
// We get a SyntaxError:
/* ❯ node app.ts
let age: number;
       ^

SyntaxError: Unexpected token ':' */
// So it only works in Node if you don't use any TS specific code
//  otherwise you always have to transpile it to JS.
// But there is a tool, called "TS-Node" which combines TS with Node.js:
// https://github.com/TypeStrong/ts-node
// It just compiles TS to JS and executes the compiled code behind the scenes.
// Because of that it adds an extra overhead everytime there is a change in the TS file,
//  so it is only suitable for development. (We're not going to use it.)
// Setting up a project for both Node and TS:
// ------------------------------------------
// npm init -y
// tsc --init
// Settings for tsconfig.json:
//  target: es2018
//  module: commonjs
//  moduleResolution: node
//  outDir: ./dist
//  rootDir: ./src   // also create that folder and move app.ts into it.
// Let's also install some dependencies:
// npm install --save express body-parser
// Also install nodemon to watch for changes and automatically restart the server:
// npm install --save-dev nodemon
// Let's write some express code.
// This would work in normal JS but not in TS.
/* const express = require("express");

const app = express();

app.listen(3000); */
// The error message:
/* Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`. */
// So let's install it:
// npm install --save-dev @types/node
// With that, the error is gone.
// But there's still no autocompletion for "app." for example
//  and if I hover over it TS doesn't know what's in there:
// "const app: any"
// So we have to install more types:
// npm install --save-dev @types/express
// After installing there's still no change because we're using require
//  instead of ES6 imports.
// As soon as we change that we get type support:
/* import express from "express"; // const express = require("express");

const app = express();

app.listen(3000); */
// Now app's type if Express:
// "const app: Express"
// But as soon as we transpile the TS file, it changes back to
//  commonjs syntax in the JS file.
// Let's transpile it:
// "tsc -w"  // creates a dist folder with app.js in it.
// Also start nodemon in package.json:
// "start": "nodemon dist/app.js"
// Everything's working now but our server does nothing, let's change that.
// We're gonna create a simple Todo App and set up a very simple REST API,
//  let's create a routes folder for that in the src folder, and a todos.ts file in it.
// Let's connect that file with this file:
const express_1 = __importDefault(require("express")); // const express = require("express");
const todos_1 = __importDefault(require("./routes/todos"));
// To make sure that the body of our request exists:
const body_parser_1 = require("body-parser"); // we're importing the "json" method.
const app = express_1.default();
// We can register and execute "json" method as a middleware.
// It will parse the bodies of all incoming requests and extract
//  any JSON data it finds in there to then populates the body key
//  on the req object (req.body in controllers) with that parsed
//  JSON data.
app.use(body_parser_1.json());
app.use("/todos", todos_1.default);
// app.use((req, res, next) => {}); // A regular middleware function.
// An error handling middleware function.
app.use((err, req, res, next) => {
    // This will be fired by Express if any other middleware function
    //  prior to this will have any error.
    res.status(500).json({ message: err.message });
});
app.listen(3000);
// Let's also add a controllers to add some logic to our routes, and
//  a todos.ts file in it.
// We can now open "http://localhost:3000/" in the browser.
// "Cannot GET /"
// We have to send a POST request but in the browser we can't do that,
//  so we're using Postman: POST - http://localhost:3000/todos/
// This is the response body with 201 - Created code:
/* {
    "message": "Created the todo.",
    "createdTodo": {
        "id": "0.1445821458895007"
    }
} */
// Let's also give a "text" property for our Todo in the
//  request Body - JSON format:
/* {
    "text": "Finish the course!"
} */
// Response body:
/* {
    "message": "Created the todo.",
    "createdTodo": {
        "id": "0.3955777642581313",
        "text": "Finish the course!"
    }
} */
// In the controller we create another function "getTodos"
//  and we point to that in the get route.
// Now we get this in the browser:
/* {
    "todos": [ ]
} */
// We get an empty array because when the server restarts it clears
//  the todos array, since it was only in memory and not in a db.
// So let's do another POST request to the same URL without restarting
//  the server and then GET the same URL either in Postman or in the browser:
/* {
    "todos": [
        {
            "id": "0.07083489335606052",
            "text": "Finish the course!"
        }
    ]
} */
// Let's also create a patch route function in controller: updateTodo.
// Here we have a dynamic "id" segment: /* router.patch("/:id"); */
// And we can get it like this: "const todoId = req.params.id;"
// Let's set the updateTodo function to the patch method.
// And it Postman let's send a new POST request and a
//  PATCH - http://localhost:3000/todos/
// We get this:
/* {
    "message": "Created the todo.",
    "createdTodo": {
        "id": "0.1287727514547765",
        "text": "Finish the course!"
    }
} */
// So now we can use that id for the PATCH request URL:
// http://localhost:3000/todos/0.1287727514547765
// The Body (raw - JSON) is:
/* {
    "text": "Finish the course in one month!"
} */
// And after sending it this is the result:
/* {
    "message": "Updated!",
    "updatedTodo": {
        "id": "0.1287727514547765",
        "text": "Finish the course in one month!"
    }
} */
// And it I get all todos, we only 1 with the changed text:
/* {
    "todos": [
        {
            "id": "0.1287727514547765",
            "text": "Finish the course in one month!"
        }
    ]
} */
// If I send the same PATCH request but delete the last number:
// http://localhost:3000/todos/0.128772751454776
// I get the error message:
/* {
    "message": "Could not find todo!"
} */
// Also create the deleteTodo function and add it to the DELETE route.
// Send a new POST
/* {
    "message": "Created the todo.",
    "createdTodo": {
        "id": "0.9500734698490756",
        "text": "Finish the course!"
    }
} */
// Let's copy the id and send a DELETE - http://localhost:3000/todos/0.9500734698490756
/* {
    "message": "Todo deleted!"
} */
// If we send the same DELETE again:
/* {
    "message": "Could not find todo!"
} */
