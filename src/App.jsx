import { BrowserRouter, Routes, Route } from "react-router";
import  Home from "./pages/Home";
import Layout from "./pages/Layout";
import "./App.css";
import Signin from "./pages/signin";
import Signup from "./pages/signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  
  )   
  
}

export default App