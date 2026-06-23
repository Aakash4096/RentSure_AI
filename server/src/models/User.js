const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2,
    maxlength: 50,
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
    minlength: 8,
    select: false,
  },

  role: {
    type: String,
    enum: ["student", "landlord", "admin"],
    default: "student",
  },

  preferences: {
    maxBudget: { type: Number, min: 0 },
    desiredAmenities: [String],
    maxDistanceFromInstitute: { type: Number, default: 5 },

    lifestyle: {
      noiseTolerance: { type: Number, min: 1, max: 5, default: 3 },
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

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from API response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
