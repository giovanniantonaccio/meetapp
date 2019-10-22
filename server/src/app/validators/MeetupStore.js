import { object, string, date, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string().required(),
      description: string().required(),
      location: string().required(),
      date: date().required(),
      banner_id: number(),
      user_id: number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation failed', messages: err.inner });
  }
};
