import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/books`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setError("No se pudieron cargar los libros"))
      .finally(() => setLoading(false));
  }, []);

  async function handleCancel(id) {
    const confirmed = window.confirm(
      "¿Seguro que quieres cancelar este libro?",
    );
    if (!confirmed) return;

    const res = await fetch(`${API_URL}/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (res.ok) {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, status: "CANCELLED" } : book,
        ),
      );
    }
  }

  if (loading) return <p className={styles.message}>Cargando libros...</p>;
  if (error) return <p className={styles.message}>{error}</p>;

  return (
    <main className={styles.dashboard}>
      <h1 className={styles.title}>Panel de administración</h1>
      <p className={styles.subtitle}>Gestión de libros — {user?.name}</p>

      {books.length === 0 ? (
        <p className={styles.message}>No hay libros registrados.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Estado</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className={book.status === "CANCELLED" ? styles.cancelled : ""}
              >
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
                <td>{book.price} €</td>
                <td>
                  {book.status !== "CANCELLED" && (
                    <button
                      onClick={() => handleCancel(book.id)}
                      className={styles.cancelBtn}
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
