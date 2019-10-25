import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'Nova inscrição',
      template: 'registration',
      context: {
        owner: meetup.user.name,
        userName: user.name,
        userEmail: user.email,
        meetupName: meetup.name,
        meetupDate: format(
          parseISO(meetup.date),
          "dd 'de' MMMM, 'às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        meetupLocation: meetup.location,
      },
    });
  }
}

export default new RegistrationMail();
