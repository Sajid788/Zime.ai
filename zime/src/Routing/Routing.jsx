import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsPage from "../Page/PostsPage";

function Routing() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PostsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
