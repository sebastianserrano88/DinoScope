import { useEffect, useState } from "react";

function App() {
  const [dinosaurs, setDinosaurs] = useState([]);

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

  return (
    <div>
      <h1>DinoScope 🦖</h1>

      <h2>Dinosaurs from Flask:</h2>

      <ul>
        {dinosaurs.map((dinosaur) => (
          <li key={dinosaur}>{dinosaur}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;