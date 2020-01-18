import React, { useEffect, useState } from 'react';
import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

interface Dev {
  techs: [string];
  _id: string;
  github_username: string;
  name: string;
  avatar_url: string;
  biography: string;
  location: Object;
  __v: number
}

const App: React.FC = () => {
  const [devs, setDevs] = useState<[]>([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])

  

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm devs={devs} setDevs={setDevs} />
      </aside>
      <main>
        <ul>
          {
            devs?.map( (dev: Dev) => (
              <DevItem dev={dev} />
            ))
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
