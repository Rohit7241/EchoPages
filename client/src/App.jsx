import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import BlogPage from "./pages/blog";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import MyProfile from "./pages/myprofilepage";
import CreateBlog from "./pages/createblog";
import RegisterUser from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage user="false" />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/createblog" element={<CreateBlog/>} />
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/blog" element={<BlogPage/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
