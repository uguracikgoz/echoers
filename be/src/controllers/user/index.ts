import { Request, Response } from "express";
import { User } from '../../entity/User.entity'
import { logger } from "../../helpers";
import UserService from "../../services/user";
import { getRepository } from "typeorm"


export const get = async (req: Request, res: Response) => {
  try {
    const userUuid: string = req.query.userUuid.toString();
    const userInstance = new User({uuid:userUuid});
    const userRepo = await getRepository(User);
    const usersvc = new UserService(userRepo, logger);
    const foundUser = await usersvc.findOne(userInstance.uuid);
    logger.debug('Request succeed', {url: req.url, body: req.query, foundUser: foundUser});
    const result = foundUser === false ?
    res.status(404).json({error:'Not found', message:'There is no user exists with given information'}) :
    res.status(200).json({data: foundUser});
    return result;
  } catch (error) {
    logger.error(get.name, {url: req.url, body: req.query, error: error});
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
      });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const userInstance = new User(user);
    const userRepo = await getRepository(User);
    const usersvc = new UserService(userRepo, logger);
    const createdUser = await usersvc.create(userInstance);
    logger.debug('Request SUCCESS', {url: req.url, body: req.body, createdUser: createdUser});
    return createdUser === false ? 
    res.status(303).json({error:'Unprocessable Entity', message: 'This user already exists'}):
    res.status(201).json({data: createdUser});
  } catch (error) {
    logger.error(create.name, {url: req.url, body: req.body, error: error});
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
