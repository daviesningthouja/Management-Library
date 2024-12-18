import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from "firebase/app";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA5LGTVDTS-YlThPhlpN64Yg9mIseo2kj4",
//   authDomain: "real-time-notification-91200.firebaseapp.com",
//   projectId: "real-time-notification-91200",
//   storageBucket: "real-time-notification-91200.firebasestorage.app",
//   messagingSenderId: "613581524201",
//   appId: "1:613581524201:web:e84236a4337ce63321b478",
//   measurementId: "G-V7TQVNV1VQ",
// };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);

      // Initialize Firebase Messaging
      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey: 'BCVw57ScywTygqKjA1lg1MO6RW1IHccrjPINJCBdNExolDtNXdQNqDSdeoozF2rrDdOuxy0k9ny9aCMChqnCLQE',
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log('FCM Token:', currentToken);
          } else {
            console.warn('No registration token available.');
          }
        })
        .catch((err) => {
          console.error('Error retrieving token:', err);
        });
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}



import './index.css'
import {Home, Service,Aboutus,Product, NoPage, Add_user, LoginForm, Registration, User_Dashboard, Admin_Dashboard, Admin_Dash,Admin_User,User_Profile, User_Setting, User_Collection, User_library,BookSlider, Pagination, Borrowed_Bookdetail, User_Detail, Admin_Books, Books_Detail, Book_history, Add_book, Redirect, AdminLogin, Loan_book, Loan_detail, Loan_history, Overdue_Loan, UserBook_detail} from './pages';
// Router
import {
createBrowserRouter,RouterProvider,} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "Home",
    element: <Home/>,
  },
  {
    path: "Service",
    element: <Service/>,
  },
  {
    path: "About",
    element: <Aboutus/>,
  },
  {
    path: "Product",
    element: <Product/>,
  },



  {
    path: "/admin/Dashboard",
    element: <Admin_Dashboard/>
  },
  
  {
    path: "/admin/Dashboard/Administrator",
    element: <Admin_Dash/>
  },
  {
    path: "/admin/user",
    element: <Admin_User/>
  },
  {
    path: "/admin/user/detail/:id",
    element: <User_Detail/>
  },
  {
    path: "/admin/books",
    element: <Admin_Books/>
  },
  {
    path: "/admin/books/detail",
    element: <Books_Detail/>
  },
  {
    path: "/admin/book/detail/user/history",
    element: <Book_history/>
  },
  {
    path: "/admin/user/add",
    element: <Add_user/>
  },
  {
    path: "/admin/book/add",
    element: <Add_book/>
  },

  {
    path: "/admin/loan-data",
    element: <Loan_book/>
  },
  {
    path: "/admin/loan-history/detail/:loanId",
    element: <Loan_detail/>
  },
  {
    path: "/admin/:bookId/loan-history",
    element: <Loan_history/>
  },
  {
    path: "/admin/overdue/loan",
    element: <Overdue_Loan/>
  },



  {
    path: '/test',
    element: <BookSlider/>
  },
  {
    path: '/test2',
    element: <Pagination/>
  },
  {
    path: "/user/Dashboard",
    element: <User_Dashboard/>,
  },
  {
    path: "/user/profile",
    element: <User_Profile/>,
  },
  {
    path: "/user/library",
    element: <User_library/>
  },
  {
    path: "/user/collection",
    element: <User_Collection/>,
  },
  {
    path: '/user/collection/book',
    element: <Borrowed_Bookdetail/>,
  },
  {
    path:'/book/detail/',
    element:<UserBook_detail/>
  },
  

  {
    path: "/user/setting",
    element: <User_Setting/>
  },
  
  //admin/dashboard
  //user/dashboard
  {
    //error throw twba
    path: "*",
    element: <NoPage/>,
  },
  {
    path:"/user/Login",
    element: <Redirect/>,
  },
  {
    path:"/user/Login/student",
    element: <LoginForm/>,
  },
  {
    path:"/user/Login/admin",
    element: <AdminLogin/>,
  },


  //admin login
  {
    path:"/user/registration",
    element: <Registration/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
