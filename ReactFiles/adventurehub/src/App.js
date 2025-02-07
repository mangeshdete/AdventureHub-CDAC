import { Routes, Route } from 'react-router-dom'; // Corrected import
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './components/Homepage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar.js';
import Footer from './components/FooterComponents/Footer.js';
import ChooseRole from './components/ChooseRole.js';
import OrganizerRegisterPage from './components/OrganiserComponents/OrganiserRegistrationPage';
import CustomerRegistrationPage from './components/CustomerComponents/CustomerRegistrationPage.js';
import ForgotPassword from './components/ForgotPassword.js';
import OrganizerDashboard from './components/OrganiserComponents/OrganizerDashboard';
import CustomerDashboard from './components/CustomerComponents/CustomerDashboard';
import About from './components/FooterComponents/About';
import Contact from './components/FooterComponents/Contact';
import Feedback from './components/FooterComponents/Feedback';
import Privacy from './components/FooterComponents/Privacy';
import Terms from './components/FooterComponents/Terms';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/chooserole' element={<ChooseRole />} />
          <Route path='/registerCustomer' element={<CustomerRegistrationPage />} />
          <Route path='/registerOrganiser' element={<OrganizerRegisterPage />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/organizerdashboard' element={<OrganizerDashboard />} />
          <Route path='/customerdashboard' element={<CustomerDashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/terms' element={<Terms />} />
          {/* <Route path="/profile" element={<Profile />} />  */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;