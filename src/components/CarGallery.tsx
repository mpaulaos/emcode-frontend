import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import type { Car } from './carData';
import CarThumbnail from './CarThumbnail';

// ─── React Topic: Props ───────────────────────────────────────────────────────
// CarGallery receives the car list from its parent (App) and a callback
// to notify App when the user picks a car.
interface CarGalleryProps {
  // The full list of cars to show as thumbnails (data flowing DOWN)
  cars: Car[];
  // Callback: tells the parent which car ID was selected (event flowing UP)
  onCarSelect: (carId: number) => void;
}

// ─── React Topic: Local State vs Lifted State ────────────────────────────────
// Not every piece of state needs to live in the top-level App component.
// `swiperInstance` is only needed inside CarGallery (to control prev/next),
// so we keep it here as LOCAL state — this keeps App.tsx cleaner.
//
// The SELECTED CAR state, on the other hand, is needed by CarDisplay too,
// so it lives in App (the closest common ancestor). That is called
// "lifting state up".
function CarGallery({ cars, onCarSelect }: CarGalleryProps) {
  // ─── React Topic: useState for a non-primitive value ─────────────────────
  // swiperInstance holds a reference to the Swiper control object (or null
  // before Swiper has mounted). We type it as SwiperType | null to be explicit.
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    // Wrapper: aligns the prev/next buttons with the carousel
    <div className="flex items-center gap-2 max-w-sm w-full">

      {/* ── Previous button ──────────────────────────────────────────────────
          React Topic: Optional chaining (?.)
          swiperInstance might be null while Swiper is loading, so we use ?.
          to safely call slidePrev() only when the instance exists. */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className="text-white text-2xl px-1 shrink-0"
      >
        &#8249;
      </button>

      {/* ── Swiper carousel ──────────────────────────────────────────────── */}
      {/* React Topic: Library props vs CSS classes
          Swiper manages its own internal flexbox layout inside .swiper-wrapper.
          Adding flex/gap/overflow classes directly to <Swiper> fights that CSS.
          Use Swiper's own `spaceBetween` prop for spacing between slides instead. */}
      <Swiper
        className="w-full"
        slidesPerView={3}
        spaceBetween={8}
        // ── React Topic: Callback prop from a library ───────────────────
        // onSwiper fires once when Swiper finishes initialising and gives us
        // the instance. We store it in local state so the buttons can use it.
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {/* ── React Topic: List Rendering with .map() ──────────────────────
            .map() transforms the `cars` array into an array of JSX elements.
            React renders each element as a thumbnail slide.

            React Topic: key prop
            Every element in a list needs a unique `key`. React uses it to
            track which items changed between renders for efficient updates.
            We set key here (the parent) because SwiperSlide is rendered
            inside CarThumbnail — the key must be on the outermost element
            returned by the mapping expression.

            React Topic: Passing a callback as a prop
            We hand `onCarSelect` down to each CarThumbnail as `onSelect`.
            The thumbnail will call it when clicked, bubbling the event back
            up through CarGallery → App. */}
        {/* ── React Topic: SwiperSlide must be a direct child of Swiper ────
            Swiper scans its immediate JSX children looking for SwiperSlide
            elements to build the carousel. If SwiperSlide is hidden inside
            a custom component, Swiper cannot find it and the layout breaks.
            Solution: keep SwiperSlide here in the .map(), and put only the
            visual content inside CarThumbnail. */}
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <CarThumbnail
              car={car}
              isSelected={car.id === selectedId}
              onSelect={(carId) => {
                setSelectedId(carId);
                onCarSelect(carId);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Next button ──────────────────────────────────────────────────── */}
      <button
        onClick={() => swiperInstance?.slideNext()}
        className="text-white text-2xl px-1 shrink-0"
      >
        &#8250;
      </button>

    </div>
  );
}

// ─── React Topic: Default Export ─────────────────────────────────────────────
export default CarGallery;
