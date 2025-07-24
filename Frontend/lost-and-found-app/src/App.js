import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import UserRegistration from './components/User/UserRegistrationForm';
import UserLogin from './components/User/UserLogin';
import RegisteredUsers from './components/User/RegisteredUsers';
import AdminNavbar from './components/Navbar/AdminNavbar';
import AdminHome from './components/User/AdminHomePage';
import ItemList from './components/Item/ItemList';
import RequestList from './components/Request/RequestList';
import UserHome from './components/User/UserHomePage';
import AddItem from './components/Item/AddItem';
import UserProfile from './components/User/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='UserRegistration' element={<UserRegistration/>}></Route>
        <Route path='/' element={<UserLogin/>}></Route>
        <Route path='Users' element={<RegisteredUsers/>}></Route>
        <Route path='AdminNavbar' element={<AdminNavbar/>}></Route>
        <Route path='AdminHome' element={<AdminHome/>}></Route>
        <Route path='ItemList' element={<ItemList/>}></Route>
        <Route path='RequestList' element={<RequestList/>}></Route>
        <Route path='Home' element={<UserHome/>}></Route>
        <Route path='ReportItem/:userId' element={<AddItem/>}></Route>
        <Route path='Profile/:userId' element={<UserProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
