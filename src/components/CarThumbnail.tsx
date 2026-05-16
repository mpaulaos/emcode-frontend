import type { Car } from './carData';

// ─── React Topic: Callback Props (Child → Parent communication) ───────────────
// Props can also be functions, not just data values.
// When a child component calls a function prop, it is sending information
// UP to the parent — this is the standard React pattern for child-to-parent
// communication.
//
// Here, `onSelect` is a function the PARENT provides.
// When the user clicks this thumbnail, the child calls onSelect and passes
// the car data up to the parent.
//
// Note: CarThumbnail renders only the INNER content of the slide.
// SwiperSlide is rendered by CarGallery (the parent) because Swiper requires
// SwiperSlide to be a DIRECT JSX child of Swiper — wrapping it inside a
// custom component breaks Swiper's internal slide detection.
interface CarThumbnailProps {
  // The car object this thumbnail represents (data flowing DOWN)
  car: Car;
  // Whether this thumbnail is currently selected
  isSelected: boolean;
  // A callback function the parent gives us (event flowing UP when called)
  // Receives the car ID so the parent can fetch detailed information.
  onSelect: (carId: number) => void;
}
  

// ─── React Topic: Functional Component ───────────────────────────────────────
// CarThumbnail renders the inner content of one thumbnail.
// The SwiperSlide wrapper is intentionally kept in CarGallery.
function CarThumbnail({ car, isSelected, onSelect }: CarThumbnailProps) {

  return (
    // ── React Topic: Event Handler ──────────────────────────────────────
    // onClick fires when the user clicks this element.
    // We call the `onSelect` callback and pass this car's ID UP
    // to the parent so it can fetch detailed information from the API.
    <div
      onClick={() => onSelect(car.id)}
      className={`w-full h-16 rounded-lg overflow-hidden border-2 cursor-pointer flex items-center justify-center bg-linear-to-r from-blue-800 to-indigo-900 ${isSelected ? 'border-white' : 'border-transparent'}`}
    >
      {/* ── React Topic: Rendering a prop value with {} ───────────────────
          We display car.model, which came down from the parent as a prop.
          Curly braces {} let us embed any JavaScript expression in JSX. */}
      <h3 className="text-xs font-primary text-havelock-blue-50 text-center px-1">
        {car.model}
      </h3>
    </div>
  );
}

// ─── React Topic: Default Export ─────────────────────────────────────────────
export default CarThumbnail;
