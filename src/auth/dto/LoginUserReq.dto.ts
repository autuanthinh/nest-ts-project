import * as Joi from 'joi';

export default class LoginUserReqDTO {
  username: string;
  password: string;

  static Schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  });
}
