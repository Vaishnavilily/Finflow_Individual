import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
