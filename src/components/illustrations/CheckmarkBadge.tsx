const CheckmarkBadge = () => {
  return (
    <g>
      {/* Success Circle Background */}
      <circle
        cx="400"
        cy="370"
        r="35"
        fill="currentColor"
        className="text-success"
      />
      
      {/* Checkmark */}
      <path
        d="M 385 370 L 395 380 L 415 360"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

export default CheckmarkBadge;

