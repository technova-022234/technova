import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

// Define nodes with associated images
const nodes = [
    { id: "A", img: "/images/astronaut.png" },
    { id: "B", img: "/images/astronaut.png" },
    { id: "C", img: "/images/astronaut.png" },
    { id: "D", img: "/images/astronaut.png" },
    { id: "E", img: "/images/astronaut.png" },
    { id: "F", img: "/images/astronaut.png" },
    { id: "G", img: "/images/astronaut.png" },
    { id: "H", img: "/images/astronaut.png" },
    { id: "I", img: "/images/astronaut.png" },
    { id: "J", img: "/images/astronaut.png" },
];

// Define links with weights
const links = [
    { source: "A", target: "B", weight: 4 },
    { source: "A", target: "C", weight: 3 },
    { source: "A", target: "D", weight: 6 },
    { source: "B", target: "C", weight: 2 },
    { source: "B", target: "E", weight: 7 },
    { source: "C", target: "D", weight: 1 },
    { source: "C", target: "F", weight: 5 },
    { source: "D", target: "F", weight: 8 },
    { source: "D", target: "G", weight: 9 },
    { source: "E", target: "F", weight: 4 },
    { source: "E", target: "H", weight: 3 },
    { source: "F", target: "I", weight: 6 },
    { source: "G", target: "I", weight: 2 },
    { source: "G", target: "J", weight: 7 },
    { source: "H", target: "I", weight: 4 },
    { source: "I", target: "J", weight: 3 },
];

const data = { nodes, links };

const GraphComponent = () => {
    const graphRef = useRef();
    const images = useRef({});

    // Preload images once and store them
    useEffect(() => {
        nodes.forEach((node) => {
            const img = new Image();
            img.src = node.img;
            images.current[node.id] = img;
        });
    }, []);

    // Set default zoom level after the graph is mounted
    useEffect(() => {
        if (graphRef.current) {
            // Adjust the zoom factor (e.g., 0.8) and transition duration (0 for immediate)
            graphRef.current.zoom(4, 0);
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen w-1/2 bg-transparent p-4">
            <div className="bg-transparent p-4">
                <ForceGraph2D
                    ref={graphRef}
                    className="bg-transparent w-full h-full"
                    graphData={data}
                    enableZoomInteraction={true}
                    enablePanInteraction={true}
                    enableNodeDrag={true}
                    d3AlphaDecay={0}
                    linkDistance={1000}
                    linkLabel={(link) =>
                        `Weight: ${link.weight}${link.isMST ? " (MST)" : ""}`
                    }
                    linkWidth={(link) => (link.isMST ? 4 : 2)}
                    linkColor={(link) => (link.isMST ? "red" : "#888")}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 14 / globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;

                        const img = images.current[node.id];
                        if (img) {
                            const size = 34 / globalScale;
                            ctx.drawImage(
                                img,
                                node.x - size / 2,
                                node.y - size / 2,
                                size,
                                size
                            );
                        }
                        const textWidth = ctx.measureText(label).width;
                        ctx.fillStyle = "cyan";
                        ctx.fillText(
                            label,
                            node.x - textWidth / 2,
                            node.y - 12
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default GraphComponent;
