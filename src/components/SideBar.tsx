import { useEffect, useState } from 'react';

import { Button } from '../components/Button';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarIndicator {
  onClick(id: number): void;
  selected: number;
}

export function SideBar({ onClick, selected }: SideBarIndicator) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  // Function in App.tsx
  // function handleClickButton(id: number) {
  //   setSelectedGenreId(id);
  // }

  return (
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>
        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => onClick(genre.id)}
              selected={selected === genre.id}
            />
          ))}
        </div>
      </nav>
  )
}