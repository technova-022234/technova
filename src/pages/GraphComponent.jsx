import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

// Define 6 nodes with associated images
const nodes = [
    { id: "A", img: "/images/rocket.png" },
    { id: "B", img: "/images/asteroid1.png" },
    { id: "C", img: "/images/asteroid2.png" },
    { id: "D", img: "/images/asteroid1.png" },
    { id: "E", img: "/images/asteroid2.png" },
    { id: "F", img: "/images/asteroid1.png" },
];

// Define links with weights and mark some as part of the MST
const links = [
    { source: "A", target: "B", weight: 2 },
    { source: "B", target: "C", weight: 3 },
    { source: "C", target: "D", weight: 3 },
    { source: "D", target: "E", weight: 4 },
    { source: "E", target: "F", weight: 4 },
    { source: "A", target: "D", weight: 5 },
    { source: "B", target: "D", weight: 6 },
    { source: "C", target: "E", weight: 7 },
    { source: "D", target: "F", weight: 8 },
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
            // Adjust the zoom factor (e.g., 4 for a closer view) and transition duration (0 for immediate)
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
                        `Weight: ${
                            link.weight
                        }`
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
