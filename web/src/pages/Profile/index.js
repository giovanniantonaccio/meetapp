import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { object, string, ref } from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { MdAddCircleOutline } from 'react-icons/md';
import { Container } from './styles';

import { updateProfileRequest } from '../../store/modules/user/actions';

const schema = object().shape({
  name: string().required('Nome obrigatório'),
  email: string()
    .email()
    .required('E-mail obrigatório'),
  oldPassword: string().when('password', (
    password,
    field // Se o password for informado, esse campo passa a ser obrigatório, senao retorna a validação sem o required.
  ) => (password ? field.required('Senha atual obrigatória') : field)),
  password: string(),
  confirmPassword: string().when('password', (password, field) =>
    password
      ? field
          .min(6, 'Senha precisa de pelo menos 6 dígitos')
          .required('Confirmação da senha é obrigatória')
          .oneOf([ref('password')], 'Senhas precisam ser iguais')
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="Email" />

        <hr />

        <Input name="oldPassword" type="password" placeholder="Senha atual" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />
        <button type="submit">
          <MdAddCircleOutline /> Salvar perfil
        </button>
      </Form>
    </Container>
  );
}
