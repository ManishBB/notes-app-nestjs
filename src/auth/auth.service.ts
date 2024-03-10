import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schema/user.schema'; // Assuming you have a User entity for MongoDB

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any){
        const payload = {email: user.email, sub: user.id};
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async findByEmail(email: string): Promise<any> {
        const user = await User.findOne({ email });
        return user;
    }
}
