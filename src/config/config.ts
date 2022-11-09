import dotenv from "dotenv";

dotenv.config();

const config = {
	port: process.env.PORT,
	version: process.env.VERSION,
	env: process.env.NODE_ENV || "development",
	mongodb: {
		adminSource: process.env.MONGODB_ADMINSOURCE,
		url: process.env.MONGODB_URL,
		username: process.env.MONGODB_USERNAME,
		password: process.env.MONGODB_PASSWORD,
	},
	redis: {
		url: process.env.REDIS_URL,
		password: process.env.REDIS_PASSWORD,
	},
};

export default config;
