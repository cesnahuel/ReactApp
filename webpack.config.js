//Estos dos pugins los hizo de forma automatica cuando configuro la seccion 'plugins'
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//necesito la libreria 'path' para resolver la seccion 'output'
const path = require('path');

/*---------------------------------------------------------------------------
Archivo de configuracion de WebPack, defino las 5 reglas para el sitio
---------------------------------------------------------------------------*/
module.exports = {
    //Entry: es el punto de entrada de la aplicacion 
    entry: './src/index.js',    
    output: {
        //Output: es el punto de salida que tendra webpack, alli tendra todas las definiciones a utlizar 
        //(se utiliza 'hash' para diferenciar las versiones del empaquetado que creamos)
        filename: 'bundle.[hash].js',
        //donde estara el archivo de salida (tiene expresion regular para adaptarlo a windows o mac o linux)
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    //module: configuro los loaders 
    module: {
        rules: [
            {
                //busque archivos js o jsx
                test: /\.(js|jsx)$/, 
                //que use el babel loader para hacer este trabajo
                use: 'babel-loader',
                //excluyo los archivos de node_modules por que ya estan compilados
                exclude: /node_modules/,
                //Con resolve le indicamos a WebPack que el loader interprete las dos extensiones mencionadas(es para no poner la extension
                //cuando hacemos import en los componentes)
                resolve: {
                    extensions: ['.js', '.jsx']
                }
            },
            {
                //busque archivos css
                test: /\.(css)$/,
                //que use el style-loader y css-loader para hacer este trabajo
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    //Creo las instanacias de CleanWebPack (limpia los archivos bundle.js creados en dist) y el htmlWebPack (integra el html al bundle.js 
    //creado en la carpeta dist)
    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
            template: './public/index.html' 
        })
    ]

}