import React, { useCallback, useMemo, useState, useEffect, FormEvent, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {FormHandles} from '@unform/core';
import { Form } from '@unform/web';
import api from '../../services/api';


import './styles.css';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';

interface IUser {
    id: string;
    name: string;
    sobre: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const { user, updateUser } = useAuth();

    const handleUpdateSubmit = useCallback(async (data: IUser) => {
            try {
                const { id, name, sobre } = data

                const formData = {
                    id,
                    name, 
                    sobre,
                }
                const response = await api.put(`/users/${formData.id}`, formData)

                updateUser(response.data)

                console.log(response)

                history.push('/')
            } catch (err) {
                console.log(err)
            }
    }, [history, updateUser])

  return (
      <div className="container2">
          <Link to="/" className="back">
              <h1>Voltar</h1>
          </Link>
          <div className="card">
            <h1>Perfil</h1>

            <div>
                    <Form 
                        ref={formRef} 
                        onSubmit={handleUpdateSubmit} 
                        initialData={user}>
                        <Input name="name" placeholder="Nome" />
                        <Input name="sobre" placeholder="Sobre" />
                        <button type="submit" >Atualizar perfil</button>
                    </Form>
            </div>
          </div>
      </div>
  );
}

export default Profile;