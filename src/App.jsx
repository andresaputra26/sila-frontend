import { Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './pages/HomePage';
import GesturePage from './pages/GesturePage';
import VideoPage from './pages/VideoPage';
import AboutPage from './pages/AboutPage';
import AlphabetPage from './pages/AlphabetPage';

function App() {
  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/gesture' Component={GesturePage} />
        <Route path='/video' Component={VideoPage} />
        <Route path='/about' Component={AboutPage} />
        <Route path='/alphabet' Component={AlphabetPage} />
      </Routes>

      <FooterComponent />
    </div>
  );
}

export default App
