import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)

    return await user.save()
  }

  async listUsers(page: number, perPage: number, searchString?: string) {
    const skip = (page - 1) * perPage

    const [result, total] = await this.usersRepository.findAndCount({
      where: [{ full_name: Like(`%${searchString || ''}%`) }, { cpf: searchString }],
      select: ['id', 'full_name', 'cpf', 'role'],
      take: perPage,
      skip: skip
    })

    const lastPage = Math.ceil(total / perPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: result,
      count: total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage
    }
  }

  async findUser(id: string) {
    return await this.usersRepository.findOneOrFail(id);
  }

  async findByDocument(cpf: string) {
    return await this.usersRepository.findOne({
      where: { cpf }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail(id);

    const updatedUser = User.merge(user, updateUserDto);
    
    await updatedUser.save();
    
    return updatedUser;
  }

  async deactivateById(id: string, reason: string) {
    const user = await User.findOneOrFail(id);

    const updatedUser = this.usersRepository.merge(user, {
      is_active: false,
      deactivation_reason: reason
    });
    
    await updatedUser.save();
    
    return updatedUser;
  
  }

  async reactivateById(id: string) {
    const user = await User.findOneOrFail(id);

    const updatedUser = this.usersRepository.merge(user, {
      is_active: true,
      deactivation_reason: undefined
    });
    
    await updatedUser.save();
    
    return updatedUser;
  }
}
