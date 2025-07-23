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
  let title="Google hired me"
  let content=`Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, esse atque. Explicabo, pariatur? Ipsum perferendis, quis veniam totam libero beatae officiis rerum amet repellendus corporis perspiciatis reiciendis labore praesentium deserunt?
  Corporis in illo dolor eos, voluptas atque dolorum eum. Exercitationem aliquam deleniti corrupti incidunt, modi nulla delectus alias fuga et molestias est a culpa maiores velit, voluptates quos itaque natus!
  Illo, deserunt voluptatibus dolor rerum vero ipsa nobis architecto tempora ducimus minima asperiores sequi quia, odit harum ratione qui aliquid aperiam magnam mollitia nisi eligendi. Ab doloribus possimus natus facilis.
  Libero saepe voluptatem facere explicabo, maiores obcaecati atque incidunt expedita impedit. Aspernatur fuga nostrum eum quo? Totam fugiat, rerum aspernatur, quam inventore sapiente accusamus, nostrum commodi saepe vero id? Facilis.
  Sit nesciunt deserunt laboriosam iste vitae nisi magnam possimus quam nemo ex? Maiores similique ipsam ut consectetur. Officia debitis voluptates eaque dolorum eum laboriosam magnam ducimus excepturi vero! Dolorum, eligendi!
  Ducimus deserunt sunt tenetur beatae esse delectus voluptas illo, aperiam eligendi tempore, necessitatibus ea labore ipsum architecto quaerat id eos? Voluptatem laborum assumenda facere dolorum necessitatibus numquam qui eaque velit?
  Veniam ipsa quis sunt labore unde reiciendis placeat, ullam, blanditiis, repellendus id officia quasi veritatis. Quasi ut inventore reiciendis aut praesentium quibusdam ipsa voluptate, modi voluptates aliquid, eius laboriosam. Eos.
  Expedita dolores totam, sed recusandae culpa atque voluptas doloribus consequuntur voluptate impedit quas, aut sit sequi doloremque. At dignissimos, dolorum alias praesentium, nostrum, ratione fugiat facilis eius sapiente fugit aspernatur!
  Minima error laborum vel rerum, facilis ratione soluta quae eligendi harum ad tenetur, impedit sequi? Aliquam qui vero ab laboriosam porro? Natus cumque sit molestiae sapiente dignissimos culpa porro eveniet.
  Officia tempora nesciunt libero! Eligendi eos nihil iusto, obcaecati officiis consequuntur minus reprehenderit minima aliquam. Culpa, ipsam illo, itaque eaque unde cum earum distinctio deleniti quam soluta maxime, aspernatur vero.`
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
        <Route path="/blog" element={<BlogPage title={title} content={content} />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
