import Login from '../Login';
import Cadastro from '../Cadastro';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
 

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);
}
export default App;