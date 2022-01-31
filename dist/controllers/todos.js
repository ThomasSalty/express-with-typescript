"use strict";
// Instead of setting up the parameters every time like this can be cumbersome.
/* import { Request, Response, NextFunction } from "express";
   export const createTodo = (req: Request, res: Response, next: NextFunction) => { }; */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
exports.createTodo = (req, res, next) => {
    const text = req.body.text;
    // We're creating a model for a todo object in the models folder.
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    // 201 - Request was successful and the resource was created.
    res.status(201).json({
        message: "Created the todo.",
        createdTodo: newTodo,
    });
};
exports.getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
// To get better TS support for "req.params" we can utilize the fact
//  that RequestHandler is a generic type.
exports.updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        // This will trigger our error handling middleware in app.ts.
        throw new Error("Could not find todo!");
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};
exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        // This will trigger our error handling middleware in app.ts.
        throw new Error("Could not find todo!");
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo deleted!" });
};
