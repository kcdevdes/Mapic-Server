import { Schema, model, connect, Types } from "mongoose";
import bcrypt from "bcryptjs";

// interface representing a document in MONGODB
export interface IUser {
	email: string;
	userId: string;
	displayName: string;
	password: string;
	avatar?: string;
	followers: Types.ObjectId[];
	following: Types.ObjectId[];
	bio: string;
	website: string;
	posts: Types.ObjectId[];
	collections: Types.ObjectId[];
	createdAt: Date;
}

export const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		unique: true,
	},
	userId: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
	},
	displayName: { type: String, required: true },
	password: { type: String, required: true, minlength: 6 },
	avatar: { type: String, required: true, default: "" },
	followers: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
	following: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
	bio: { type: String, required: true },
	website: { type: String, required: true },
	posts: [{ type: Schema.Types.ObjectId, ref: "Post", required: true }],
	collections: [{ type: Schema.Types.ObjectId, ref: "Post", required: true }],
	createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.checkPassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
