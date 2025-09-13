import mongoose, { Model, Schema } from 'mongoose';
import { IContent } from './contentTyp';

const ContentSchema: Schema<IContent> = new Schema(
  {
    contentType: {
      type: String,
      required: [true, 'Content type is required'],
      enum: [
        'Blog Post',
        'Instagram Caption',
        'Email Newsletter',
        'Product Description',
      ],
      trim: true,
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      minlength: [2, 'Topic must be at least 2 characters'],
      trim: true,
    },
    keywords: {
      type: String,
      trim: true,
    },
    tone: {
      type: String,
      required: [true, 'Tone is required'],
      enum: ['Friendly', 'Professional', 'Casual'],
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: ['English', 'Hindi', 'Marathi'],
    },
  },
  {
    timestamps: true,
  },
);

const Content: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);

export default Content;
