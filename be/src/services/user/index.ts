import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { User } from '../../entity';

@Service()
export default class UserService {

  protected repo: Repository<User>;
  protected logger: Logger;

  constructor(repo: Repository<User>, logger: Logger) {
    this.repo = repo;
    this.logger = logger;
  }

  getRepo(): Repository<User> {
    return this.repo;
  }

  async create(user: User ): Promise<User | boolean> {
    const userFound = await this.repo.findOne({ where:{ uuid: user.uuid } });
    if (userFound && userFound != undefined)
      return false;
    const createdUser = new User(user);
    return await this.repo.save(createdUser);
  }

  async find(): Promise<User[] | boolean> {
    const users = await this.repo.find();
    return users ? users : false;
  }

  async findOne(uuid: string): Promise<User | boolean> {
    const userFound =  await this.repo.createQueryBuilder('user')
    .leftJoinAndSelect('user.messages', 'messages')
    .where( {uuid : uuid} )
    .addOrderBy('messages.created_at', 'ASC')
    .getOne();
    
    return userFound ? userFound : false;
  }
}