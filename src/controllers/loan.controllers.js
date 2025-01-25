import Loan from "../models/loan.models.js";

const applyLoan = async (req, res) => {
  try {
    const { loanName, subcategories, maxLoan, loanPeriod } = req.body;

    if (!loanName) return res.status.json({message : "Invalid loanName type"})
    if (!subcategories) return res.status.json({message : "Invalid subcategories type"})
    if (!maxLoan ) return res.status.json({message : "Invalid maxLoan type"})
    if (!loanPeriod) return res.status.json({message : "Invalid loanPeriod type"})


    const newLoan = await Loan.create({  loanName, subcategories, maxLoan, loanPeriod });
    res.status(200).json({ message: "Loan application submitted successfully", loan: newLoan });
  } catch (error) {
    res.status(500).json({ message: "Error applying for loan", error: error.message });
  }
};

const getUserLoans = async (req, res) => {
  try {
    const { userId } = req.params;
    const loans = await Loan.find({ userId });
    res.status(200).json({ loans });
  } catch (error) {
    res.status(500).json({ message: "Error fetching loans", error: error.message });
  }
};

export {applyLoan}