import dotenv from 'dotenv'
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

export default {
	/**
	 * Your favorite port
	 */
	port: process.env.PORT,

	/**
	 * That long string from mlab
	 */
	databaseURL: process.env.MONGODB_URI || '',

	/**
	 * Your secret sauce
	 */
	SECRET_KEY: process.env.SECRET_KEY || '',

	/**
	 * Used by winston logger
	 */
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},
	/**
	 * API configs
	 */
	api: {
		prefix: '/api',
	},
};