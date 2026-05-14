const OPEN_LIBRARY_URL = "https://openlibrary.org";
const OPEN_LIBRARY_SEARCH_URL = `${OPEN_LIBRARY_URL}/search.json`;

const normalizeDescription = (description) => {
  if (!description) return "";
  if (typeof description === "string") return description;
  return description.value || "";
};

const getWorkSynopsis = async (key) => {
  if (!key) return "";

  const workPath = key.startsWith("/") ? key : `/works/${key}`;
  const response = await fetch(`${OPEN_LIBRARY_URL}${workPath}.json`);

  if (!response.ok) return "";

  const data = await response.json();
  return normalizeDescription(data.description);
};

export const searchOpenLibraryBooks = async (req, res, next) => {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.json([]);
    }

    const params = new URLSearchParams({
      q: query,
      limit: "5",
      fields:
        "key,title,author_name,first_publish_year,isbn,cover_i,language,subject",
    });

    const url = `${OPEN_LIBRARY_SEARCH_URL}?${params}`;
    console.log(`[Open Library] Searching: ${url}`);

    const response = await fetch(url);
    console.log(`[Open Library] Response status: ${response.status}`);

    if (!response.ok) {
      const error = new Error("No se pudo consultar Open Library");
      error.statusCode = response.status;
      throw error;
    }

    const data = await response.json();
    const docs = data.docs || [];
    const books = await Promise.all(
      docs.map(async (book) => ({
        ...book,
        synopsis: await getWorkSynopsis(book.key),
      })),
    );

    console.log(`[Open Library] Results found: ${books.length}`);
    res.json(books);
  } catch (err) {
    next(err);
  }
};
