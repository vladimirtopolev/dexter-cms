import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
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
        this.app.use( '/assets', express.static(path.resolve(__dirname, '../../build/web/assets')));


        // parse application/json and look for raw text
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.json({type: 'application/json'}));
        this.app.use(cors());

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

        // ADMIN panel without SSR
        this.app.use('*', (req, res) => {
            fs.createReadStream(path.resolve(__dirname, '../../build/web/index.html'))
                .pipe(res);
        });


        /*
        this.app.use('*', (req, res) => {
            res.send('sdfsdf')
        });*/


        return this.app;
    }
}
