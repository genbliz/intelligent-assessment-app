import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { BookList } from "./pages/book/book";
import { Home } from "./pages/home";

import "notie/dist/notie.css";
import "./styles/globals.scss";
import { BookCommentList } from "./pages/book/book-comment";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/books/:id/comment" element={<BookCommentList />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
