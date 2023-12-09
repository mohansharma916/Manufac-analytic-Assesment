import FlavanoidsStats from "./Components/FlavanoidStats/FlavanoidStats";
import GammaStats from "./Components/GammaStats/GammaStats";
import WineData from "./Dataset/Wine-Data.json";

function App() {
  return (
    <div className="App">
      <FlavanoidsStats data={WineData} />
      <GammaStats data={WineData} />
    </div>
  );
}

export default App;
