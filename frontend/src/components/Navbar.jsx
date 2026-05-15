import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        Bibliomarket
      </Link>
      <div className={styles.links}>
        <Link to="/books">Consultar</Link>
        {user ? (
          <>
            {user.role === "ADMIN" && <Link to="/dashboard">Dashboard</Link>}
            {(user.role === "USER" || user.role === "ADMIN") && (
              <>
                <Link to="/my-books">Mi biblioteca</Link>
                <Link to="/books/new" className={styles.btnPrimary}>
                  + Vender libro
                </Link>
              </>
            )}
            <span className={styles.roleTag}>{user.name}</span>
            <button className={styles.btnLogout} onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register" className={styles.btnPrimary}>
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
