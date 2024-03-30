// import logo from './logo.svg';
import { Routes,Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home'
import SignUp from './pages/SignUp'
import Login from "./pages/Login";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>
    </>
  );
}
export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children;
  }
  else{
    return<Navigate to="/login"/>;
  }
}
export default App;
