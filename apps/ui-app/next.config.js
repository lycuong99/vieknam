//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		// Set this to true if you would like to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Ensure that all imports of 'yjs' resolve to the same instance
			config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
		}
		return config;
	}
};

const plugins = [
	// Add more Next.js plugins to this list if needed.
	withNx
];

module.exports = composePlugins(...plugins)(nextConfig);
