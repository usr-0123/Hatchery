import { Route, Routes } from 'react-router-dom';
// import './App.css'
import Dashboard from './layout/Dashboard.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AuthRoutes from './pages/AuthRoutes.jsx';
import Unauthorised from './pages/Unauthorised.jsx';
import Problem from './pages/Problem.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<AuthRoutes />} />
        <Route path='/*' element={<AuthRoutes />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/unauthorized' element={<Unauthorised />} />
        <Route path='/problem' element={<Problem />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;
