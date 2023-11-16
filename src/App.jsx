import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Home from './pages/home/home'; 
import Login from './pages/login/login';
import Register from './pages/register/register';
import Game from './pages/game/game';
import Cart from './pages/cart/cart';
import Error from './pages/error/error';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
