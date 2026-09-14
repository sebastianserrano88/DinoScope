import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dinosaurs, setDinosaurs] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dinosaurs")
      .then((response) => response.json())
      .then((data) => {
        setDinosaurs(data.dinosaurs);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
      });
  }, []);

  function searchDinosaur() {
    if (!search.trim()) {
      return;
    }

    fetch(
      `http://127.0.0.1:5000/api/search?query=${encodeURIComponent(search)}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error("Search error:", error);
      });
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🦖 DinoScope</h1>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Leaderboard</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <h2>Explore the prehistoric world.</h2>

          <p>
            Discover dinosaurs, learn about their history, and see what the
            DinoScope community is searching for.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for a dinosaur..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button onClick={searchDinosaur}>Search</button>
          </div>
        </section>

        {result && (
          <section className="search-result">
            {result.error ? (
              <h2>{result.error}</h2>
            ) : (
              <div>
                <h2>{result.name}</h2>

                <p>
                  <strong>Period:</strong> {result.period}
                </p>

                <p>
                  <strong>Diet:</strong> {result.diet}
                </p>

                <p>
                  <strong>Location:</strong> {result.location}
                </p>
              </div>
            )}
          </section>
        )}

        <section className="dinosaur-section">
          <h2>🦖 Dinosaurs</h2>

          <div className="dinosaur-grid">
              {dinosaurs.map((dinosaur) => (
                <div className="dinosaur-card" key={dinosaur.name}>
                  <div className="dinosaur-image">
                    🦖
                  </div>

                  <h3>{dinosaur.name}</h3>

                  <p>
                    <strong>Period:</strong> {dinosaur.period}
                  </p>

                  <p>
                    <strong>Diet:</strong> {dinosaur.diet}
                  </p>

                  <p>
                    <strong>Location:</strong> {dinosaur.location}
                  </p>

                  <button
                    onClick={() => {
                      setSearch(dinosaur.name);

                      fetch(
                        `http://127.0.0.1:5000/api/search?query=${encodeURIComponent(
                          dinosaur.name
                        )}`
                      )
                        .then((response) => response.json())
                        .then((data) => setResult(data));
                    }}
                  >
                    Explore
                  </button>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;