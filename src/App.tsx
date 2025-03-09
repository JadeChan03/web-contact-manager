import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        ></Route>
      </Routes>
    </div>
  </Router>
  )
}
;