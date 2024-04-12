import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';

export const MyListPage = (): JSX.Element => {
  return (
    <div className='my-list-page'>
      <Header />
      <div className='my-list-content'>
        <h1 className='my-list-title'>My list</h1>
      </div>
      <Footer />
    </div>
  );
};
