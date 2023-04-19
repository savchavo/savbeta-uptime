import { model, Schema } from "mongoose";

export const Save = model("Save", new Schema({
    guildId: { type: String, required: true },
    text: { type: String, required: true }
}));

export interface ISave {
    guildId: string,
    text: string
}