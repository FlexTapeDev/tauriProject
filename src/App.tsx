import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [_greetMsg, _setGreetMsg] = useState("");
  const [_name, _setName] = useState("");
  const [_input, _setInput] = useState("");
  const [_tauritestcommandMsg, _setTauritestcommandMsg] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  // async function tauritestcommand() {
  //   setTauritestcommandMsg(await invoke("tauritestcommand", { input }));
  // }

  async function random_image() {
    setImageUrl(await invoke("random_image"));
  }

  return (
    <main className="container">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          // greet();
          // tauritestcommand();
          random_image();
        }}
      >
        <button type="submit">Generate</button>
      </form>
      <img src={imageUrl} alt="Random Dog Image" />
    </main>
  );
}

export default App;
