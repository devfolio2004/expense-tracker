import Expense from "../models/Expense.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date, requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({ message: "requestId is required" });
    }

    if (!amount || !category || !date) {
      return res.status(400).json({ message: "amount, category and date are required" });
    }

    const amountNumber = Number(amount);

    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({ message: "amount must be greater than 0" });
    }

    const existing = await Expense.findOne({ requestId });

    if (existing) {
      return res.status(200).json(existing);
    }

    const savedExpense = await Expense.create({
      requestId,
      amount: Math.round(amountNumber * 100),
      category: category.trim(),
      description: description ? description.trim() : "",
      date
    });

    return res.status(201).json(savedExpense);
  } catch (error) {
    if (error.code === 11000 && req.body.requestId) {
      const duplicate = await Expense.findOne({ requestId: req.body.requestId });
      if (duplicate) {
        return res.status(200).json(duplicate);
      }
    }
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    const query = {};

    if (category) {
      query.category = new RegExp(`^${escapeRegex(category.trim())}$`, "i");
    }

    let mongoQuery = Expense.find(query);

    if (sort === "date_desc") {
      mongoQuery = mongoQuery.sort({ date: -1, createdAt: -1 });
    }

    const expenses = await mongoQuery.lean();

    return res.json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};