import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

const CreateUser: React.FC = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [sobre, setSobre] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        await api.post('users', {
            name,
            sobre
        }).then(() => {
            // alert('Cadastro realizado')

            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro')
        })
    }

  return (
      <div className="form">
          <section>
              <h1><Link className="cancelar" to="/">Cancelar</Link></h1>
          </section>
          <form onSubmit={handleSubmit}>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
                type="text" 
                placeholder="Nome" 
                />
              <input
                id="name"
                value={sobre}
                onChange={event => setSobre(event.target.value)}
                type="text" 
                placeholder="Sobre" 
            />

              <button type="submit">Confirmar</button>
          </form>
      </div>
  );
}

export default CreateUser;