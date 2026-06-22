export function ColorBlindnessFilters() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="protanopia">
          <feColorMatrix in="SourceGraphic" type="matrix" result="simulated"
            values="0.567,0.433,0,0,0
                    0.558,0.442,0,0,0
                    0,0.242,0.758,0,0
                    0,0,0,1,0" />
          <feComposite in="SourceGraphic" in2="simulated" operator="arithmetic"
            k1="0" k2="0.25" k3="0.75" k4="0" />
        </filter>
        <filter id="deuteranopia">
          <feColorMatrix in="SourceGraphic" type="matrix" result="simulated"
            values="0.625,0.375,0,0,0
                    0.7,0.3,0,0,0
                    0,0.3,0.7,0,0
                    0,0,0,1,0" />
          <feComposite in="SourceGraphic" in2="simulated" operator="arithmetic"
            k1="0" k2="0.25" k3="0.75" k4="0" />
        </filter>
        <filter id="tritanopia">
          <feColorMatrix in="SourceGraphic" type="matrix" result="simulated"
            values="0.95,0.05,0,0,0
                    0,0.433,0.567,0,0
                    0,0.475,0.525,0,0
                    0,0,0,1,0" />
          <feComposite in="SourceGraphic" in2="simulated" operator="arithmetic"
            k1="0" k2="0.25" k3="0.75" k4="0" />
        </filter>
        <filter id="achromatopsia">
          <feColorMatrix type="matrix"
            values="0.2126,0.7152,0.0722,0,0
                    0.2126,0.7152,0.0722,0,0
                    0.2126,0.7152,0.0722,0,0
                    0,0,0,1,0" />
        </filter>
      </defs>
    </svg>
  );
}
