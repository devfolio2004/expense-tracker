import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Expense", expenseSchema);