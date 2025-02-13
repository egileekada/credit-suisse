import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './App.css';
import DashboardScreen from './components/DashboardScreen';
import UserComponent from './components/UserComponent';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='/dashboard' element={<DashboardScreen />} />
          <Route path='/dashboard/users' element={<UserComponent />} />
        </Route>
        <Route path='*' element={
          <div className=' w-full h-full pt-20 flex flex-col justify-center items-center  ' >
            <p className=' text-4xl poppins-medium font-bold  ' >Page Not Found</p>
            <a href='/dashboard' className=' text-sm mt-3 poppins-regular text-blue-500  ' >Go Back To Dashboard</a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
