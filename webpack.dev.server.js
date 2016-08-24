const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const express = require('express');
const argv = require('minimist')(process.argv.slice(2));
const open = require('open');
const request = require('request');
const constants = require('./constants');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
const debug = argv.d || argv.debug || process.env.DEBUG || false;
const root = argv.r || argv.root || process.env.ROOT || '.';
const app = express();
const port = constants.HOT_RELOAD_PORT;


app.use(bodyParser.json());
app.use(express.static(root));

app.use(webpackDevMiddleware(compiler, {
    headers: {'Access-Control-Allow-Origin': '*'},
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('/favicon.ico', (req, res) => {
    res.send();
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.all('*', function (req, res, next) {

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        var targetURL = req.header('Target-URL');
        if (!targetURL) {
            res.status(500).send({ error: 'Resource Not Found (Web Server) or no Target-URL header in the request (Proxy Server)' });
            return;
        }
        var url = targetURL + req.url;
        if (debug) console.log(req.method + ' ' + url);
        if (debug) console.log('Request body:');
        if (debug) console.log(req.body);
        request({ url: url, method: req.method, json: req.body, headers: {'Authorization': req.header('Authorization')} },
            function (error, response, body) {
                if (error) {
                    console.error('error: ' + response.statusCode)
                }
                if (debug) console.log('Response body:');
                if (debug) console.log(body);
            }).pipe(res);
    }
});

app.listen(port, () => {
    console.log(`Dev listening on: ${port}`);
    open(`http://localhost:${port}`);
});
