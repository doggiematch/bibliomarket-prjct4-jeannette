import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config/api.js";
import useDebounce from "../../hooks/useDebounce.js";
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
  const [genres, setGenres] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [query, setQuery] = useState("");
  const [genreId, setGenreId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    fetch(`${API_URL}/api/genres`)
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch(() => setGenres([]));

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/api/favorites/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => setFavoriteIds(data.map((favorite) => favorite.bookId)))
        .catch(() => setFavoriteIds([]));
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (debouncedQuery.trim()) params.set("q", debouncedQuery.trim());
        if (genreId) params.set("genreId", genreId);
        if (status) params.set("status", status);

        const url = `${API_URL}/api/books${
          params.toString() ? `?${params}` : ""
        }`;
        const token = localStorage.getItem("token");
        const res = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Error del servidor");
        const data = await res.json();
        setBooks(data);
      } catch {
        setError("Error al cargar los libros");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [debouncedQuery, genreId, status]);

  const handleAddFavorite = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Inicia sesion para guardar favoritos");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/favorites/${bookId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("No se pudo guardar el favorito");

      setFavoriteIds((prev) =>
        prev.includes(bookId) ? prev : [...prev, bookId],
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <h1>Consultar libros</h1>
      <div className={styles.filters}>
        <input
          type="search"
          placeholder="Buscar por titulo, autor o ISBN"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
          <option value="">Todos los generos</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Disponibles y reservados</option>
          <option value="AVAILABLE">Solo disponibles</option>
          <option value="RESERVED">Solo reservados</option>
        </select>
      </div>

      {error ? (
        <p className={styles.message}>{error}</p>
      ) : loading ? (
        <p className={styles.message}>Cargando libros...</p>
      ) : books.length === 0 ? (
        <p className={styles.message}>No hay libros con esos filtros.</p>
      ) : (
        <div className={styles.grid}>
          {books.map((book) => (
            <article key={book.id} className={styles.card}>
              <Link to={`/books/${book.id}`} className={styles.cardLink}>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.title}>{book.title}</h2>
                    <span
                      className={`${styles.status} ${
                        book.status === "RESERVED"
                          ? styles.reserved
                          : styles.available
                      }`}
                    >
                      {book.status === "RESERVED" ? "Reservado" : "Disponible"}
                    </span>
                  </div>
                  <p className={styles.author}>{book.author}</p>
                  <p className={styles.genre}>{book.genre?.name}</p>
                  {book.isbn && (
                    <p className={styles.isbn}>ISBN {book.isbn}</p>
                  )}
                  <div className={styles.footer}>
                    <span className={styles.price}>{book.price} EUR</span>
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
              <button
                type="button"
                className={styles.favoriteBtn}
                onClick={() => handleAddFavorite(book.id)}
                disabled={favoriteIds.includes(book.id)}
              >
                {favoriteIds.includes(book.id) ? "En favoritos" : "Favorito"}
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
