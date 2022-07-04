import ITodo from "../interfaces/ITodo";
import todoModel from "../models/todoModel";


export default class TodoService {

    private _todoModel: todoModel;

    constructor(todomodel: todoModel) {
        this._todoModel = todomodel;
    }
    
    async create(todo: ITodo): Promise<ITodo> {
        return await this._todoModel.create(todo);
    }

    async findAll(): Promise<ITodo[]> {
        return await this._todoModel.findAll();
    }

    async findById(id: string): Promise<ITodo | null> {
        const todo = await this._todoModel.findById(id);
        if(!todo) return null;
        return todo;
    }

    async updateById(id: string, todo: ITodo): Promise<ITodo | null> {
        const todoUpdated = await this._todoModel.update(id, todo);
        if(!todoUpdated) return null;
        return todoUpdated;
    }

    async deleteById(id: string): Promise<void> {
        const task = await this._todoModel.findById(id);
        if(!task) return;
        await this._todoModel.deleteById(id);
    }
}