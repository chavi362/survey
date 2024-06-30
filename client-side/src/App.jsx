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
import './App.css';
import Error from './pages/Error';
import SurveysToConfirm from './pages/SurveysToConfirm';
import SurveyDetail from './pages/SurveyDetail';
import AllSurveys from './pages/AllSurveys';
import { SurveyProvider } from './components/SurveyContext'; // ייבוא SurveyProvider

export const UserContext = createContext();

function App() {
  const [user, setUser, clearLocalStorage] = useLocalStorage('user', null);

  const deleteUser = () => {
    clearLocalStorage();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <SurveyProvider> 
          <Routes>
            <Route path="/" element={<Navigate to='/login' deleteUser={deleteUser} />} />
            <Route path="/login" element={<Login updateUserContext={setUser} />} />
            <Route path="/managerPage" element={<ManagerPage />} />
            <Route path="/manager/surveysToConfirm" element={<SurveysToConfirm />} />
            <Route path="/manager/surveysToConfirm/:surveyCode" element={<SurveyDetail />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/all-surveys" element={<AllSurveys />} />
            <Route path="/surveys/:surveyCode" element={<SurveyDetail />} />
            <Route path="/register" element={<Register updateUserContext={setUser} />} />
            <Route path="/create-account" element={<AddUserDetails updateUserContext={setUser} />} />
            <Route path="/surveys" component={SurveysPage} />
            <Route path="users/:userId/" />
            <Route path="*" element={<Error />} />
          </Routes>
        </SurveyProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
