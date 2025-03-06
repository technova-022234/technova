import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

const NUM_ITEMS = 5;

const DraggableImage = ({ src, alt, position, onStop, index, imageSize }) => {
    return (
        <Draggable
            bounds="parent" // Constrain dragging to the parent container.
            position={position}
            onStop={(e, data) => onStop(e, data, index)}
        >
            <img
                src={src}
                alt={alt}
                style={{ width: imageSize, height: imageSize }}
                className="cursor-move shadow-lg rounded absolute"
            />
        </Draggable>
    );
};

const DragAndDropImages = () => {
    // Use a ref to measure the container's size.
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [imagePositions, setImagePositions] = useState([]);
    const [dropZones, setDropZones] = useState([]);

    // Update container dimensions on mount and on resize.
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { width, height } =
                    containerRef.current.getBoundingClientRect();
                setContainerSize({ width, height });
            }
        };
        updateSize();

        // Use ResizeObserver for more accurate container size changes.
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

    // Compute positions based on container size.
    useEffect(() => {
        const { width, height } = containerSize;
        if (width === 0 || height === 0) return;
        // Reduced sizes:
        const imageSizeComputed = width < 640 ? 80 : 120;
        const imageGap = width < 640 ? 5 : 10;

        // Arrange images in a centered row at the top with a 20px top margin.
        const totalImagesWidth =
            NUM_ITEMS * imageSizeComputed + (NUM_ITEMS - 1) * imageGap;
        const imagesStartX = (width - totalImagesWidth) / 2;
        const initialImagePositions = Array.from({ length: NUM_ITEMS }).map(
            (_, index) => ({
                x: imagesStartX + index * (imageSizeComputed + imageGap),
                y: 20,
            })
        );
        setImagePositions(initialImagePositions);

        // Arrange drop zones in a centered row in the middle of the container.
        const dropZoneTotalWidth =
            NUM_ITEMS * imageSizeComputed + (NUM_ITEMS - 1) * imageGap;
        const dropZoneStartX = (width - dropZoneTotalWidth) / 2;
        const dropZoneY = (height - imageSizeComputed) / 2;
        const zones = Array.from({ length: NUM_ITEMS }).map((_, index) => ({
            x: dropZoneStartX + index * (imageSizeComputed + imageGap),
            y: dropZoneY,
            width: imageSizeComputed,
            height: imageSizeComputed,
        }));
        setDropZones(zones);
    }, [containerSize]);

    // When dragging stops, check if the image's center is inside any drop zone.
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
                // Snap the image to the drop zone's top-left corner.
                newPos = { x: zone.x, y: zone.y };
                break;
            }
        }
        setImagePositions((prev) =>
            prev.map((pos, i) => (i === index ? newPos : pos))
        );
    };

    // Use the same computed image size for rendering.
    const imageSize = containerSize.width < 640 ? 80 : 120;

    return (
        <div
            ref={containerRef}
            className="relative bg-transparent pt-12"
            style={{
                width: "50vw", // Half of the viewport width.
                height: "50vw", // Square container sized to 50vw.
                margin: "auto",
            }}
        >
            {/* Render drop zones with a dark background. */}
            {dropZones.map((zone, index) => (
                <div
                    key={index}
                    style={{
                        width: zone.width,
                        height: zone.height,
                        left: zone.x,
                        top: zone.y,
                    }}
                    className="absolute border-4 border-dashed border-gray-600 flex items-center justify-center bg-gray-800 text-white"
                >
                    Drop Zone {index + 1}
                </div>
            ))}

            {/* Render draggable images. */}
            {imagePositions.map((pos, index) => (
                <DraggableImage
                    key={index}
                    index={index}
                    src={`https://via.placeholder.com/${imageSize}?text=Image+${
                        index + 1
                    }`}
                    alt={`Image ${index + 1}`}
                    position={pos}
                    onStop={handleStop}
                    imageSize={imageSize}
                />
            ))}
        </div>
    );
};

export default DragAndDropImages;
