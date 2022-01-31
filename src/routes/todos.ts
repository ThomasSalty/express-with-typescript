import { Router } from "express";
// Instead of (we could also do it like this):
//   const express = require('express');
//   const Router = express.Router;

import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controllers/todos";

const router = Router(); // this allows us to register a middleware.

router.post("/", createTodo);

router.get("/", getTodos);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
