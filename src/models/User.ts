import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  bandwidth: number;
  walletAddress?: string;
  transactions: Array<{
    type: 'purchase' | 'send';
    amount: number;
    recipient?: string;
    date: Date;
    hash?: string;
  }>;
  inviteCode?: string;
  invitedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    bandwidth: { type: Number, default: 0 },
    walletAddress: { type: String },
    transactions: [
      {
        type: { type: String, enum: ['purchase', 'send'], required: true },
        amount: { type: Number, required: true },
        recipient: { type: String },
        date: { type: Date, default: Date.now },
        hash: { type: String },
      },
    ],
    inviteCode: { type: String, unique: true, sparse: true },
    invitedBy: { type: String },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create model only if it doesn't already exist
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
