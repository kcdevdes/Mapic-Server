import dotenv from "dotenv";

class EnvManager {
	public static setDotenvConfig() {
		if (process.env.NODE_ENV === "production") {
			dotenv.config({ path: `../config/.env` });
		} else {
			dotenv.config({ path: `../config/.env.development` });
		}
	}

	public static isDevMode(): boolean {
		this.setDotenvConfig();
		const currentMode =
			process.env.NODE_ENV === "production"
				? NodeEnvironment.PRODUCTION
				: NodeEnvironment.DEVELOPMENT;
		if (currentMode === NodeEnvironment.DEVELOPMENT) return true;
		return false;
	}

	public static getVersion(): string {
		this.setDotenvConfig();
		const currentVersion: string = process.env.VERSION
			? process.env.VERSION
			: "0.0.1";
		return currentVersion;
	}

	public static getTestAccount(): any {
		this.setDotenvConfig();
		const email = process.env.TEST_EMAIL || "test_email@example.com";
		const password = process.env.TEST_PASSWORD || "test_pw";
		const userId = process.env.TEST_USERID || "test_userid";
		const displayName = process.env.TEST_DISPLAYNAME || "test displayname";
		return {
			email: email,
			password: password,
			userId: userId,
			displayName: displayName,
		};
	}
}

enum NodeEnvironment {
	PRODUCTION,
	DEVELOPMENT,
}

export default EnvManager;
