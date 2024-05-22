import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from './page/Home';
import { Register } from './page/Register';
import { Login } from './page/Login';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Error from './page/Error';
import { Logout } from './page/Logout';
import { AdminLayout } from './components/layouts/Admin-Layout';
import { AdminUsers } from './page/Admin-Users';
import { AdminUpdate } from './page/Admin-Update';
import { UserDashboard } from './page/User-Dasboard';


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/user' element={<UserDashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='users' element={<AdminUsers/>}/>
          <Route path='users/:id/edit' element={<AdminUpdate/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
