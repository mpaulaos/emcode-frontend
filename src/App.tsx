import "swiper/swiper-bundle.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  // ─── React Topic: Custom Hook call ───────────────────────────────────────
  // useCarData() encapsulates the fetch logic. Every time the fetch state
  // changes (loading → success or error) React re-renders App automatically.
  const { cars, loading, error } = useCarData();

  // ─── React Topic: useState Hook ────────────────────────────────────────────
  // Instead of storing the image and description directly, we store the ID
  // of the selected car. When the ID changes, useCarDetails will automatically
  // fetch the detailed information for that car.
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  // ─── React Topic: Dependent Hook Call ──────────────────────────────────────
  // useCarDetails accepts selectedCarId and fetches car details whenever it changes.
  // When selectedCarId is null (initial state), no fetch happens.
  // When a user clicks a thumbnail, selectedCarId updates and triggers a fetch.
  const { carDetails, loading: detailsLoading, error: detailsError } = useCarDetails(selectedCarId);

  // ─── React Topic: Handler Function ───────────────────────────────────────
  // Instead of receiving image and description, we now receive just the car ID.
  // Setting the ID triggers useCarDetails to fetch the full car information.
  //
  // Data flow summary:
  //   App (state)  ──props──▶  CarDisplay   (reads carDetails, loading, error)
  //   App (state)  ──props──▶  CarGallery   (reads cars list, receives onCarSelect)
  //        CarGallery          ──props──▶   CarThumbnail  (receives onSelect callback)
  //        CarThumbnail click  ──calls──▶   handleCarSelect  (updates App state)
  //        App state change    ──triggers── useCarDetails to fetch car details
  //        useCarDetails       ──returns──▶ carDetails to CarDisplay
  const handleCarSelect = (carId: number) => {
    setSelectedCarId(carId);
  };

  // ─── React Topic: Conditional Rendering ──────────────────────────────────
  // React can render different UI based on the current state.
  // While the fetch is in-flight we show a spinner; if it fails we show an
  // error message. Only when data is ready do we render the full gallery.
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">Loading cars…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );
  }

  // ─── React Topic: JSX return ─────────────────────────────────────────────
  // App composes the two child components and wires them together:
  //   • CarDisplay receives the current image and description as props.
  //   • CarGallery receives the car list and the handler callback as props.
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-100 text-neutral-900">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
