import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import './styles.css';
import { useAuth } from '~/hooks/auth';

import Input from '~/components/Input';
import api from '~/services/api';

interface IUser {
  id: string;
  name: string;
  sobre: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { userId } = useParams<{ userId?: string }>();

  const { updateUser } = useAuth();

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`/users/${userId}`);
      formRef.current?.setData(response.data);
    }
    loadUser();
  }, [userId]);

  const handleUpdateSubmit = useCallback(
    async (data: IUser) => {
      try {
        const response = await api.put(`/users/${userId}`, data);
        updateUser(response.data);

        history.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    [history, userId, updateUser],
  );

  return (
    <div className="container2">
      <Link to="/" className="back">
        <h1>Voltar</h1>
      </Link>
      <div className="card">
        <h1>Perfil</h1>

        <div>
          <Form ref={formRef} onSubmit={handleUpdateSubmit}>
            <Input name="name" placeholder="Nome" />
            <Input name="sobre" placeholder="Sobre" />
            <button type="submit">Atualizar perfil</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
