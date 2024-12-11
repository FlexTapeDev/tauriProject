import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [animalType, setAnimalType] = useState("dog");

  async function random_image() {
    setImageUrl(await invoke("random_image", { animalType }));
  }

  return (
    <main className="container">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          random_image();
        }}
      >
        <select 
          value={animalType} 
          onChange={(e) => setAnimalType(e.target.value)}
          className="animal-select"
        >
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
        </select>
        <button type="submit">Generate</button>
      </form>
      <img src={imageUrl} alt={`Random ${animalType} Image`} />
    </main>
  );
}

export default App;
