import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  ownerAuthId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date },
  category: { type: String, default: 'Savings' },
}, { timestamps: true });

export default mongoose.models.Goal || mongoose.model('Goal', GoalSchema);
