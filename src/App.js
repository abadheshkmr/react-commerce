import { Routes, Route, Outlet } from "react-router";

import Home from "./routes/home/home.component";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from './routes/shop/shop.component';
import Checkout from "./routes/checkout/checkout.component";




import {useEffect } from "react";
import { onAuthStateChangedListiener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";



const App = () => { 
  const dispatch = useDispatch();
  
   useEffect(() =>{
         const unsubscribe =  onAuthStateChangedListiener(async (user) => {
          if (user) {
            await createUserDocumentFromAuth(user);
          }
          console.log('Dispatching user:', user);
          dispatch(setCurrentUser(user));
         });
         return unsubscribe;
      },[]);
     
  return (

  <Routes>
    <Route path="/" element={ <Navigation />}>
      <Route index={true} element={ <Home />}/>
      <Route path="/shop/*" element={<Shop />}/>
      <Route path="auth" element={<Authentication />}/>
      <Route path="/checkout" element={<Checkout />} />
    </Route>
    
  </Routes>


  )
} 

export default App;
