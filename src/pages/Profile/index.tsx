import React, { useCallback, useMemo, useState, useEffect, FormEvent, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {FormHandles} from '@unform/core';
import { Form } from '@unform/web';
import api from '../../services/api';


import './styles.css';
import Input from '../../components/Input';

interface IUser {
    id: number;
    name: string;
    sobre: string;
}

interface IEditUser {
    name: string;
    sobre: string;
}

const Profile: React.FC = () => {
    const history = useHistory();
    const [editingUser, setEditingUser] = useState<IUser>({} as IUser)
    const [users, setUsers] = useState<IUser[]>([])
    const formRef = useRef<FormHandles>(null);

    async function handleUpdate(user: Omit<IUser, 'id'>): Promise<void> {
        try {
            const response = await api.put(`/users/${editingUser.id}`, {
                ...editingUser,
                ...user
            })

            setUsers(
                users.map(mappedUser =>
                    mappedUser.id === editingUser.id ? { ...response.data } : mappedUser,  
                ),
            )
        } catch (err) {
            alert('err')
        }
    }

    const handleSubmit = useCallback(
        async (data: IEditUser) => {
            handleUpdate(data);

            history.push('/')
    }, [handleUpdate])

  return (
      <div className="container2">
          <Link to="/" className="back">
              <h1>Voltar</h1>
          </Link>
          <div className="card">
            <h1>Perfil</h1>

            <div>
                <Form onSubmit={handleSubmit} ref={formRef} initialData={editingUser}>
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