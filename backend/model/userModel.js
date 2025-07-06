import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    role: {
      type: [String],
      enum: ["student", "mentor", "admin"],
      default: ["student"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    qualifications: {
      type: String,
      default: null,
      trim: true,
    },
    experience: {
      type: String,
      default: null,
      trim: true,
    },
    phoneNo: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit phone number`,
      },
      required: false,
    },
    city: {
      type: String,
      default: null,
      trim: true,
    },
    subject: {
      type: String,
      default: null,
      trim: true,
    },
    profileimage: {
      type: String,
      default: null,
    },
    appointed: {
      type: Boolean,
      default: false,
    },
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "slot",
      },
    ],
    fees: {
      type: Number,
      min: [0, "Fees must be a positive number"],
    },
    isActivated: {
      type: Boolean,
      default: false,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const UserModel = mongoose.model("user", userSchema);
