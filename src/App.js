import { BrowserRouter, Route, Routes } from "react-router-dom";
import City from "./components/City";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <main className="h-screen flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <WeatherProvider current={true}>
                <City />
              </WeatherProvider>
            }
          />
          <Route
            path="/:city_name"
            element={
              <WeatherProvider current={false}>
                <City />
              </WeatherProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
