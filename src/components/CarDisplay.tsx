import type { Car } from './carData';

// ─── React Topic: Props ───────────────────────────────────────────────────────
// Props (short for "properties") are the way a parent component passes data
// DOWN to a child component.
// Think of props like arguments to a function — the parent decides the values,
// the child just reads and displays them.
//
// Here we define a TypeScript interface to describe exactly which props
// this component expects. This gives us type-safety and autocompletion.
interface CarDisplayProps {
  // The car details fetched from the API (null if no car is selected yet)
  carDetails: Car | null;
  // Whether car details are currently being loaded from the API
  loading: boolean;
  // Any error message that occurred during fetch (null if no error)
  error: string | null;
}

// ─── React Topic: Functional Component receiving Props ────────────────────────
// We destructure the props object directly in the parameter list.
// This component now handles three different states: loading, error, and success.
function CarDisplay({ carDetails, loading, error }: CarDisplayProps) {
  // ─── React Topic: Conditional Rendering ────────────────────────────────────
  // React can render different UI based on current props.
  // We check loading first, then error, then finally render the car details.

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="w-full rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-800 flex items-center justify-center">
          <p className="text-white text-lg animate-pulse">Loading car details…</p>
        </div>
        <p className="text-center text-sm text-white opacity-70">Fetching information from server...</p>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="w-full rounded-xl overflow-hidden shadow-lg aspect-video bg-red-900 bg-opacity-20 border border-red-500 flex items-center justify-center p-4">
          <p className="text-red-400 text-center">⚠️ {error}</p>
        </div>
        <p className="text-center text-sm text-red-300">Failed to load car details. Please try again.</p>
      </div>
    );
  }

  // ── No car selected state ───────────────────────────────────────────────────
  if (!carDetails) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="w-full rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-800 flex items-center justify-center p-4">
          <p className="text-white text-center">👇 Click a thumbnail below to see car details</p>
        </div>
        <p className="text-center text-sm text-white opacity-70">Select a car to view its information</p>
      </div>
    );
  }

  // ── Success state: render car details ──────────────────────────────────────
  // When we have carDetails, we display the image and description.
  // The src attribute uses {} to embed the JavaScript expression for the image path.
  return (
    // Wrapper keeps the image and description together as one visual block.
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">

      {/* ── Main image ─────────────────────────────────────────────────────
          React Topic: Dynamic Attribute
          The src attribute uses {} to embed the JavaScript expression.
          We construct the full path to the image using the carDetails.image value.
          Every time the parent updates the prop, React re-renders this
          component and the new image appears automatically — no manual DOM
          manipulation needed. */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg aspect-video">
        <img
          className="w-full h-full object-contain"
          src={`/src/assets/imgs/${carDetails.image}`}
          alt={`${carDetails.model} preview`}
        />
      </div>

      {/* ── Description ────────────────────────────────────────────────────
          Same idea: {} embeds the description from carDetails into the paragraph.
          When the prop changes, the text updates too. */}
      <p className="text-center text-sm text-white">{carDetails.description}</p>

    </div>
  );
}

// ─── React Topic: Default Export ─────────────────────────────────────────────
// Exporting the component lets other files import and use it.
export default CarDisplay;
