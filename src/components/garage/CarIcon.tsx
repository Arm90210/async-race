interface CarIconProps {
  color: string;
  width?: number;
}

function CarIcon({ color, width = 80 }: CarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      width={width}
      height={width / 2}
      aria-label="car"
    >
      {/* body */}
      <path
        d="M10 35 Q2 35 2 28 L8 28 L18 15 Q20 12 25 12 L60 12 Q65 12 68 16 L82 28 L95 28 Q98 28 98 32 Q98 35 95 35 Z"
        fill={color}
      />
      {/* windshield */}
      <path d="M22 15 L30 15 L28 25 L18 25 Z" fill="rgba(200,220,255,0.5)" />
      <path d="M33 15 L55 15 Q58 15 60 18 L65 25 L30 25 Z" fill="rgba(200,220,255,0.4)" />
      {/* wheels */}
      <circle cx="25" cy="37" r="8" fill="#222" />
      <circle cx="25" cy="37" r="4" fill="#666" />
      <circle cx="75" cy="37" r="8" fill="#222" />
      <circle cx="75" cy="37" r="4" fill="#666" />
      {/* headlight */}
      <rect x="92" y="25" width="5" height="4" rx="1" fill="#ffdd44" />
    </svg>
  );
}

export default CarIcon;
