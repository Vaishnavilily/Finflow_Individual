import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  alertThreshold: { type: Number, default: 80 },
  month: { type: String, default: () => new Date().toISOString().slice(0, 7) },
}, { timestamps: true });

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
