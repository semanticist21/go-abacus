import MainBody from './body';
import Header from './header';

const MainPage = () => {
  return (
    <div id="container" className="flex h-full flex-col">
      <Header />
      <MainBody />
    </div>
  );
};

export default MainPage;
