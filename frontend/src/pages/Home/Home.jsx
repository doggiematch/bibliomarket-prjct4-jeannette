import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Compra y vende tus libros de segunda mano
        </h1>
        <p className={styles.subtitle}>
          Encuentra tu próxima lectura o dale una nueva vida a los libros que ya
          no usas.
        </p>
        <div className={styles.actions}>
          <Link to="/books" className={styles.primaryBtn}>
            Explorar libros
          </Link>
          {user ? (
            <Link to="/books/new" className={styles.secondaryBtn}>
              Vender un libro
            </Link>
          ) : (
            <Link to="/register" className={styles.secondaryBtn}>
              Empieza gratis
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
