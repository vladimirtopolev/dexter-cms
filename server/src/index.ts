import App from './app';
import * as devConfig from './config/default.json';
import * as prodConfig from './config/prod.json';

import pageTreeFactory from './modules/page-tree';
import cloudinaryFactory from './modules/cloudinary';

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

new App()
    .addModuleRouter('/api/pages', pageTreeFactory())
    .addModuleRouter('/api/cloudinary', cloudinaryFactory(config.cloudinary))
    .runServer(config);
