import { model, Schema } from 'mongoose';
import ITodo from '../interfaces/ITodo';

const todoSchema = new Schema<ITodo>({
    task: {
        type: String,
        required: true
    },
});

export const todoMongoseModel = model<ITodo>('todo', todoSchema);