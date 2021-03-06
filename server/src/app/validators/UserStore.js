import { object, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string()
        .strict(true)
        .required('Name is required'),
      email: string()
        .email()
        .required(),
      password: string()
        .strict(true)
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation failed', messages: err.inner });
  }
};
