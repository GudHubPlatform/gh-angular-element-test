import { merge } from 'webpack-merge';
import config from './webpack.common.js';

export default merge(config, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		port: 3000,
		static: {
			directory: './dist'
		},
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		hot: false,
		liveReload: false
	}
});
