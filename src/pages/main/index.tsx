import MainBody from './body';
import Header from './header';

const MainPage = () => {
  return (
    <div className="flex h-full flex-col" id="container">
      <Header />
      <MainBody />
    </div>
  );
};

export default MainPage;
