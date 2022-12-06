const path = require('path')

module.exports = {
    devtool: "source-map",
    mode: "development",
    entry: "./frontend/index.js",
    output: {
        path: path.resolve(__dirname, "public", "assets", "js"),
        filename: "bundle.js"
    },
    resolve: {
        modules: [path.resolve(__dirname, "../Kimbo-dictionary","node_modules"), 'node_modules'],
      },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },

}