import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    adminPanelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminPanel",
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    CNIC: {
        type: Number,
        unique: true,
        required: [true, "CNIC is required"]
    },
    // role: {
    //     type: String,
    //     enum: ['user', 'admin'], 
    //     default: 'user',
    //     required: [true, "Role is required"]
    // }
},
    {
        timestamps: true,
    })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export default mongoose.model("User", userSchema)


