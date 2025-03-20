import './App.css';
import { Home } from './pages/Home/Home';
// import { EditContact } from './components/EditContact/EditContact';
import { AddContact } from './components/AddContact/AddContact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Grid } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


/* 
PATHS:
"/" -> Home -> AddContact, ContactList
"/contact/:id" ->  EditContact :id
"/search/:field" -> ContactList filtered 
*/

export const App = () => (
  <CssVarsProvider disableTransitionOnChange>
    <CssBaseline />
    <Grid
      container
      direction="column"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Router>
        {/* <Navbar /> */}
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-contact" element={<AddContact/>}></Route>
            {/* <Route path="/contact/:id" element={<EditContact />} /> */}
          </Routes>
        </div>
      </Router>
    </Grid>
  </CssVarsProvider>
);
