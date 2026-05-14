import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import API_URL from "../../config/api.js";
import styles from "./BookDetail.module.css";

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

export default function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reserving, setReserving] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [favoriteAdded, setFavoriteAdded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/books/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch(() => setError("Error al cargar el libro"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleReserve = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setReserving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: book.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReserved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setReserving(false);
    }
  };

  const handleAddFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/favorites/${book.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFavoriteAdded(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className={styles.message}>Cargando libro...</p>;
  if (error) return <p className={styles.message}>{error}</p>;
  if (!book) return <p className={styles.message}>Libro no encontrado.</p>;

  const isOwner = user?.id === book.userId;

  return (
    <main className={styles.container}>
      <button className={styles.back} onClick={() => navigate("/books")}>
        ← Volver
      </button>
      <div className={styles.card}>
        <div className={styles.info}>
          <span className={styles.genre}>{book.genre?.name}</span>
          <h1>{book.title}</h1>
          <p className={styles.author}>{book.author}</p>
          {book.synopsis && (
            <section className={styles.textBlock}>
              <h2>Sinopsis</h2>
              <p>{book.synopsis}</p>
            </section>
          )}
          <section className={styles.textBlock}>
            <h2>Estado del ejemplar</h2>
            <p>{book.description}</p>
          </section>
          <div className={styles.meta}>
            <span>
              Condición:{" "}
              <strong>
                {CONDITION_LABELS[book.condition] || "No especificado"}
              </strong>
            </span>
            {book.year && (
              <span>
                Año: <strong>{book.year}</strong>
              </span>
            )}
            <span>
              Idioma: <strong>{book.language}</strong>
            </span>
            <span>
              Vendedor: <strong>{book.user?.name}</strong>
            </span>
          </div>
          <div className={styles.footer}>
            <span className={styles.price}>{book.price} €</span>
            {!isOwner &&
              book.status === "AVAILABLE" &&
              (reserved ? (
                <span className={styles.success}>Reservado</span>
              ) : (
                <button
                  className={styles.btnReserve}
                  onClick={handleReserve}
                  disabled={reserving}
                >
                  {reserving ? "Reservando..." : "Reservar"}
                </button>
              ))}
            {isOwner && (
              <button
                className={styles.btnEdit}
                onClick={() => navigate(`/books/${book.id}/edit`)}
              >
                Editar
              </button>
            )}
            {!isOwner && (
              <button
                className={styles.btnFavorite}
                onClick={handleAddFavorite}
                disabled={favoriteAdded}
              >
                {favoriteAdded ? "En favoritos" : "Favorito"}
              </button>
            )}
          </div>
        </div>
      </div>
      {book.status === "RESERVED" && (
        <div className={styles.messageSellerActions}>
          <button type="button" className={styles.btnMessageSeller}>
            Mensaje a vendedor
          </button>
        </div>
      )}
    </main>
  );
}
