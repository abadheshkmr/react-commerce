import { Routes, Route, Outlet } from "react-router";

import Home from "./routes/home/home.component";

import Navigation from "./routes/navigation/navigation.component";
import Sign from "./routes/sign-in/sign-in.component";


const Shop = () => 
  <h1> I am here to shop</h1>


const App = () => { return (
  <Routes>
    <Route path="/" element={ <Navigation />}>
      <Route index={true} element={ <Home />}/>
      <Route path="/shop" element={<Shop />}/>
      <Route path="sign-in" element={<Sign />}/>
    </Route>
  </Routes>

  )
} 

export default App;
