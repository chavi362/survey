import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/RegisterPage';
import AddUserDetails from './pages/AddUserDetails';
import SurveysPage from './pages/SurveysPage';
import HomePage from './pages/HomePage';
import ManagerPage from './pages/ManagerPage';
import './App.css'
import Error from './pages/Error'
import SurveysToConfirm from './pages/SurveysToConfirm';
export const UserContext = createContext();
function App() {
  const [user, setUser, claerLocalStorage] = useLocalStorage('user', null);
  const deleteUser = () => {
    claerLocalStorage();
    setUser(null);
  }
  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Navigate to='/login' deleteUser={deleteUser} />}/> 
            <Route path="/login" element={<Login updateUserContext={setUser} />} />
            <Route path="/managerPage" element={<ManagerPage />} />
            <Route path="/manager/surveysToConfirm" element={<SurveysToConfirm />}></Route>
            <Route path="/register" element={<Register updateUserContext={setUser} />} />
            <Route path="/create-account" element={<AddUserDetails updateUserContext={setUser} />} />
            <Route path="/surveys" component={SurveysPage} />
            <Route path="users/:userId/"  >
            </Route>
            <Route path="*" element={<Error />} />
          {/* </Route> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;