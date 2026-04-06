import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  authId: { type: String, required: true, unique: true }, // link to your auth system (JWT, OAuth, etc.)
  name: { type: String },
  email: { type: String, required: true, unique: true },

  // Relationships to other collections
  budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Budget' }],
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
