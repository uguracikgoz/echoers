import { EntityRepository, getConnection, Repository } from 'typeorm';
import { User } from '../entity/User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
 
}
export const getUserRepository = async (): Promise<UserRepository> => {
    const connection = await getConnection();
    return connection.getCustomRepository(UserRepository);
};