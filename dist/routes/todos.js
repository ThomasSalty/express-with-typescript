"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Instead of (we could also do it like this):
//   const express = require('express');
//   const Router = express.Router;
const todos_1 = require("../controllers/todos");
const router = express_1.Router(); // this allows us to register a middleware.
router.post("/", todos_1.createTodo);
router.get("/", todos_1.getTodos);
router.patch("/:id", todos_1.updateTodo);
router.delete("/:id", todos_1.deleteTodo);
exports.default = router;
