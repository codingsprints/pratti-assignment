import { Document } from 'mongoose';

export interface IContent extends Document {
  contentType:
    | 'Blog Post'
    | 'Instagram Caption'
    | 'Email Newsletter'
    | 'Product Description';
  topic: string;
  keywords?: string;
  tone: 'Friendly' | 'Professional' | 'Casual';
  language: 'English' | 'Hindi' | 'Marathi';
  createdAt?: Date;
  updatedAt?: Date;
}
