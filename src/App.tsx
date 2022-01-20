import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateRoom } from "./pages/CreateRoom";
import { Home } from "./pages/Home";

import { AuthContextProvider } from './contexts/AuthContext';


function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/create" element={<CreateRoom />} />
        </Routes> 
      </AuthContextProvider>
            
    </BrowserRouter>
    );
  }
  
  export default App;
  