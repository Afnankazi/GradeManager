// React's Imports
import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";


// App's Internal Imports
import {
  Home,
  Grades,
  Courses,
  CourseReport,
  StudentReport,
  CourseDetails,
  StudentDetails,
} from "./routes";
import "/public/styles/index.css";
import { Header, Footer } from "./components";

// App's External Imports
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import {useAuth,AuthProvider} from "./routes/AuthProvider"
import Login from "./routes/Login";
 
const Main = () => {
    const {isAuth ,  loading} = useAuth();
    if (loading) {
  return <div className="loader"></div>; // or your spinner component
}
    return(
      <>
    <NextTopLoader color="#7E22CE" showSpinner={false} />
    {isAuth && <Header />}
    <Toaster reverseOrder={false} position="top-center" />
    <RouterProvider router={router} />
    {isAuth && <Footer />}
    </>
    )
}
export default Main

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuth , loading  } = useAuth();
   if (loading) {
  return <div className="loader"></div>; 
  }
  return isAuth ? children : <Navigate to="/" replace />;
};


const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>

  },
  {
    path: "/home",
    element:(
      <PrivateRoute>
          <Home />
      </PrivateRoute>
    
  )
  },
  {
    path: "/:id",
    element: (
       <PrivateRoute>
        <StudentDetails />
      </PrivateRoute>
    
  )
  },
  {
    path: "/courses",
    element:( 
      <PrivateRoute>
          <Courses />
      </PrivateRoute>
    ),
  },
  {
    path: "/courses/:id",
    element:(
      <PrivateRoute>
          <CourseDetails />
      </PrivateRoute> 
    ),
  },
  {
    path: "/grades",
    element: (
    <PrivateRoute>
        <Grades />
    </PrivateRoute>

  ),
  },
  {
    path: "/report/student/:id",
    element: (
    <PrivateRoute>
        <StudentReport />
    </PrivateRoute>
   ),
  },
  {
    path: "/report/course/:id",
    element: (
      <PrivateRoute>
          <CourseReport />
      </PrivateRoute>

  ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
       <Main/>
    </AuthProvider>
  </StrictMode>
);
