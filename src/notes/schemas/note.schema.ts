// note.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  ownersEmail: string; // Store the email of the note owner
}

export const NoteSchema = SchemaFactory.createForClass(Note);
