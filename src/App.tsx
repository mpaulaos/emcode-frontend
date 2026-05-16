// Import Swiper styles globally — done here so they apply to all Swiper components
import 'swiper/swiper-bundle.css';

// ─── React Topic: Named Import ────────────────────────────────────────────────
// We import only the hook we need (useState) from the React library.
// Hooks are special functions that let us add React features (like state) to a
// functional component.
import { useState } from 'react';
import './App.css';

// ─── React Topic: Importing Components ───────────────────────────────────────
// Each component lives in its own file under src/components/.
// We import them here so App can compose them together into one UI.
import CarDisplay from './components/CarDisplay';
import CarGallery from './components/CarGallery';

// ─── React Topic: Custom Hook (fetch version) ────────────────────────────────
// Instead of importing a static array, we call useCarData() which fetches
// /cars.json at runtime. It returns { cars, loading, error } so the UI can
// react to each data-loading state.
import { useCarData } from './hooks/useCarData';
import { useCarDetails } from './hooks/useCarDetails';

// ─── React Topic: Lifting State Up ───────────────────────────────────────────
// App is the "closest common ancestor" of CarDisplay and CarGallery.
// Both components need to know which car is selected:
//   • CarDisplay needs it to show the right image and description.
//   • CarGallery triggers the change when a thumbnail is clicked.
//
// Because they need to SHARE this value, we store it HERE in App and pass
// it down as props — this pattern is called "lifting state up".
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
    // Fragment <> </> lets us return multiple elements without an extra DOM node.
    <>
      {/* Page background and centering container */}
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 gap-6">

        {/* ── CarDisplay ─────────────────────────────────────────────────────
            Props passed DOWN to the child:
              carDetails      → the fetched car data (or null if none selected)
              loading         → whether the details are currently being fetched
              error           → any error that occurred during fetch
            CarDisplay is a "presentational" component: it renders based on
            what it receives and handles loading and error states. */}
        <CarDisplay
          carDetails={carDetails}
          loading={detailsLoading}
          error={detailsError}
        />

        {/* ── CarGallery ─────────────────────────────────────────────────────
            Props passed DOWN to the child:
              cars        → the data list fetched from /cars.json
              onCarSelect → the callback CarGallery will call on user click
            When a thumbnail is clicked, handleCarSelect runs, App state updates,
            and CarDisplay automatically re-renders with the new values. */}
        <CarGallery
          cars={cars}
          onCarSelect={handleCarSelect}
        />

      </div>
    </>
  );
}

// ─── React Topic: Default Export ─────────────────────────────────────────────
// We export App so main.tsx can import it and render it as the root component.
export default App;