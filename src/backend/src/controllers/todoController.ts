import { NextFunction, Request, Response } from 'express';
import TodoService from '../services/todoService';

export default class TodoController {

    private _todoService: TodoService;

    constructor(movieService: TodoService) {
        this._todoService = movieService;
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { task } = req.body;
            const todoCreated = await this._todoService.create({ 
              task
            });
            return res.status(201).json(todoCreated);
        } catch (error) {
            next(error);
        }
    } 

    public async updateById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { task } = req.body;
            const todoUpdated = await this._todoService.updateById(id, { 
              task
            });
            return res.status(200).json(todoUpdated);
        } catch (error) {
            next(error);
        }
    } 

    public async deleteById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const task = await this._todoService.deleteById(id);
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    } 

    public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const tasks = await this._todoService.findAll();
            return res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    } 

    public async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const task = await this._todoService.findById(id);
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    } 

}