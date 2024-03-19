const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/our_insurance',
        createProxyMiddleware({
            target: 'http://localhost:40045',
            changeOrigin: true,
        })
    );
};