// Instead of setting up the parameters every time like this can be cumbersome.
/* import { Request, Response, NextFunction } from "express";
   export const createTodo = (req: Request, res: Response, next: NextFunction) => { }; */

// We could just tell express to use a RequestHandler type:
import { RequestHandler } from "express";

import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;

    // We're creating a model for a todo object in the models folder.
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    // 201 - Request was successful and the resource was created.
    res.status(201).json({
        message: "Created the todo.",
        createdTodo: newTodo,
    });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todos: TODOS });
};

// To get better TS support for "req.params" we can utilize the fact
//  that RequestHandler is a generic type.
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as { text: string }).text;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        // This will trigger our error handling middleware in app.ts.
        throw new Error("Could not find todo!");
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        // This will trigger our error handling middleware in app.ts.
        throw new Error("Could not find todo!");
    }

    TODOS.splice(todoIndex, 1);

    res.json({ message: "Todo deleted!" });
};
