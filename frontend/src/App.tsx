import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/User/Home';
import { AdminHome, Users } from './Pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home/>}/>

        {/* admin URL */}
        <Route path='admin/' element={<AdminHome/>}/>
        <Route path='admin/users' element={<Users/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
