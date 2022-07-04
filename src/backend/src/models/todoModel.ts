import { isValidObjectId, Model } from 'mongoose';
import ITodo from '../interfaces/ITodo';


export default class TodoModel {

    protected _modelMongoose: Model<ITodo>;

    constructor(modelMongoose: Model<ITodo>) {
        this._modelMongoose = modelMongoose;
    }

    async create(entity: ITodo): Promise<ITodo> {
        return await this._modelMongoose.create(entity);
    }

    async update(id: string, entity: ITodo): Promise<ITodo | null> {
        if(!isValidObjectId(id)) return null;
        return await this._modelMongoose
        .findOneAndUpdate({ _id: id }, entity, { returnOriginal: false });
    }

    async findAll(): Promise<ITodo[]> {
        return await this._modelMongoose.find();
    }

    async findById(id: string): Promise<ITodo | null> {
        if(!isValidObjectId(id)) return null;
        return await this._modelMongoose.findById(id);
    }
    
    async deleteById(id: string): Promise<void> {
        if(!isValidObjectId(id)) return;
        await this._modelMongoose.deleteOne({ _id: id });
    }

}