import React, {useEffect} from 'react'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Login = () => {
   const nav  =useNavigate();
   const {login , logout} = useAuth();
     useEffect(() => {
    logout();
  }, []);
  return (
    <div className='flex justify-center items-center h-full'>
      <div className=' w-80 h-80 flex justify-center items-center rounded-xl bg-slate-600'>
      <GoogleOAuthProvider  clientId="88555787987-ma4u95n24m8ej5u1ucv1iuj3qrpp22jp.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const token = credentialResponse.credential;
          localStorage.setItem("isAuth","true")
          fetch("http://localhost:8080/api/student/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("User Info from backend:", data);
              login();
              nav("/home")
            })
            .catch((err) => console.error("Error:", err));
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
      </div>
    
    </div>
  )
}

export default Login

