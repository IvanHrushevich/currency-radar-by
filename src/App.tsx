import type { JSX } from "react";
import { NbrbUsdRateView } from "./components/NbrbUsdRateView";
import "./App.css";

function App(): JSX.Element {
  return (
    <main className="app">
      <NbrbUsdRateView />
    </main>
  );
}

export default App;
