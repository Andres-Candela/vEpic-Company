import Footer from '../components/Footer/Footer';
import NavBar from '../components/Navbar';
import AnimeList from '../modules/AnimeList';
import AnimeSearch from '../modules/AnimeSearch';
import Homepage from '../modules/Homepage';
import Login from '../modules/auth/Login';
import Register from '../modules/auth/Register';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const handleRoutesWithNavbar = (component) => {
    return (
      <>
        <NavBar />
        {component}
        <Footer />
      </>
    )
  }

  // ESTAS SON LAS RUTAS DE LA PAGINA
  return (
    <div id="App" className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/homepage" element={handleRoutesWithNavbar(<Homepage animes={[7, 8, 20, 21, 24, 26]} />)} />
          <Route path="/animes" element={handleRoutesWithNavbar(<AnimeSearch />)} />
          <Route path="/list" element={handleRoutesWithNavbar(<AnimeList />)} />

          {/* PAGINA NOT FOUND, ose pagina no encontrada */}
          <Route path="*" element={<h1 className='p-5 text-white text-center'>PAGE NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
