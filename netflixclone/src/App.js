import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FreaturedMovie from './components/FreaturedMovie';

export default() =>{

  const [movieList, setMovieList] = useState([]);
  const [freaturedData, setFreaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async() =>{
      //Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Freatured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
      let chosen = originals[0].items.results[randomChosen];

      console.log(chosen);
    }

    loadAll();
  }, []);

  return(
    <div className='page'>

      {freaturedData && <FreaturedMovie item={freaturedData}/>}

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}