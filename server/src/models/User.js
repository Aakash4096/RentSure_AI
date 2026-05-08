const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false, // Never return password in queries by default
  },
  role: {
    type: String,
    enum: ["student", "landlord", "admin"],
    default: "student",
  },
  preferences: {
    maxBudget: {
      type: Number,
      min: [0, "Budget cannot be negative"],
    },
    desiredAmenities: [String],
    maxDistanceFromInstitute: {
      type: Number,
      default: 5, // kilometers
    },
    lifestyle: {
      noiseTolerance: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
      },
      socialPreference: {
        type: String,
        enum: ["quiet", "moderate", "social"],
      },
    },
  },
  savedProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ============ MIDDLEWARE ============

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash if password was modified (not on email update)
  if (!this.isModified("password")) return next();

  // Generate salt and hash
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// ============ METHODS ============

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
