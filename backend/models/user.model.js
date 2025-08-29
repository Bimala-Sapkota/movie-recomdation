import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Use 'new mongoose.Schema'
  username: { type: String, required: true }, // Corrected 'require' to 'required'
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Check if the model is already created to avoid recompilation
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
