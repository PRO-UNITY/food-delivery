import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import RegisterAdmin from './Pages/RegisterAdmin/RegisterAdmin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Navbar/>}/>
        <Route path={'/register'} element={<RegisterAdmin/>}/>
      </Routes>
    </div>
  );
}

export default App;
