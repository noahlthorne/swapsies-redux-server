import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import config from "config";
import { SwapDocument } from "./swap.model";

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    swapRequests: SwapDocument["_id"][];
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        swapRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UserDocument;

    //only hash the password if it has been modified or is new
    if (!user.isModified("password")) return next();

    // hash the password
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    // Replace raw password with hashed password
    user.password = hash;

    return next();
});

// Compare password when logging in
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
