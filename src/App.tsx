import './App.css'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import RoleGuide from './pages/RoleGuide/RoleGuide';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
function App() {

  return (
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path="/settings" element = {<Settings/>}/>
        <Route path='/roleGuide' element = {<RoleGuide/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
