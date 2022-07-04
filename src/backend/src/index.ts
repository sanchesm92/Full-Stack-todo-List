import MongoConnection from "./models/connection";
import App from "./server";

async function main() {
    try {
        const { SERVER_PORT, DB_HOST } = process.env;
        const app = new App();
        await MongoConnection.connect(`mongodb://${DB_HOST}:/todolist`);
        app.start(SERVER_PORT);
        
    } catch (error) {
        console.log(error);
        process.exit(1); 
    } 
}

main();