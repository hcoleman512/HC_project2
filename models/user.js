// The Goal Schema
const Image = new Schema({
    url: String,
  })
  
  // The User Schema
  const UserSchema = new Schema(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      // The goals property defined as an array of objects that match the Goal schema
      images: [Image],
    }, { timestamps: true }
  )
  
  // The User Model
  const User = model("User", UserSchema)
  
  // Export the User Model
  module.exports = User