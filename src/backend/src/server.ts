import cors from 'cors';
import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import todoRouter from './routes/todoRouter';

export default class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.config()
    }

    private config() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(todoRouter);
        this.express.use(errorMiddleware.validate)
    }

    public start(port: number | string = 3001) {
        this.express.listen(port, () => console.log(`server running at: http://localhost:${port}`));
    }
}