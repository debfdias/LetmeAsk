import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CreateRoom } from "./pages/CreateRoom";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/create" element={<CreateRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
