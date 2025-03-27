import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserResponse } from './response/user.response';
import { FindUserDTO } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponse,
  })
  create(@Body() createUserDto: CreateUserDTO): Promise<UserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find a user by id, email, or username' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully found.',
    type: UserResponse,
  })
  getUser(@Query() findUserDto: FindUserDTO): Promise<UserResponse> {
    return this.usersService.findUser(findUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user by id, email, or username' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
