import * as Joi from 'joi';
export default class NewUserDTO {
  username: string;
  password: string;

  static Schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  });
}
