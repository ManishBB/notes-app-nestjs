// notes.service.ts

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {}

  async findAll(userEmail: string): Promise<Note[]> {
    return this.noteModel.find({ ownersEmail: userEmail }).exec();
  }

  async create(createNoteDto: CreateNoteDto, userEmail: string): Promise<Note> {
    const createdNote = new this.noteModel({ ...createNoteDto, ownersEmail: userEmail });
    return createdNote.save();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userEmail: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    if (note.ownersEmail !== userEmail) {
      throw new UnauthorizedException('You are not authorized to update this note');
    }
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto, { new: true }).exec();
  }

  async remove(id: string, userEmail: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    if (note.ownersEmail !== userEmail) {
      throw new UnauthorizedException('You are not authorized to delete this note');
    }
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
