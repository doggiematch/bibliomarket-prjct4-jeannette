import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config/api.js";
import styles from "./BookList.module.css";

const CONDITION_LABELS = {
  ComoNuevo: "COMO NUEVO",
  BuenEstado: "BUEN ESTADO",
  Aceptable: "ACEPTABLE",
  ConDefectos: "CON DEFECTOS",
  MuyBueno: "BUEN ESTADO",
  Bueno: "BUEN ESTADO",
  LIKE_NEW: "COMO NUEVO",
  like_new: "COMO NUEVO",
  GOOD: "BUEN ESTADO",
  good: "BUEN ESTADO",
  ACCEPTABLE: "ACEPTABLE",
  acceptable: "ACEPTABLE",
  POOR: "CON DEFECTOS",
  poor: "CON DEFECTOS",
};

const CONDITION_CLASSES = {
  ComoNuevo: styles.comoNuevo,
  BuenEstado: styles.buenEstado,
  Aceptable: styles.aceptable,
  ConDefectos: styles.conDefectos,
  MuyBueno: styles.buenEstado,
  Bueno: styles.buenEstado,
  LIKE_NEW: styles.comoNuevo,
  like_new: styles.comoNuevo,
  GOOD: styles.buenEstado,
  good: styles.buenEstado,
  ACCEPTABLE: styles.aceptable,
  acceptable: styles.aceptable,
  POOR: styles.conDefectos,
  poor: styles.conDefectos,
};

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setError("Error al cargar los libros"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.message}>Cargando libros...</p>;
  if (error) return <p className={styles.message}>{error}</p>;
  if (books.length === 0)
    return <p className={styles.message}>No hay libros disponibles.</p>;

  return (
    <main className={styles.container}>
      <h1>Libros disponibles</h1>
      <div className={styles.grid}>
        {books.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id} className={styles.card}>
            <div className={styles.cardBody}>
              <h2 className={styles.title}>{book.title}</h2>
              <p className={styles.author}>{book.author}</p>
              <p className={styles.genre}>{book.genre?.name}</p>
              <div className={styles.footer}>
                <span className={styles.price}>{book.price} €</span>
                <span
                  className={`${styles.condition} ${
                    CONDITION_CLASSES[book.condition] || styles.buenEstado
                  }`}
                >
                  {CONDITION_LABELS[book.condition] || "No especificado"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
