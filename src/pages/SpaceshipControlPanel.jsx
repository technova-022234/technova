import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
    IMAGE: "image",
};

// A unified draggable image component.
// It behaves differently based on its source:
// • "free": rendered absolutely at its given position.
// • "box": rendered inside a box (position not used) but can still be dragged out.
const DraggableImage = ({
    image,
    position,
    source,
    boxId,
    onDragEnd,
    onDragOut,
}) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.IMAGE,
            item: { image, source, boxId },
            // end is called whether the image comes from the free area or from a box.
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                // If dropped outside a valid drop target...
                if (!dropResult) {
                    const offset = monitor.getDifferenceFromInitialOffset();
                    if (offset) {
                        // For free images, update their absolute position.
                        // For images from a box, remove them from the box and add them back as free.
                        const newX =
                            (source === "free" ? position.x : 0) + offset.x;
                        const newY =
                            (source === "free" ? position.y : 0) + offset.y;
                        if (source === "free") {
                            onDragEnd &&
                                onDragEnd(image.id, { x: newX, y: newY });
                        } else if (source === "box") {
                            onDragOut && onDragOut(image, { x: newX, y: newY });
                        }
                    }
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [image, source, position, boxId, onDragEnd, onDragOut]
    );

    // For free images, we apply absolute positioning.
    const style = {
        opacity: isDragging ? 0.5 : 1,
        width: 100,
        height: 100,
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#fff",
        textAlign: "center",
        cursor: "move",
        ...(source === "free" && {
            position: "absolute",
            left: position.x,
            top: position.y,
        }),
    };

    return (
        <div ref={drag} style={style}>
            <img
                src={image.img}
                alt={image.label}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <p style={{ fontSize: "0.8em", margin: 0 }}>{image.label}</p>
        </div>
    );
};

// Each drop box accepts images dropped on it.
const DropBox = ({ box, children, onDropImage }) => {
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.IMAGE,
            drop: (item, monitor) => {
                // When an image is dropped here, let the parent know.
                onDropImage(box.id, item.image, item.source);
                return { dropped: true };
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [box, onDropImage]
    );

    const style = {
        width: 120,
        height: 120,
        border: "2px dashed #ccc",
        borderRadius: "8px",
        margin: "0 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOver && canDrop ? "#f0f0f0" : "#fff",
    };

    return (
        <div ref={drop} style={style}>
            {children}
        </div>
    );
};

const SpaceshipControlPanel = () => {
    // Define the 5 images.
    const initialImages = [
        { id: "img1", label: "Shields", img: "/images/shields.png" },
        { id: "img2", label: "Weapons", img: "/images/weapons.png" },
        { id: "img3", label: "Navigation", img: "/images/navigation.png" },
        { id: "img4", label: "Engines", img: "/images/engines.png" },
        {
            id: "img5",
            label: "Communications",
            img: "/images/communications.png",
        },
    ];

    // State for free images and their positions (initially at the top).
    const [freeImages, setFreeImages] = useState(initialImages);
    const [freeImagePositions, setFreeImagePositions] = useState({
        img1: { x: 50, y: 20 },
        img2: { x: 200, y: 20 },
        img3: { x: 350, y: 20 },
        img4: { x: 500, y: 20 },
        img5: { x: 650, y: 20 },
    });

    // Define the 5 boxes (always 5).
    const boxes = [
        { id: "box1" },
        { id: "box2" },
        { id: "box3" },
        { id: "box4" },
        { id: "box5" },
    ];

    // State mapping box id to the image placed there (or null if empty).
    const [boxContents, setBoxContents] = useState({
        box1: null,
        box2: null,
        box3: null,
        box4: null,
        box5: null,
    });

    // When an image is dropped on a box:
    // • If the box already contains a different image, return that image to the free palette.
    // • Remove the dropped image from its previous location (free or another box) and set it in the box.
    const handleDropImage = (boxId, image, source) => {
        setBoxContents((prev) => {
            const newBoxContents = { ...prev };
            // If the target box already had an image (and it isn’t the same one), return it to freeImages.
            if (
                newBoxContents[boxId] &&
                newBoxContents[boxId].id !== image.id
            ) {
                const replacedImage = newBoxContents[boxId];
                setFreeImages((free) => [...free, replacedImage]);
                // Reset its position (here we use a default palette position).
                setFreeImagePositions((pos) => ({
                    ...pos,
                    [replacedImage.id]: { x: 50, y: 20 },
                }));
            }
            newBoxContents[boxId] = image;
            return newBoxContents;
        });

        // If the image came from the free palette, remove it from freeImages.
        if (source === "free") {
            setFreeImages((prev) => prev.filter((img) => img.id !== image.id));
        } else if (source === "box") {
            // If the image came from another box, remove it from its previous box.
            setBoxContents((prev) => {
                const newBoxContents = { ...prev };
                Object.keys(newBoxContents).forEach((bId) => {
                    if (
                        newBoxContents[bId] &&
                        newBoxContents[bId].id === image.id
                    ) {
                        newBoxContents[bId] = null;
                    }
                });
                newBoxContents[boxId] = image;
                return newBoxContents;
            });
        }
    };

    // For free images: update their absolute position when dropped on a non-target.
    const handleFreeDragEnd = (imageId, newPosition) => {
        setFreeImagePositions((prev) => ({ ...prev, [imageId]: newPosition }));
    };

    // For images dragged out of a box: remove them from the box and add them back to freeImages.
    const handleDragOut = (image, newPosition) => {
        setBoxContents((prev) => {
            const newBoxContents = { ...prev };
            Object.keys(newBoxContents).forEach((bId) => {
                if (
                    newBoxContents[bId] &&
                    newBoxContents[bId].id === image.id
                ) {
                    newBoxContents[bId] = null;
                }
            });
            return newBoxContents;
        });
        setFreeImages((prev) => {
            if (!prev.find((img) => img.id === image.id)) {
                return [...prev, image];
            }
            return prev;
        });
        setFreeImagePositions((prev) => ({ ...prev, [image.id]: newPosition }));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{ position: "relative", width: "100%", height: "100vh" }}
            >
                {/* Render free images (palette at the top) */}
                {freeImages.map((img) => (
                    <DraggableImage
                        key={img.id}
                        image={img}
                        position={freeImagePositions[img.id]}
                        source="free"
                        onDragEnd={handleFreeDragEnd}
                    />
                ))}
                {/* Render the 5 boxes centered on the screen */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                    }}
                >
                    {boxes.map((box) => (
                        <DropBox
                            key={box.id}
                            box={box}
                            onDropImage={handleDropImage}
                        >
                            {boxContents[box.id] && (
                                <DraggableImage
                                    image={boxContents[box.id]}
                                    // For images in boxes we don’t use absolute positioning.
                                    position={{ x: 0, y: 0 }}
                                    source="box"
                                    boxId={box.id}
                                    onDragOut={handleDragOut}
                                />
                            )}
                        </DropBox>
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default SpaceshipControlPanel;
