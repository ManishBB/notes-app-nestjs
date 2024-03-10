import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entity/user.entity";
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    controllers: [AppController],
    imports: [
        UserModule,
        MongooseModule.forRoot('mongodb+srv://manish:manish123@cluster0.r9tuwdy.mongodb.net'), // Replace with your MongoDB connection string
        AuthModule,
        ProfileModule,
        NotesModule,
    ],
})
export class AppModule{}