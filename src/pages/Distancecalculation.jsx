import React, { useState, useEffect } from "react";

const asteroids = [
  { name: "Alpha", x: 0, y: -3.2 },
  { name: "Beta", x: 3.5, y: 2 },
  { name: "Gamma", x: -4.5, y: 4 },
];

const calculateDistance = (x, y) => Math.sqrt(x * x + y * y);

const RadarDisplay = ({ asteroids, closestAsteroid }) => {
  const width = 300;
  const height = 300;
  const center = { x: width / 2, y: height / 2 };
  const radarRadius = 120;

  // Scale asteroid positions to fit within the radar circle.
  const distances = asteroids.map(ast => calculateDistance(ast.x, ast.y));
  const maxDistance = Math.max(...distances);
  const scale = (radarRadius * 0.9) / maxDistance;

  return (
    <svg width={width} height={height} className="bg-black rounded">
      {/* Outer radar circle in green */}
      <circle
        cx={center.x}
        cy={center.y}
        r={radarRadius}
        fill="none"
        stroke="green"
      />
      {/* Concentric reference circles in green */}
      <circle
        cx={center.x}
        cy={center.y}
        r={radarRadius * 0.66}
        fill="none"
        stroke="green"
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={radarRadius * 0.33}
        fill="none"
        stroke="green"
      />
      {/* Plot each asteroid as a red dot with coordinates above */}
      {asteroids.map((asteroid, index) => {
        const posX = center.x + asteroid.x * scale;
        const posY = center.y - asteroid.y * scale; // Invert y-axis for SVG
        return (
          <g key={index}>
            <circle cx={posX} cy={posY} r={5} fill="red" />
            <text
              x={posX}
              y={posY - 10}
              fill="white"
              fontSize="12"
              textAnchor="middle"
            >
              ({asteroid.x}, {asteroid.y})
            </text>
          </g>
        );
      })}
      {/* Spaceship shape: white triangle placed at the center */}
      <polygon
        points={`
          ${center.x},${center.y - 10} 
          ${center.x + 7},${center.y + 7} 
          ${center.x - 7},${center.y + 7}
        `}
        fill="white"
      />
    </svg>
  );
};

function Distance() {
  const [closestAsteroid, setClosestAsteroid] = useState(null);

  // Automatically calculate the closest asteroid on component mount.
  useEffect(() => {
    let closest = asteroids[0];
    let minDistance = calculateDistance(asteroids[0].x, asteroids[0].y);
    asteroids.forEach((asteroid) => {
      const distance = calculateDistance(asteroid.x, asteroid.y);
      if (distance < minDistance) {
        closest = asteroid;
        minDistance = distance;
      }
    });
    setClosestAsteroid(closest);
  }, []);

  return (
    <div className="h-[320px] bg-black flex items-center justify-center p-4">
      <RadarDisplay asteroids={asteroids} closestAsteroid={closestAsteroid} />
    </div>
  );
}

export default Distance;
