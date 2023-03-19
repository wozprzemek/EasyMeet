const path = require('path')

module.exports = {
    webpack: function (config, env) {
        // changes to the compilation here - this is the normal function used in react-app-rewired.
        return config;
    },
    devServer: function (configFunction) {
        return function (proxy, allowedHost) {
            // Create the default config by calling configFunction with the proxy/allowedHost parameters
            const config = configFunction(proxy, allowedHost);
            // Change the dev server's config here...
            // Then return your modified config.
            config.port = 3000;
            config.host = "0.0.0.0";
            config.watchOptions = {
                poll: 1000, // enable polling since fsevents are not supported in docker
                ignored: [
                    path.resolve(__dirname, 'build'),
                    path.resolve(__dirname, 'node_modules')
                ]
            }
            return config;
        }
    }
};