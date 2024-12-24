import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SearchRecipes from "./Pages/SearchRecipes";
import BlogHome from "./Pages/BlogHome";
import PostBlog from "./Pages/PostBlog";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ViewBlogs from "./Pages/ViewBlogs";
import ViewRecipe from "./Pages/ViewRecipe";
import RecipeGeneration from "./Pages/RecipeGeneration";
import MyRecipes from "./Pages/MyRecipes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/searchRecipes" element={<SearchRecipes />} />
          <Route exact path="/blogHome" element={<BlogHome />} />
          <Route exact path="/postBlog" element={<PostBlog />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/viewBlogs" element={<ViewBlogs />} />
          <Route path="/recipe/:recipeId" element={<ViewRecipe />} />
          <Route exact path="/generateRecipe" element={<RecipeGeneration />} />
          <Route exact path="/myRecipes" element={<MyRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
