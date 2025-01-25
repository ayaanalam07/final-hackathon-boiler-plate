// loan.controller.js
import loan from "../models/loan.model.js";

const applyLoan = async (req, res) => {
    const { loanName, subcategories, maxLoan, loanPeriod } = req.body;

    if (!loanName) return res.status(400).json({ message: "loanName is required" });
    if (!subcategories) return res.status(400).json({ message: "subcategories is required" });
    if (!maxLoan) return res.status(400).json({ message: "maxLoan is required" });
    if (!loanPeriod) return res.status(400).json({ message: "loanPeriod is required" });

    try {
        const loanCreate = await loan.create({
            loanName,
            subcategories,
            maxLoan,
            loanPeriod,
        });

        res.status(200).json({
            message: "Loan created successfully",
            data: loanCreate,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export { applyLoan };
