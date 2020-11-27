import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

interface UserProps {
  id: number;
  name: string;
  sobre: string;
}

function Landing() {
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data)
    })
  }, [])

  async function handleDelete(id: number) {
    await api.delete(`users/${id}`)

    setUsers(users.filter(user => user.id !== id))
  }

  return(
      <div className="container">
          {users.map(user => {
            return (
              <div key={user.id} className="painel">
                  <div className="ajuste">
                    <section>
                      <button onClick={() => handleDelete(user.id)}>X</button>
                    </section>
                <Link to="/profile"  style={{textDecoration: "none", color: "#000"}}>
                    <h2><strong>Nome: </strong>{user.name}</h2>
                    <p><strong>Sobre: </strong>{user.sobre}</p>
                </Link>
                  </div>
                </div>
            )
          })}

          <section className="criar">
            <Link to="/create" className="link">
              <h1>+</h1>
            </Link>
          </section>
      </div>
  );
}

export default Landing;