import { Request, Response } from "express";
import { Message } from '../../entity/Message.entity'
import { logger } from "../../helpers";
import { MessageService } from "../../services";
import { getRepository } from "typeorm"
import { MessageSenders } from "../../enums/MessageSenders";
import { uuid } from 'uuidv4'

export const create = async (req: Request, res: Response) => {
  try {
    const messageRepo = await getRepository(Message);
    const messageSvc = new MessageService(messageRepo, logger);

    const { message } = req.body;
    const messageUserInstance = new Message(message);
    const createdUserMessage = await messageSvc.create(messageUserInstance);
    logger.debug('Request SUCCESS', {url: req.url, body: req.body, createdUser: createdUserMessage});


    let messageBotInstance = new Message(message);
    messageBotInstance.sender_type = MessageSenders.BOT;
    messageBotInstance.uuid = uuid();
    const createdBotMessage = await messageSvc.create(messageBotInstance);
    logger.debug('Request SUCCESS', {url: req.url, body: req.body, createdUser: createdBotMessage});
    
    return res.status(201).json({data: createdUserMessage});

  } catch (error) {
    logger.error(create.name, {url: req.url, body: req.body, error: error});
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
