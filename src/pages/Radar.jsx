import React, { useMemo } from "react";
import { Navigation2 } from "lucide-react";

const Radar = () => {
    const radarSize = 288;
    const center = radarSize / 2;

    // Fixed points with labels but randomized positions
    const points = useMemo(() => {
        const fixedPoints = [
            { label: "A", x: 50, y: 30, x_label: 0, y_label: -3.2 },
            { label: "B", x: -40, y: 60, x_label: 3.5, y_label: 2 },
            { label: "C", x: 20, y: -70, x_label: -4.5, y_label: 4 },
        ];

        return fixedPoints.map((point) => {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * (center - 10); // Keep within radar bounds
            const offsetX = Math.round(radius * Math.cos(angle));
            const offsetY = Math.round(radius * Math.sin(angle));
            return {
                ...point,
                offsetX,
                offsetY,
                label: `${point.label} (${point.x_label}, ${point.y_label})`,
            };
        });
    }, [center]);

    return (
        <div className="flex items-center justify-center p-4">
            <div
                className="relative"
                style={{ width: radarSize, height: radarSize }}
            >
                {/* Radar circle */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-600 bg-gradient-to-br from-gray-800 to-black overflow-hidden shadow-lg" />

                {/* Concentric grid circles */}
                <div className="absolute inset-0">
                    {[...Array(4)].map((_, i) => {
                        const size = radarSize * ((i + 1) / 4);
                        const offset = (radarSize - size) / 2;
                        return (
                            <div
                                key={i}
                                className="absolute rounded-full border border-gray-700"
                                style={{
                                    width: size,
                                    height: size,
                                    top: offset,
                                    left: offset,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Scanning line */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="w-px h-full bg-green-500 origin-bottom animate-spin"
                        style={{ animationDuration: "4s" }}
                    />
                </div>

                {/* Central navigation icon */}
                <Navigation2 className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

                {/* Render randomized fixed points with labels */}
                {points.map((point, index) => (
                    <div
                        key={index}
                        className="absolute flex flex-col items-center"
                        style={{
                            left: `${center + point.offsetX}px`,
                            top: `${center + point.offsetY}px`,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-ping absolute" />
                        <div className="w-3 h-3 bg-green-400 rounded-full relative" />
                        <span className="mt-1 text-xs text-green-300 bg-black bg-opacity-50 px-1 py-0.5 rounded shadow">
                            {point.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Radar;
