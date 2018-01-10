import { join } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist',),
    libraryTarget: 'umd',
    library: 'spotify',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loaders: 'babel-loader', include},
    ]
  }
}
