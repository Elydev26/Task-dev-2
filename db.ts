import mongoose from 'mongoose'
import { DB } from './src/config/config';


const connect = async () => {
    mongoose
        .connect(DB as string, {
            dbName: "auth_db"
        }

        )
        .then((response) => {
            console.log("Database connected successfuly");
        })
        .catch((err: any) => {
            console.log(`An error occured while connecting to DB, ${err}`)
            console.log(err);
        });
}

export default connect