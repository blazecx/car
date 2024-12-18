import Auth from './components/Auth'
import './App.css';
import Register from './components/register';
import MainPage from './components/mainPage';
import CarAdd from './components/CarAdd'; // Add this import statement at the top of the App.jsx file
import { Route, Routes } from "react-router-dom";
import ReservePage from './components/reservePage';
import Catalog from './components/catalog';
import PageBook from './components/page.book'; // Add this import statement at the top of the App.jsx file
import AdminBookings from './components/page.admin.bid'; // Add this import statement at the top of the App.jsx file
import { Toaster } from 'react-hot-toast';

function App() {

  

  return (
    <div className="App">
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        
        
        
        
        <Route path='/car/:_id' element={<ReservePage/>} />
        <Route path='/CarAdd' element={<CarAdd/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<MainPage/>} />
        <Route path='/booking' element={<PageBook/>} />
        <Route path='/bid' element={<AdminBookings/>} /> Add this route at the end to handle 404 errors
     <Route path='/catalog' element={<Catalog/>} />
 </Routes>
      <Toaster />
    </div>
  )
}

export default App;