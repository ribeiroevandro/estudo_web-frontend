import userEvent from '@testing-library/user-event';
import React, { useCallback, useMemo, useState, useEffect, FormEvent, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {FormHandles} from '@unform/core';
import { Form } from '@unform/web';
import api from '../../services/api';


import './styles.css';

interface User {
    id?: number;
    name: string;
    sobre: string;
}

const Profile: React.FC = () => {
    const history = useHistory();
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [sobre, setSobre] = useState('');
    // const [editUser, setEditUser] = useState<User>();
    const formRef = useRef<FormHandles>(null);

    // const initialFormData = useMemo(():User => {
    //     return {
    //         name: name,
    //         sobre: sobre
    //     }
    // }, [])


    const handleSubmit = useCallback(async (data: User) => {
        try {
            const userData = {
                name: data.name,
                sobre: data.sobre
            }

            await api.put(`/users/${data.id}`, userData)
        } catch(err) {
            alert('err')
            console.log(err)
        }
    }, [])

    

  return (
      <div className="container2">
          <Link to="/" className="back">
              <h1>Voltar</h1>
          </Link>
          <div className="card">
            <h1>Perfil</h1>

            <div>
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        name="name" 
                        placeholder="Nome"/>
                    <input 
                        value={sobre}
                        onChange={event => setSobre(event.target.value)}
                        name="sobre" 
                        placeholder="Sobre"/>
                    <button type="submit" onClick={() => formRef.current?.submitForm()}>Atualizar perfil</button>
                </Form>
            </div>
          </div>
      </div>
  );
}

export default Profile;