import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

export const clientCredentialsSchema = Joi.string()
    .trim()
    .required()
    .min(8)
    .max(32);

export const emailSchema = Joi.string().email({ tlds: { allow: true } });
export const emailSchemaReq = Joi.string()
    .email({ tlds: { allow: true } })
    .required();

export const dateAllowedSchema = Joi.date();

export const numberSchema = Joi.number();

export const versionStatusSchema = Joi.number()
    .integer()
    .min(0)
    .max(2);

export const idOrUUIDAllowedSchema = [Joi.string(), Joi.number()];
