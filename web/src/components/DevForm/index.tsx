import React, { useState, useEffect, FormEvent } from 'react';
import api from '../../services/api';

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

interface OwnProps {
  devs: Array<Dev> | null;
  setDevs: Function;
}

function DevForm({setDevs, devs}: OwnProps) {
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [techs, setTechs] = useState<string>('');
  const [latitude, setLatitude] = useState<number | string>('');
  const [longitude, setLongitude] = useState<number | string>('');
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
         timeout: 30000,
      }
    )
  }, []);

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>): Promise<any> {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username: githubUsername,
      techs,
      longitude,
      latitude
    })
    
    setDevs([...devs, response.data])
    setGithubUsername('')
    setTechs('');
  }

  return (
    <form onSubmit={handleOnSubmit} noValidate={true}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={githubUsername}
              onChange={e => setGithubUsername(e.target.value)}
              />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input 
              name="techs" 
              id="techs" 
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
  );
}

export default DevForm;