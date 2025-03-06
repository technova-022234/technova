import React from "react";
import ReactFlow, { Handle } from "react-flow-renderer";

const SensorNode = ({ data }) => {
    return (
        <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
            <div className="text-sm font-semibold text-white">{data.label}</div>
            <Handle
                type="source"
                position="right"
                id="top"
                style={{ top: "25%", background: "#00BFFF" }}
            />
            <Handle
                type="source"
                position="right"
                id="bottom"
                style={{ top: "75%", background: "#00BFFF" }}
            />
        </div>
    );
};

const AndGateNode = () => {
    return (
        <div className="relative w-[120px] h-[100px] flex items-center justify-center">
            <svg
                width="120"
                height="90"
                viewBox="0 0 100 80"
                className="drop-shadow-lg"
            >
                <defs>
                    <linearGradient
                        id="andGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                </defs>
                <rect
                    x="0"
                    y="20"
                    width="50"
                    height="50"
                    fill="none"
                    stroke="url(#andGradient)"
                    strokeWidth="3"
                    rx="5"
                    ry="5"
                />
                <path
                    d="M50 20 A40 40 0 0 1 50 70"
                    fill="none"
                    stroke="url(#andGradient)"
                    strokeWidth="3"
                />
            </svg>
            <Handle
                type="target"
                position="left"
                id="top"
                style={{ top: "25%", background: "#00BFFF" }}
            />
            <Handle
                type="target"
                position="left"
                id="bottom"
                style={{ top: "75%", background: "#00BFFF" }}
            />
            <Handle
                type="source"
                position="right"
                id="out"
                style={{ top: "50%", background: "#00BFFF" }}
            />
        </div>
    );
};

const ORGateNode = () => {
    return (
        <div className="relative w-[120px] h-[100px] flex items-center justify-center">
            <svg
                width="120"
                height="100"
                viewBox="0 0 100 80"
                className="drop-shadow-lg"
            >
                <defs>
                    <linearGradient id="orGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>
                <path
                    d="M10 20 Q50 5 90 40 Q50 75 10 60 Q20 40 10 20"
                    stroke="url(#orGradient)"
                    fill="none"
                    strokeWidth="3"
                />
            </svg>
            <Handle
                type="target"
                position="top"
                id="top"
                style={{ left: "40%", background: "#00BFFF" }}
            />
            <Handle
                type="target"
                position="left"
                id="left"
                style={{ top: "30%", background: "#00BFFF" }}
            />
            <Handle
                type="target"
                position="bottom"
                id="bottom"
                style={{ left: "40%", background: "#00BFFF" }}
            />
            <Handle
                type="source"
                position="right"
                id="out"
                style={{ top: "50%", background: "#00BFFF" }}
            />
        </div>
    );
};

const nodeTypes = {
    sensor: SensorNode,
    andGate: AndGateNode,
    orGate: ORGateNode,
};

function SensorSystem() {
    const sensorA = true;
    const sensorB = true;
    const sensorC = false;

    const nodes = [
        {
            id: "sensorA",
            type: "sensor",
            data: { label: `Sensor A: ${sensorA ? "1" : "0"}` },
            position: { x: 50, y: 0 },
        },
        {
            id: "sensorB",
            type: "sensor",
            data: { label: `Sensor B: ${sensorB ? "1" : "0"}` },
            position: { x: 50, y: 200 },
        },
        {
            id: "sensorC",
            type: "sensor",
            data: { label: `Sensor C: ${sensorC ? "1" : "0"}` },
            position: { x: 50, y: 400 },
        },
        {
            id: "andAB",
            type: "andGate",
            data: { label: "AND" },
            position: { x: 400, y: 0 },
        },
        {
            id: "andAC",
            type: "andGate",
            data: { label: "AND" },
            position: { x: 400, y: 200 },
        },
        {
            id: "andBC",
            type: "andGate",
            data: { label: "AND" },
            position: { x: 400, y: 400 },
        },
        {
            id: "orGate",
            type: "orGate",
            data: { label: "OR" },
            position: { x: 650, y: 200 },
        },
    ];

    const edges = [
        {
            id: "a-to-ab",
            source: "sensorA",
            sourceHandle: "top",
            target: "andAB",
            targetHandle: "top",
            type: "bezier",
            style: { stroke: "#f87171", strokeWidth: 2 },
        },
        {
            id: "a-to-ac",
            source: "sensorA",
            sourceHandle: "bottom",
            target: "andAC",
            targetHandle: "top",
            type: "bezier",
            style: { stroke: "#f87171", strokeWidth: 2 },
        },
        {
            id: "b-to-ab",
            source: "sensorB",
            sourceHandle: "top",
            target: "andAB",
            targetHandle: "bottom",
            type: "bezier",
            style: { stroke: "#60a5fa", strokeWidth: 2 },
        },
        {
            id: "b-to-bc",
            source: "sensorB",
            sourceHandle: "bottom",
            target: "andBC",
            targetHandle: "top",
            type: "bezier",
            style: { stroke: "#60a5fa", strokeWidth: 2 },
        },
        {
            id: "c-to-ac",
            source: "sensorC",
            sourceHandle: "top",
            target: "andAC",
            targetHandle: "bottom",
            type: "bezier",
            style: { stroke: "#34d399", strokeWidth: 2 },
        },
        {
            id: "c-to-bc",
            source: "sensorC",
            sourceHandle: "bottom",
            target: "andBC",
            targetHandle: "bottom",
            type: "bezier",
            style: { stroke: "#34d399", strokeWidth: 2 },
        },
        {
            id: "ab-to-or",
            source: "andAB",
            sourceHandle: "out",
            target: "orGate",
            targetHandle: "top",
            type: "step",
            style: { stroke: "#a3a3a3", strokeWidth: 2 },
        },
        {
            id: "ac-to-or",
            source: "andAC",
            sourceHandle: "out",
            target: "orGate",
            targetHandle: "left",
            type: "step",
            style: { stroke: "#a3a3a3", strokeWidth: 2 },
        },
        {
            id: "bc-to-or",
            source: "andBC",
            sourceHandle: "out",
            target: "orGate",
            targetHandle: "bottom",
            type: "step",
            style: { stroke: "#a3a3a3", strokeWidth: 2 },
        },
    ];

    return (
        <div className="w-full min-h-screen bg-transparent p-8">
            <div className="w-full bg-transparent p-4 rounded-lg shadow-lg h-[700px]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    fitView
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    panOnScroll={false}
                    panOnDrag={false}
                />
            </div>
        </div>
    );
}

export default SensorSystem;
