import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';

@Module({
    controllers:[UserController],
    imports:[TypeOrmModule.forFeature([UserEntity])],
    exports:[TypeOrmModule]
})
export class UserModule {}
