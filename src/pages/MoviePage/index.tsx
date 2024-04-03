import { useEffect, useRef, useState } from 'react';
import { fetchPopular } from 'src/api/fetchPopular';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { Movie } from 'src/components/Movie';
import { MovieType } from 'src/types/types';

export const MoviePage = (): JSX.Element => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPopular(pageNumber);

        setMovies((prev) => [...prev, ...data]);
      } catch {
        throw new Error('Something went wrong with request (Movie page)');
      }
    };
    loadData();
  }, [pageNumber]);

  const handleIntersect = (el: HTMLElement | null) => {
    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      setPageNumber((prev) => prev + 1);
    });

    if (el) observer.current.observe(el);
  };

  return (
    <div className='movie-page'>
      <Header />
      <div className='movie-list'>
        {movies.map((movie, index) => (
          <Movie movie={movie} key={`movie-${index}-page`} />
        ))}
      </div>
      <div ref={handleIntersect} />
      <Footer />
    </div>
  );
};
