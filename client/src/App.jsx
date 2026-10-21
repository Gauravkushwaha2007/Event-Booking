import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Events from './pages/Events';
import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events/>}/>
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/register" element={<Signup/>} />
        <Route path='/verify-otp' element={<VerifyOTP></VerifyOTP>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;