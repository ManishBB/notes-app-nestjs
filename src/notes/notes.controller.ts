// notes.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Req, UseGuards, Param } from '@nestjs/common';
import { Request } from 'express';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNoteDto } from './dto/update-note.dto';

export interface User {
    _id: string;
    email: string;
}

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.user as User; // Cast req.user to User interface
    const userEmail = user.email; // Get the email of the authenticated user
    return this.notesService.findAll(userEmail);
  }

  @Post()
  async create(@Req() req: Request, @Body() createNoteDto: CreateNoteDto) {
    const user = req.user as User; // Cast req.user to User interface
    const userEmail = user.email; // Get the email of the authenticated user
    return this.notesService.create(createNoteDto, userEmail);
  }

  @Put(':id')
  async update(@Req() req: Request, @Body() updateNoteDto: UpdateNoteDto, @Param('id') id: string) {
    const user = req.user as User; // Cast req.user to User interface
    const userEmail = user.email; // Get the email of the authenticated user
    return this.notesService.update(id, updateNoteDto, userEmail);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as User; // Cast req.user to User interface
    const userEmail = user.email; // Get the email of the authenticated user
    return this.notesService.remove(id, userEmail);
  }
}
