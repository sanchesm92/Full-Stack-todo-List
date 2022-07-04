
import { Router } from 'express';
import TodoController from '../controllers/todoController';
import ValidateTask from '../middlewares/taskMiddleware';

import TodoModel from '../models/todoModel';
import { todoMongoseModel } from '../schemas/todoSchema';
import TodoService from '../services/todoService';

const todoRouter = Router();

const todoModel = new TodoModel(todoMongoseModel);
const todoService = new TodoService(todoModel);
const todoController = new TodoController(todoService);

todoRouter.get('/todo', (req, res, next) => todoController.findAll(req, res, next));
todoRouter.get('/todo/:id', (req, res, next) => todoController.findById(req, res, next));
todoRouter.post('/todo', (req,res,next) => ValidateTask.validate(req, res, next), (req, res, next) => todoController.create(req, res, next));
todoRouter.put('/todo/:id', (req,res,next) => ValidateTask.validate(req, res, next), (req, res, next) => todoController.updateById(req, res, next));
todoRouter.delete('/todo/:id', (req, res, next) => todoController.deleteById(req, res, next));

export default todoRouter;