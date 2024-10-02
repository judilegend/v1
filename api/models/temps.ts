import mongoose, { Schema, Document } from "mongoose";

export interface ITemps extends Document {
  tache: Schema.Types.ObjectId;
  date: Date;
  pomodoroCount: number;
  notes: string;
}

const TempsSchema: Schema = new Schema({
  tache: { type: Schema.Types.ObjectId, ref: "Tache", required: true },
  date: { type: Date, default: Date.now },
  pomodoroCount: { type: Number, default: 0 },
  notes: { type: String },
});

export default mongoose.model<ITemps>("Temps", TempsSchema);
