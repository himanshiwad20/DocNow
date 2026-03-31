import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from './components/Layout/Footer/Footer';
import About from "./pages/About";
import Contact from "./pages/Contact";
import GalleryPage from './pages/Gallery/GalleryPage'
import { Toaster } from "react-hot-toast";
import AllDoctors from "./pages/Doctors/AllDoctors";
import Appointment from "./pages/Doctors/Appointment";
import UserProfile from "./pages/User/UserProfile";
import MyAppointments from "./pages/User/MyAppointments";
import {Provider} from 'react-redux'
import {store} from './redux/store.js';
import AppointmentDetails from "./pages/User/AppointmentDetails.js";
import ResetPassword from "./pages/User/ResetPassword.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import DocNowExpert from './pages/DocNowExpert.jsx';

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <Toaster/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path='/docnowExpert' element={<DocNowExpert />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/doctors/:id" element={<Appointment />} />
          <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/user/appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
          <Route path="/user/appointmentDetails/:id" element={<ProtectedRoute><AppointmentDetails /></ProtectedRoute>} />
          <Route path="/user/resetPassword/:id" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
