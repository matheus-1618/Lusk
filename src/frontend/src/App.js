import logo from './logo.svg';
import './App.css';
import Home from './components';
import Transcripts from './components/transcripts/transcripts';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
