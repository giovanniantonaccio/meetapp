import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const { page } = req.query;
    const pagination_limit = 10;

    /**
     * Check page
     */
    if (!page) {
      return res.status(400).json({ error: 'Page must be informed' });
    }

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      limit: pagination_limit,
      offset: (page - 1) * pagination_limit,
      attributes: ['id', 'name', 'description', 'location', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new ScheduleController();
