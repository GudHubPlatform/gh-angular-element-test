import { merge } from 'webpack-merge';
import config from './webpack.common.js';

export default merge(config, {
	mode: 'development',
	devServer: {
		port: 3000,
		static: {
			directory: './build'
		},
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		hot: false,
		liveReload: false
	}
});
