import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import BookList from "./pages/BookList/BookList.jsx";
import BookDetail from "./pages/BookDetail/BookDetail.jsx";
import BookForm from "./pages/BookForm/BookForm.jsx";
import MyBooks from "./pages/MyBooks/MyBooks.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BookList />} />
          <Route
            path="/my-books"
            element={
              <ProtectedRoute roles={["USER", "ADMIN"]}>
                <MyBooks />
              </ProtectedRoute>
            }
          />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route
            path="/books/new"
            element={
              <ProtectedRoute roles={["USER", "ADMIN"]}>
                <BookForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:id/edit"
            element={
              <ProtectedRoute roles={["USER", "ADMIN"]}>
                <BookForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
