import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

const DraggableImage = ({ src, alt, position, onStop, index, imageSize }) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <Draggable
            bounds="parent"
            position={position}
            onStart={() => setIsDragging(true)}
            onStop={(e, data) => {
                setIsDragging(false);
                onStop(e, data, index);
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    width: imageSize,
                    height: imageSize,
                    objectFit: "cover",
                    cursor: isDragging ? "grabbing" : "grab",
                }}
                className="shadow-lg rounded absolute"
            />
        </Draggable>
    );
};

const NUM_ITEMS = 5;

const DragAndDropImages = () => {
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [imagePositions, setImagePositions] = useState([]);
    const [dropZones, setDropZones] = useState([]);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { width, height } =
                    containerRef.current.getBoundingClientRect();
                setContainerSize({ width, height });
            }
        };
        updateSize();

        let resizeObserver;
        if (containerRef.current) {
            resizeObserver = new ResizeObserver(() => updateSize());
            resizeObserver.observe(containerRef.current);
        }
        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
            if (resizeObserver && containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    // Initialize image positions and drop zones whenever container size changes
    useEffect(() => {
        const { width, height } = containerSize;
        if (width === 0 || height === 0) return;

        const imageSizeComputed = width < 640 ? 80 : 120;
        const imageGap = width < 640 ? 5 : 10;
        const imagesY = 20; // constant y-coordinate for images

        // Arrange images in a row at the top
        const totalImagesWidth =
            NUM_ITEMS * imageSizeComputed + (NUM_ITEMS - 1) * imageGap;
        const imagesStartX = (width - totalImagesWidth) / 2;
        const initialImagePositions = Array.from({ length: NUM_ITEMS }).map(
            (_, i) => ({
                x: imagesStartX + i * (imageSizeComputed + imageGap),
                y: imagesY,
            })
        );
        setImagePositions(initialImagePositions);

        // Arrange drop zones in a row aligned with images' top
        const dropZoneTotalWidth =
            NUM_ITEMS * imageSizeComputed + (NUM_ITEMS - 1) * imageGap;
        const dropZoneStartX = (width - dropZoneTotalWidth) / 2;
        // Use the same y coordinate as images
        const dropZoneY = (height - imageSizeComputed) / 2;
        const zones = Array.from({ length: NUM_ITEMS }).map((_, i) => ({
            x: dropZoneStartX + i * (imageSizeComputed + imageGap),
            y: dropZoneY,
            width: imageSizeComputed,
            height: imageSizeComputed,
        }));
        setDropZones(zones);
    }, [containerSize]);

    // Snap images into drop zones (align top-left)
    const handleStop = (e, data, index) => {
        const computedImageSize = containerSize.width < 640 ? 80 : 120;
        let newPos = { x: data.x, y: data.y };
        const imageCenterX = newPos.x + computedImageSize / 2;
        const imageCenterY = newPos.y + computedImageSize / 2;

        for (let zone of dropZones) {
            if (
                imageCenterX >= zone.x &&
                imageCenterX <= zone.x + zone.width &&
                imageCenterY >= zone.y &&
                imageCenterY <= zone.y + zone.height
            ) {
                // Align the image's top-left with the drop zone's top-left
                newPos = {
                    x: zone.x,
                    y: zone.y - 48,
                };
                break;
            }
        }

        setImagePositions((prev) =>
            prev.map((pos, i) => (i === index ? newPos : pos))
        );
    };

    const imageSize = containerSize.width < 640 ? 80 : 120;
    const imageSources = [
        "/images/image1.jpg",
        "/images/image1.jpg",
        "/images/image1.jpg",
        "/images/image1.jpg",
        "/images/image1.jpg",
    ];

    return (
        <div
            ref={containerRef}
            className="relative bg-transparent pt-12"
            style={{
                width: "50vw",
                height: "50vw",
                margin: "auto",
            }}
        >
            {/* Drop zones */}
            {dropZones.map((zone, i) => (
                <div
                    key={i}
                    style={{
                        width: zone.width,
                        height: zone.height,
                        left: zone.x,
                        top: zone.y,
                        border: "2px solid #444",
                        borderRadius: "8px",
                        background: "linear-gradient(145deg, #4e4e4e, #2e2e2e)",
                        boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.5)",
                    }}
                    className="absolute flex items-center justify-center"
                >
                    <span className="text-white font-semibold text-sm">
                        Container {i + 1}
                    </span>
                </div>
            ))}

            {/* Draggable images */}
            {imagePositions.map((pos, i) => (
                <DraggableImage
                    key={i}
                    index={i}
                    src={imageSources[i]}
                    alt={`Image ${i + 1}`}
                    position={pos}
                    onStop={handleStop}
                    imageSize={imageSize}
                />
            ))}
        </div>
    );
};

export default DragAndDropImages;
