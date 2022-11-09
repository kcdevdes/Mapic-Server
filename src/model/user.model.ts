import { Schema, model, connect, Types } from "mongoose";
import bcrypt from "bcryptjs";

// interface representing a document
export interface IUser {
	email: string;
	userId: string;
	displayName: string;
	password: string;
	emailValid: boolean;
	avatar?: string;
	followers?: Types.ObjectId[];
	following?: Types.ObjectId[];
	bio?: string;
	posts?: Types.ObjectId[];
	collections?: Types.ObjectId[];
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
	avatar: { type: String, default: "" },
	emailValid: { type: Boolean, default: false },
	followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
	following: [{ type: Schema.Types.ObjectId, ref: "User" }],
	bio: { type: String },
	posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	collections: [{ type: Schema.Types.ObjectId, ref: "Post" }],
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
