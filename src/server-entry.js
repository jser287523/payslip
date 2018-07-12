import babelPolyfill from "babel-polyfill";

import path from 'path';
import express from 'express';
import compression from 'compression';
import logger from 'morgan';
import swig  from 'swig';

try {
    var app = express();
    var server = require('http').createServer(app);

    app.set('port', process.env.PORT || 8000);
    app.use(compression());
    app.use(logger('dev'));

    app.use(express.static('static'));

    app.get('/', function (req, res, next) {
        let page = swig.renderFile('views/index.html', {});
        res.status(200).send(page);
    });

    //error log
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({ message: err.message });
    });

    //Start Server
    server.listen(app.get('port'), function () {
        var open = require("open");
        open("http://localhost:8000");
    });

    //Hot updates
    if (__DEVELOPMENT__) {
        if (module.hot) {
            console.log("[HMR] Waiting for server-side updates");

            module.hot.addStatusHandler((status) => {
                if (status === "abort") {
                    setTimeout(() => process.exit(0), 0);
                }
            });
        }
    }
}
catch (error) {
    console.error('@error.stack || error');
    console.error(error.stack || error);
}
