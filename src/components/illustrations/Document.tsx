const Document = () => {
  return (
    <g>
      {/* Document Paper Background */}
      <rect
        x="120"
        y="80"
        width="260"
        height="340"
        rx="8"
        fill="currentColor"
        className="text-card"
      />
      <rect
        x="120"
        y="80"
        width="260"
        height="340"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-border"
      />

      {/* Document Header Line (Bold) */}
      <line
        x1="150"
        y1="120"
        x2="280"
        y2="120"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-primary"
      />
      
      {/* Document Content Lines */}
      <line
        x1="150"
        y1="150"
        x2="350"
        y2="150"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-muted-foreground opacity-30"
      />
      <line
        x1="150"
        y1="170"
        x2="340"
        y2="170"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-muted-foreground opacity-30"
      />
      
      {/* Section Header (Bold) */}
      <line
        x1="150"
        y1="210"
        x2="280"
        y2="210"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-primary"
      />
      
      {/* More Content Lines */}
      <line
        x1="150"
        y1="240"
        x2="350"
        y2="240"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-muted-foreground opacity-30"
      />
      <line
        x1="150"
        y1="260"
        x2="320"
        y2="260"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-muted-foreground opacity-30"
      />
      <line
        x1="150"
        y1="280"
        x2="340"
        y2="280"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-muted-foreground opacity-30"
      />
      
      {/* Section Header (Bold) */}
      <line
        x1="150"
        y1="320"
        x2="280"
        y2="320"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-primary"
      />
      
      {/* Final Content Lines */}
      <line
        x1="150"
        y1="350"
        x2="350"
        y2="350"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-muted-foreground opacity-30"
      />
      <line
        x1="150"
        y1="370"
        x2="310"
        y2="370"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-muted-foreground opacity-30"
      />
    </g>
  );
};

export default Document;

