import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config/api.js";
import useDebounce from "../../hooks/useDebounce.js";
import styles from "./MyBooks.module.css";

const STATUS_LABELS = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  CANCELLED: "Retirado",
};

function matchesFilters(book, query, genreId, status) {
  const normalizedQuery = query.trim().toLowerCase();
  const matchesQuery =
    !normalizedQuery ||
    book.title?.toLowerCase().includes(normalizedQuery) ||
    book.author?.toLowerCase().includes(normalizedQuery) ||
    book.isbn?.toLowerCase().includes(normalizedQuery);

  const matchesGenre = !genreId || String(book.genreId) === genreId;
  const matchesStatus = !status || book.status === status;

  return matchesQuery && matchesGenre && matchesStatus;
}

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState("");
  const [genreId, setGenreId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const load = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [booksRes, reservationsRes, favoritesRes, genresRes] =
          await Promise.all([
            fetch(`${API_URL}/api/books/mine`, { headers }),
            fetch(`${API_URL}/api/reservations/mine`, { headers }),
            fetch(`${API_URL}/api/favorites/mine`, { headers }),
            fetch(`${API_URL}/api/genres`),
          ]);

        if (!booksRes.ok || !reservationsRes.ok || !favoritesRes.ok) {
          throw new Error("Error del servidor");
        }

        setBooks(await booksRes.json());
        setReservations(await reservationsRes.json());
        setFavorites(await favoritesRes.json());
        setGenres(genresRes.ok ? await genresRes.json() : []);
      } catch {
        setError("No se pudieron cargar tus libros");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredBooks = useMemo(
    () => books.filter((book) => matchesFilters(book, debouncedQuery, genreId, status)),
    [books, debouncedQuery, genreId, status],
  );

  const filteredReservations = useMemo(
    () =>
      reservations.filter((reservation) =>
        matchesFilters(reservation.book, debouncedQuery, genreId, status),
      ),
    [reservations, debouncedQuery, genreId, status],
  );

  const filteredFavorites = useMemo(
    () =>
      favorites.filter((favorite) =>
        matchesFilters(favorite.book, debouncedQuery, genreId, status),
      ),
    [favorites, debouncedQuery, genreId, status],
  );

  async function handleRetire(id) {
    const confirmed = window.confirm("¿Seguro que quieres retirar este libro?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/api/books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("No se pudo retirar");

      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, status: "CANCELLED" } : book,
        ),
      );
    } catch {
      setError("No se pudo retirar el libro");
    }
  }

  async function handleDeleteBook(id) {
    const confirmed = window.confirm(
      "Si eliminas este libro, se quitara de la base de datos y tendras que darlo de alta nuevamente. Si prefieres retirarlo temporalmente de la venta, pulsa Cancelar aqui y usa el boton Retirar.",
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/api/books/${id}/permanent`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("No se pudo eliminar");

      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch {
      setError("No se pudo eliminar el libro");
    }
  }

  async function handleReactivate(id) {
    try {
      const res = await fetch(`${API_URL}/api/books/${id}/reactivate`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("No se pudo reactivar");

      const updated = await res.json();
      setBooks((prev) => prev.map((book) => (book.id === id ? updated : book)));
    } catch {
      setError("No se pudo reactivar el libro");
    }
  }

  async function handleRemoveReservation(id) {
    const confirmed = window.confirm(
      "¿Quieres quitar este libro de tus reservas?",
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("No se pudo quitar");

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id),
      );
    } catch {
      setError("No se pudo quitar la reserva");
    }
  }

  async function handleRemoveFavorite(bookId) {
    try {
      const res = await fetch(`${API_URL}/api/favorites/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("No se pudo quitar");

      setFavorites((prev) =>
        prev.filter((favorite) => favorite.bookId !== bookId),
      );
    } catch {
      setError("No se pudo quitar el favorito");
    }
  }

  if (loading) return <p className={styles.message}>Cargando tus libros...</p>;
  if (error) return <p className={styles.message}>{error}</p>;

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Mis libros</h1>
      </div>

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
          <option value="">Todos los estados</option>
          <option value="AVAILABLE">Disponibles</option>
          <option value="RESERVED">Reservados</option>
          <option value="CANCELLED">Retirados</option>
        </select>
      </div>

      <section className={styles.section}>
        <h2>Libros puestos a la venta</h2>
        <BookTable
          emptyMessage="No hay libros publicados con esos filtros."
          rows={filteredBooks}
          renderActions={(book) => (
            <>
              <Link to={`/books/${book.id}/edit`}>Editar</Link>
              {book.status !== "CANCELLED" ? (
                <button
                  className={styles.cancelBtn}
                  onClick={() => handleRetire(book.id)}
                >
                  Retirar
                </button>
              ) : (
                <button
                  className={styles.reactivateBtn}
                  onClick={() => handleReactivate(book.id)}
                >
                  Reactivar
                </button>
              )}
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteBook(book.id)}
              >
                Eliminar
              </button>
            </>
          )}
        />
      </section>

      <section className={styles.section}>
        <h2>Libros reservados</h2>
        <BookTable
          emptyMessage="No hay reservas con esos filtros."
          rows={filteredReservations.map((reservation) => ({
            ...reservation.book,
            reservationId: reservation.id,
          }))}
          renderActions={(book) => (
            <>
              <Link to={`/books/${book.id}`}>Ver</Link>
              <button
                className={styles.deleteBtn}
                onClick={() => handleRemoveReservation(book.reservationId)}
              >
                Quitar reserva
              </button>
            </>
          )}
        />
      </section>

      <section className={styles.section}>
        <h2>Mis favoritos</h2>
        <BookTable
          emptyMessage="No hay favoritos con esos filtros."
          rows={filteredFavorites.map((favorite) => favorite.book)}
          renderActions={(book) => (
            <>
              <Link to={`/books/${book.id}`}>Ver</Link>
              <button
                className={styles.deleteBtn}
                onClick={() => handleRemoveFavorite(book.id)}
              >
                Quitar de favoritos
              </button>
            </>
          )}
        />
      </section>
    </main>
  );
}

function BookTable({ emptyMessage, rows, renderActions }) {
  if (rows.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Autor</th>
          <th>Genero</th>
          <th>Estado</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((book) => (
          <tr
            key={`${book.id}-${book.reservationId || "book"}`}
            className={book.status === "CANCELLED" ? styles.cancelled : ""}
          >
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre?.name}</td>
            <td>{STATUS_LABELS[book.status] || book.status}</td>
            <td>{book.price} EUR</td>
            <td className={styles.actions}>{renderActions(book)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
