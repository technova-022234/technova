import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const SensorNode = ({ data }) => {
  return (
    <div className="p-2 bg-gray-200 border border-gray-400 rounded">
      <div className="text-sm font-semibold">{data.label}</div>
      <Handle
        type="source"
        position="right"
        id="top"
        style={{ top: '25%', background: '#555' }}
      />
      <Handle
        type="source"
        position="right"
        id="bottom"
        style={{ top: '75%', background: '#555' }}
      />
    </div>
  );
};

/** 
 * Custom AND Gate Node:
 * Two target handles (top/bottom) so lines from 
 * different sensors never merge at the same point.
 */
const AndGateNode = () => {
  return (
    <div className="relative w-[120px] h-[100px]">
      <svg width="120" height="90" viewBox="0 0 100 80">
        <rect x="0" y="20" width="50" height="50" fill="none" stroke="white" strokeWidth="3" />
        <path d="M50 20 A40 40 0 0 1 50 70" fill="none" stroke="white" strokeWidth="3" />
      </svg>
      <Handle type="target" position="left" id="top" style={{ top: '25%', background: '#555' }} />
      <Handle type="target" position="left" id="bottom" style={{ top: '75%', background: '#555' }} />
      <Handle type="source" position="right" id="out" style={{ top: '50%', background: '#555' }} />
    </div>
  );
};

const ORGateNode = () => {
  return (
    <div className="relative w-[120px] h-[100px]">
      <svg width="120" height="100" viewBox="0 0 100 80">
        <path
          d="M10 20 Q50 5 90 40 Q50 75 10 60 Q20 40 10 20"
          stroke="white"
          fill="none"
          strokeWidth="3"
        />
      </svg>
      <Handle type="target" position="top" id="top" style={{ left: '40%', background: '#555' }} />
      <Handle type="target" position="left" id="left" style={{ top: '30%', background: '#555' }} />
      <Handle type="target" position="bottom" id="bottom" style={{ left: '40%', background: '#555' }} />
      <Handle type="source" position="right" id="out" style={{ top: '50%', background: '#555' }} />
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
    { id: 'sensorA', type: 'sensor', data: { label: `Sensor A: ${sensorA ? '1' : '0'}` }, position: { x: 50, y: 0 } },
    { id: 'sensorB', type: 'sensor', data: { label: `Sensor B: ${sensorB ? '1' : '0'}` }, position: { x: 50, y: 200 } },
    { id: 'sensorC', type: 'sensor', data: { label: `Sensor C: ${sensorC ? '1' : '0'}` }, position: { x: 50, y: 400 } },
    { id: 'andAB', type: 'andGate', data: { label: 'AND' }, position: { x: 400, y: 0 } },
    { id: 'andAC', type: 'andGate', data: { label: 'AND' }, position: { x: 400, y: 200 } },
    { id: 'andBC', type: 'andGate', data: { label: 'AND' }, position: { x: 400, y: 400 } },
    { id: 'orGate', type: 'orGate', data: { label: 'OR' }, position: { x: 650, y: 200 } },
  ];
  
  const edges = [
    { id: 'a-to-ab', source: 'sensorA', sourceHandle: 'top', target: 'andAB', targetHandle: 'top', type: 'bezier', style: { stroke: 'red', strokeWidth: 2 } },
    { id: 'a-to-ac', source: 'sensorA', sourceHandle: 'bottom', target: 'andAC', targetHandle: 'top', type: 'bezier', style: { stroke: 'red', strokeWidth: 2 } },
    { id: 'b-to-ab', source: 'sensorB', sourceHandle: 'top', target: 'andAB', targetHandle: 'bottom', type: 'bezier', style: { stroke: 'blue', strokeWidth: 2 } },
    { id: 'b-to-bc', source: 'sensorB', sourceHandle: 'bottom', target: 'andBC', targetHandle: 'top', type: 'bezier', style: { stroke: 'blue', strokeWidth: 2 } },
    { id: 'c-to-ac', source: 'sensorC', sourceHandle: 'top', target: 'andAC', targetHandle: 'bottom', type: 'bezier', style: { stroke: 'green', strokeWidth: 2 } },
    { id: 'c-to-bc', source: 'sensorC', sourceHandle: 'bottom', target: 'andBC', targetHandle: 'bottom', type: 'bezier', style: { stroke: 'green', strokeWidth: 2 } },
    { 
      id: 'ab-to-or', 
      source: 'andAB', 
      sourceHandle: 'out', 
      target: 'orGate', 
      targetHandle: 'top', 
      type: 'step',  
      style: { stroke: '#666', strokeWidth: 2 } 
    },
    { 
      id: 'ac-to-or', 
      source: 'andAC', 
      sourceHandle: 'out', 
      target: 'orGate', 
      targetHandle: 'left', 
      type: 'step',  
      style: { stroke: '#666', strokeWidth: 2 } 
    },
    { 
      id: 'bc-to-or', 
      source: 'andBC', 
      sourceHandle: 'out', 
      target: 'orGate', 
      targetHandle: 'bottom', 
      type: 'step',  
      style: { stroke: '#666', strokeWidth: 2 } 
    },
  ];

  return (
    <div className="w-full min-h-screen bg-transparent p-8">
      <div className="w-full bg-transparent p-4 rounded shadow h-[700px]">
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
