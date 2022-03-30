import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { Message } from '../../entity';

@Service()
export default class MessageService {

  protected repo: Repository<Message>;
  protected logger: Logger;

  constructor(repo: Repository<Message>, logger: Logger) {
    this.repo = repo;
    this.logger = logger;
  }

  getRepo(): Repository<Message> {
    return this.repo;
  }

  async create(message: Message ): Promise<Message | boolean> {
    const createdMessage = new Message(message);
    return await this.repo.save(createdMessage);
  }

  async find(): Promise<Message[] | boolean> {
    const messages = await this.repo.find();
    return messages ? messages : false;
  }

  async findOne(uuid: string): Promise<Message | boolean> {
    const messageFound =  await this.repo.findOne(uuid);
    return messageFound ? messageFound : false;
  }
}