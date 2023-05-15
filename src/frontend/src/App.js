import logo from './logo.svg';
import './App.css';
import Home from './components';
import Transcripts from './components/transcripts/transcripts';
import Resources from './components/resources/resources';
import Login from './components/login/login';
import Infra from './components/infrastructure/infra';
import Backend from './components/backend/backend';
import Frontend from './components/frontend/frontend';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/infra" element={<Infra/>}/>
        <Route path="/backend" element={<Backend/>}/>
        <Route path="/frontend" element={<Frontend/>}/>

      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
