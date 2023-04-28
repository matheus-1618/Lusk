import logo from './logo.svg';
import './App.css';
import Home from './components';
import Transcripts from './components/transcripts/transcripts';
import Resources from './components/resources/resources';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/resources" element={<Resources/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
