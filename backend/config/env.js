const Joi = require('joi');

const envSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required(),
  PORT: Joi.number().default(5000),
  JWT_SECRET: Joi.string().min(32).required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  FIRST_ADMIN_EMAIL: Joi.string().email(),
  FIRST_ADMIN_PASSWORD: Joi.string().min(6),
}).unknown();

const { error, value } = envSchema.validate(process.env);

if (error) {
  console.error('Environment validation failed:', error.details[0].message);
  process.exit(1);
}

module.exports = value;