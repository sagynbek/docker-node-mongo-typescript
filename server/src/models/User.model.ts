import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Mobile ID is required!',
  },
}, {
  timestamps: true,
})

const User = mongoose.model("User", userSchema)

export default User;