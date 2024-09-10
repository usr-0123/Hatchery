import { Route, Routes } from 'react-router-dom';

import './App.css';
import PageNotFound from './PageNotFound';
import Dashboard from './layouts/Dashboard';
import AuthRoutes from './pages/auth/AuthRoutes';

function App() {

  return (
    <div >
      <Routes>
        <Route path='/*' element={<AuthRoutes />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App;
