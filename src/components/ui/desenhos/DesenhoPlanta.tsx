export default function DesenhoPlanta() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Planta baixa da casa com sala e cozinha integradas, dois quartos, banheiro, fachada de vidro e varanda."
    >
      <defs>
        <pattern id="gr2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#E8DED0" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill="#F4EEE6" />
      <rect width="800" height="600" fill="url(#gr2)" />
      <rect
        x="150"
        y="430"
        width="500"
        height="70"
        fill="rgba(135,88,43,.07)"
        stroke="#87582B"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <g stroke="#211A12" fill="none" strokeLinecap="square">
        <path d="M150 430V130H650V430" strokeWidth="7" />
        <path d="M430 130V240M430 290V430M430 280H520M570 280H650M560 280V430" strokeWidth="4" />
        <path d="M150 426H650M150 434H650" strokeWidth="1.5" />
        <path d="M240 426v8M330 426v8M420 426v8M510 426v8M600 426v8" strokeWidth="1.5" />
        <path d="M430 240a50 50 0 0 1 -50 50" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M520 280a50 50 0 0 0 50 -50" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="170" y="148" width="190" height="26" strokeWidth="1.5" />
        <rect x="220" y="230" width="110" height="40" strokeWidth="1.5" />
        <rect x="190" y="330" width="150" height="56" rx="6" strokeWidth="1.5" />
        <rect x="590" y="300" width="44" height="32" rx="4" strokeWidth="1.5" />
        <rect x="460" y="150" width="120" height="90" strokeWidth="1.2" />
      </g>
      <g fontFamily="var(--font-rotulo)" fontSize="13" letterSpacing="2" fill="#5C5244">
        <text x="215" y="312">SALA · COZINHA</text>
        <text x="505" y="268">QUARTO</text>
        <text x="462" y="360">QUARTO</text>
        <text x="575" y="372" fontSize="11">BANHO</text>
        <text x="350" y="475" fill="#87582B">VARANDA</text>
      </g>
      <g stroke="#5C5244" strokeWidth="1">
        <path d="M150 92H650M150 84v16M650 84v16" />
        <path d="M108 130V430M100 130h16M100 430h16" />
      </g>
      <text x="372" y="80" fontFamily="var(--font-rotulo)" fontSize="13" fill="#211A12">
        12,40 m
      </text>
      <text
        x="96"
        y="292"
        fontFamily="var(--font-rotulo)"
        fontSize="13"
        fill="#211A12"
        transform="rotate(-90 96 292)"
      >
        7,20 m
      </text>
      <text x="150" y="560" fontFamily="var(--font-rotulo)" fontSize="12" letterSpacing="2" fill="#5C5244">
        PLANTA BAIXA · ESC. 1:100
      </text>
      <g transform="translate(730 520)">
        <path d="M0 -34 L12 10 L0 2 L-12 10 Z" fill="#211A12" />
        <text x="-5" y="32" fontFamily="var(--font-rotulo)" fontSize="14" fill="#211A12">
          N
        </text>
      </g>
    </svg>
  );
}
