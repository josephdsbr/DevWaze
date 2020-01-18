import React from 'react';
import './styles.css';

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

interface Props {
  dev: Dev
}

function DevItem(props: Props) {
  const { dev } = props;
  return (
    <li key={dev._id} className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.github_username}/>
        <div className="user-info">
        <strong>{dev.name}</strong>
        <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.biography}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar</a>
    </li>
  )
}

export default DevItem;