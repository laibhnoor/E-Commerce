const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String,
     required: true,
     unique: true,
     match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'] 
    },
   password: { 
    type: String,
     required: true,
     minlength: [6, "password must be atleast 6 characters"] 
   },
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);