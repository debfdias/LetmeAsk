import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { CreateRoom } from "./pages/CreateRoom";
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext';


function App() {  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/create" element={<CreateRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes> 
      </AuthContextProvider>            
    </BrowserRouter>
  );
}
  
export default App;
  