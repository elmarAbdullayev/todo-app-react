import Main from './components/MainSide';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {

  return (
<AuthProvider>
    
    <BrowserRouter>

        <Routes>

          <Route path = "/" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/main" element = {<Main/>}/>
        </Routes>

    </BrowserRouter>

     </AuthProvider>

  )
}

export default App
