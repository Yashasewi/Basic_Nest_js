import { ForbiddenException, Injectable } from '@nestjs/common';
// import { User, Bookmark } from '@prisma/client';
import * as argon from 'argon2';
import { AuthDto, CreateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signUp(dto: CreateUserDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    hash,
                },
            });

            delete user.hash;
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'email exist and credential taken ',
                    );
                }
            }
            throw error;
        }
    }

    async signIn(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new ForbiddenException('user does not exist');
        }

        const passwordMatches = await argon.verify(user.hash, dto.password);

        if (!passwordMatches) {
            throw new ForbiddenException('password incorrect');
        }

        delete user.hash;
        return user;
    }

    async DeleteUser(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) throw new ForbiddenException('user does not exist');

        const checkPassword = await argon.verify(user.hash, dto.password);

        if (!checkPassword)
            throw new ForbiddenException('password is not correct');

        await this.prisma.user.delete({
            where: {
                email: dto.email,
            },
        });

        return {
            message: 'user deleted ' + user.firstName,
        };
    }
    async UpdateUser(dto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) throw new ForbiddenException('user does not exist');

        const checkPassword = await argon.verify(user.hash, dto.password);

        if (!checkPassword)
            throw new ForbiddenException('password is not correct');

        const updatedUser = await this.prisma.user.update({
            where: {
                email: dto.email,
            },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
            },
        });
        delete updatedUser.hash;
        return {
            message:
                'user updated from ' +
                user.firstName +
                'to ' +
                updatedUser.firstName,
            ...updatedUser,
        };
    }
}
