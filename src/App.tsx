import './App.css';
import { Home } from './pages/Home/Home';
import { EditContact } from './components/EditContact/EditContact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* 
PATHS:
"/" -> Home -> AddContact, ContactList
"/contact/:id" ->  EditContact :id
"/search/:field" -> ContactList filtered 
*/

export const App = () => (
  <Router>
    {/* <Navbar /> */} 
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact/:id" element={<EditContact/>} /> */}
      </Routes>
    </div>
  </Router>
);
