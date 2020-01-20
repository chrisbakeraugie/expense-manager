var path = require('path');
var webpack = require('webpack');

module.exports = {
    "mode": "development",
    "entry": "./client/index.js",
    "output": {
        "path": __dirname+'/static',
        "filename": "bundle.js"
    },
    "module": {
        "rules": [
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "env",
                            "react"
                        ]
                    }
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    }
}