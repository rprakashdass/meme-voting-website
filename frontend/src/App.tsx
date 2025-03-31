import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/User/Home';
import { AdminHome } from './Pages/Admin';
import UploadMeme from './Pages/Admin/UploadMeme';
import LoginPage from './Pages/User/LoginPage';
import { AddMemeOwners } from './Pages/Admin/AddMemeOwners';
import ViewUsers from './Pages/Admin/ViewUsers';
import ViewMemeOwners from './Pages/Admin/ViewMemeOwners';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/memes' element={<Home/>}/>
        {/* admin URL */}
        <Route path='admin/' element={<AdminHome/>}/>
        <Route path='admin/add-meme-owners' element={<AddMemeOwners/>}/>
        <Route path='admin/view-users' element={<ViewUsers/>}/>
        <Route path='admin/upload-memes' element={<UploadMeme/>}/>
        <Route path='admin/view-meme-owners' element={<ViewMemeOwners/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
