import MainBody from './body';
import Header from './header';

const MainPage = () => {
  return (
    <div className="min-w-2xl" id="container">
      <Header />
      <MainBody />
    </div>
  );
};

export default MainPage;
