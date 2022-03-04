module.exports = {
	apps: [
		{
			name: "ets-service-development",
			script: "dist/server.js",
			instances: 1,
			autorestart: true,
			watch: true,
			env: {
				NODE_ENV: "development",
				PORT: 4000,
				GATEWAY_URL: "http://dev-api-serivce.etruckingsoft.com",
				CONFIG_USERNAME: "lirctek-dev",
				CONFIG_PASSWORD: "u=7zdMcukBzwHdF-"
			}
		},
		{
			name: 'ets-service-sandbox',
			script: 'dist/server.js',
			instances: 1,
			exec_mode: 'fork',
			env: {
				NODE_ENV: 'sandbox',
				PORT: 4011,
				GATEWAY_URL: "http://dev-api-serivce.etruckingsoft.com",
				CONFIG_USERNAME: "prime-dev",
				CONFIG_PASSWORD: "u=7zdMcukBzwHdF-"
			}
		},
		{
			name: 'ets-service-staging',
			script: 'dist/server.js',
			instances: 1,
			exec_mode: 'fork',
			env: {
				NODE_ENV: 'staging',
				PORT: 4011,
				GATEWAY_URL: "http://staging-api-serivce.etruckingsoft.com",
				CONFIG_USERNAME: "prime-dev",
				CONFIG_PASSWORD: "u=7zdMcukBzwHdF-"
			}
		},
		{
			name: 'ets-service-production',
			script: 'dist/server.js',
			instances: 1,
			exec_mode: 'fork',
			env: {
				NODE_ENV: 'production',
				PORT: 4011,
				GATEWAY_URL: "http://config-server.etruckingsoft.com"
			}
		}
	]
};
