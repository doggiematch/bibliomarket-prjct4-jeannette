import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../config/api.js";
import styles from "./BookForm.module.css";

const CONDITIONS = ["ComoNuevo", "BuenEstado", "Aceptable", "ConDefectos"];

const CONDITION_LABELS = {
  ComoNuevo: "Como nuevo",
  BuenEstado: "Buen estado",
  Aceptable: "Aceptable",
  ConDefectos: "Con defectos",
};

const EMPTY_FORM = {
  title: "",
  author: "",
  price: "",
  condition: "BuenEstado",
  genreId: "",
  synopsis: "",
  description: "",
  language: "",
  isbn: "",
  coverUrl: "",
  year: "",
};

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [searching, setSearching] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/genres`)
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  useEffect(() => {
    if (!isEditing) return;

    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setForm({
          title: data.title || "",
          author: data.author || "",
          price: data.price || "",
          condition: data.condition || "BuenEstado",
          genreId: data.genreId || "",
          synopsis: data.synopsis || "",
          description: data.description || "",
          language: data.language || "",
          isbn: data.isbn || "",
          coverUrl: data.coverUrl || "",
          year: data.year || "",
        }),
      );
  }, [id, isEditing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setSearchQuery("");
    setSearchResults([]);
    setSearchMessage("");
    setError(null);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchResults([]);
    setSearchMessage("");
    setError(null);

    try {
      const url = `${API_URL}/api/open-library/search?q=${encodeURIComponent(
        searchQuery,
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSearchResults(data);
      if (data.length === 0) {
        setSearchMessage("No se encontraron resultados");
      }
    } catch (err) {
      setError(err.message || "No se pudo buscar en Open Library");
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    const body = {
      ...form,
      price: parseFloat(form.price),
      genreId: parseInt(form.genreId),
      year: form.year ? parseInt(form.year) : undefined,
      isbn: form.isbn || undefined,
      coverUrl: form.coverUrl || undefined,
      synopsis: form.synopsis || undefined,
    };

    try {
      const res = await fetch(
        isEditing ? `${API_URL}/api/books/${id}` : `${API_URL}/api/books`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      navigate(`/books/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1>{isEditing ? "Editar libro" : "Publicar libro"}</h1>
      {!isEditing && (
        <div className={styles.search}>
          <input
            placeholder="Busca por titulo, autor o ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button type="button" onClick={handleSearch} disabled={searching}>
            {searching ? "Buscando..." : "Buscar"}
          </button>
          {searching && (
            <p className={styles.searchStatus} role="status">
              Buscando en Open Library, puede tardar unos segundos...
            </p>
          )}
          {searchResults.length > 0 && (
            <ul className={styles.searchResults}>
              {searchResults.map((book, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setForm({
                      ...form,
                      title: book.title || "",
                      author: book.author_name?.[0] || "",
                      year: book.first_publish_year || "",
                      isbn: book.isbn?.[0] || "",
                      language: book.language?.[0] || "",
                      synopsis: book.synopsis || "",
                      coverUrl: book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : "",
                    });
                    setSearchResults([]);
                    setSearchMessage("");
                    setSearchQuery("");
                  }}
                >
                  <strong>{book.title}</strong>
                  <span>
                    {book.author_name?.[0]}{" "}
                    {book.first_publish_year
                      ? `(${book.first_publish_year})`
                      : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {searchMessage && (
            <p className={styles.searchMessage}>{searchMessage}</p>
          )}
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Titulo
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            minLength={5}
          />
        </label>
        <label>
          Autor
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            minLength={2}
          />
        </label>
        <label>
          Precio (EUR)
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Condicion
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {CONDITION_LABELS[c]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Genero
          <select
            name="genreId"
            value={form.genreId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un genero</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sinopsis (opcional)
          <textarea
            name="synopsis"
            value={form.synopsis}
            onChange={handleChange}
            rows={4}
          />
        </label>
        <label>
          Descripcion del ejemplar / estado fisico
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            minLength={20}
            rows={4}
          />
        </label>
        <label>
          Idioma
          <input
            name="language"
            value={form.language}
            onChange={handleChange}
            required
            minLength={2}
          />
        </label>
        <label>
          ISBN (opcional)
          <input name="isbn" value={form.isbn} onChange={handleChange} />
        </label>
        <label>
          URL portada (opcional)
          <div className={styles.coverUrlRow}>
            <input
              name="coverUrl"
              type="url"
              value={form.coverUrl}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowCoverModal(true)}
              disabled={!form.coverUrl.trim()}
            >
              Ver imagen
            </button>
          </div>
        </label>
        <label>
          Año (opcional)
          <input
            name="year"
            type="number"
            min="1000"
            max={new Date().getFullYear()}
            value={form.year}
            onChange={handleChange}
          />
        </label>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={() => navigate("/books")}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={handleClear}
          >
            Limpiar
          </button>
          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Publicar"}
          </button>
        </div>
      </form>

      {showCoverModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Vista previa de portada"
          onClick={() => setShowCoverModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowCoverModal(false)}
            >
              Cerrar
            </button>
            <img src={form.coverUrl} alt="Vista previa de portada" />
          </div>
        </div>
      )}
    </main>
  );
}
