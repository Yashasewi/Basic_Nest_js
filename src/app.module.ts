import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [TestModule, AuthModule, UserModule, BookmarkModule, PrismaModule],
})
export class AppModule {}
