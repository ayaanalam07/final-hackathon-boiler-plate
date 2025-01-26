import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  loanName: {
    type: String,
    required: true,
    enum:[
        "Wedding Loans","Home Construction Loans","Business Startup Loans","Education Loans"
    ]
  },
  subcategories: {   
    type: [String],
    required: true,
    enum:[
        'Valima', 'Furniture', 'Valima Food', 'Jahez',
        'Structure', 'Finishing', 'Loan',
        'Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery',
        'University Fees', 'Child Fees Loan'
    ]
  },
  maxLoan: {
    type: Number, 
    required: true
  },
  loanPeriod: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Loan', loanSchema);
