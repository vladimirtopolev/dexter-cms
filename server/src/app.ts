import * as express from 'express';
import * as mongoose from 'mongoose';
import {Application, Router} from 'express';
import * as bodyParser from 'body-parser';
import * as formData from 'express-form-data';
import * as cors from 'cors';

export default class App {
    app: Application;
    routes: ({ router: Router, modulePath: string })[] = [];

    runServer(config: any) {
        const PORT = process.env.PORT || 5000;
        console.log(PORT);
        return mongoose.connect(config.dbConfig.host, {dbName: config.dbConfig.dbName})
            .then(() => {
                console.log(`Connection to DB is successful: ${config.dbConfig.host}`);
                this.getApp().listen(PORT, () => console.log(`Listening on ${PORT}`));
            })
            .catch((e) => console.log(e))
    }

    addModuleRouter(modulePath: string, router: Router) {
        this.routes.push({modulePath, router});
        return this;
    }

    initDefaultMiddlewares() {
        // parse application/json and look for raw text
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.json({type: 'application/json'}));
        this.app.use(cors())

        this.app.use(formData.parse());
    }

    initRoutes() {
        this.routes.forEach(({router, modulePath}) => {
            this.app.use(modulePath, router);
        });
    }

    getApp(): Application {
        this.app = express();
        this.initDefaultMiddlewares();
        this.initRoutes();

        return this.app;
    }
}
