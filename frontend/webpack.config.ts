import path from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CompressionWebpackPlugin from 'compression-webpack-plugin'

type enviroment = 'production' | 'development' | 'none'

const arg = process.argv.lastIndexOf('--mode')
const mode: enviroment = arg ? (process.argv[arg + 1] as enviroment) : 'none'

const optimizePlugins = [
    new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BundleAnalyzerPlugin(),
]

const webpackConfig = (): Configuration => ({
    entry: './src/index.tsx',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        path: path.join(__dirname, '.'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [...(mode === 'production' ? optimizePlugins : [])],
    mode: mode || 'development',
    ...(mode === 'production'
        ? {
              optimization: {
                  usedExports: mode === 'production',
              },
          }
        : {}),
})

console.log(`Making bundle in mode ${mode}`)

export default webpackConfig
