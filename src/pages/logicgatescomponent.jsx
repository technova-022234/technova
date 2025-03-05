import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Handle } from 'react-flow-renderer';

/** 
 * Custom Sensor Node:
 * Two source handles (top/bottom) so each sensor 
 * can send two distinct lines without merging.
 */
const SensorNode = ({ data }) => {
  return (
    <div className="p-2 bg-gray-200 border border-gray-400 rounded">
      <div className="text-sm font-semibold">{data.label}</div>
      <Handle
        type="source"
        position="right"
        id="top"
        style={{ top: '25%', background: '#555' }} // Moved slightly up
      />
      <Handle
        type="source"
        position="right"
        id="bottom"
        style={{ top: '75%', background: '#555' }} // Moved slightly down
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
    <div className="relative w-[120px] h-[100px]"> {/* Increased width and height */}
      <svg width="120" height="90" viewBox="0 0 100 80"> {/* Larger SVG */}
        <rect x="0" y="20" width="50" height="50" fill="none" stroke="black" strokeWidth="4" />
        <path d="M50 20 A40 40 0 0 1 50 70" fill="none" stroke="black" strokeWidth="4" />
      </svg>
      <Handle type="target" position="left" id="top" style={{ top: '25%', background: '#555' }} />
      <Handle type="target" position="left" id="bottom" style={{ top: '75%', background: '#555' }} />
      <Handle type="source" position="right" id="out" style={{ top: '50%', background: '#555' }} />
    </div>
  );
};

const ORGateNode = () => {
  return (
    <div className="relative w-[120px] h-[100px]"> {/* Increased size */}
      <svg width="120" height="100" viewBox="0 0 100 80"> {/* Larger SVG */}
        <path
          d="M10 20 Q50 5 90 40 Q50 75 10 60 Q20 40 10 20"
          stroke="black"
          fill="none"
          strokeWidth="4" /* Thicker stroke */
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
  // Example sensor states: A=1, B=1, C=0
  const sensorA = true;
  const sensorB = true;
  const sensorC = false;

  /**
   * Node positions:
   * - Sensors on the far left (x=50) with large y spacing
   * - AND gates on the middle (x=600)
   * - OR gate on the right (x=900)
   * 
   * The y positions ensure lines stay distinct and parallel.
   */
  const nodes = [
    { id: 'sensorA', type: 'sensor', data: { label: `Sensor A: ${sensorA ? '1' : '0'}` }, position: { x: 50, y: 0 } },
    { id: 'sensorB', type: 'sensor', data: { label: `Sensor B: ${sensorB ? '1' : '0'}` }, position: { x: 50, y: 200 } },
    { id: 'sensorC', type: 'sensor', data: { label: `Sensor C: ${sensorC ? '1' : '0'}` }, position: { x: 50, y: 400 } },
    
    // Move AND gates closer to sensors by decreasing x position from 600 to 400
    { id: 'andAB', type: 'andGate', data: { label: 'AND' }, position: { x: 400, y: 0 } },
    { id: 'andAC', type: 'andGate', data: { label: 'AND' }, position: { x: 400, y: 200 } },
    { id: 'andBC', type: 'andGate', data: { label: 'AND' }, position: { x: 400, y: 400 } },
    
    // Keep OR gate farther right
    { id: 'orGate', type: 'orGate', data: { label: 'OR' }, position: { x: 650, y: 200 } }, 
  ];
  

  /**
   * Edges:
   * - 'bezier' type to keep lines rectilinear (horizontal + vertical)
   * - Separate source/target handles so lines never merge
   * - Color-coded for clarity (red for A, blue for B, green for C)
   */
  const edges = [
    // A -> andAB, andAC (keeping distinct)
    { id: 'a-to-ab', source: 'sensorA', sourceHandle: 'top', target: 'andAB', targetHandle: 'top', type: 'bezier', style: { stroke: 'red', strokeWidth: 2 } },
    { id: 'a-to-ac', source: 'sensorA', sourceHandle: 'bottom', target: 'andAC', targetHandle: 'top', type: 'bezier', style: { stroke: 'red', strokeWidth: 2 } },
  
    // B -> andAB, andBC
    { id: 'b-to-ab', source: 'sensorB', sourceHandle: 'top', target: 'andAB', targetHandle: 'bottom', type: 'bezier', style: { stroke: 'blue', strokeWidth: 2 } },
    { id: 'b-to-bc', source: 'sensorB', sourceHandle: 'bottom', target: 'andBC', targetHandle: 'top', type: 'bezier', style: { stroke: 'blue', strokeWidth: 2 } },
  
    // C -> andAC, andBC
    { id: 'c-to-ac', source: 'sensorC', sourceHandle: 'top', target: 'andAC', targetHandle: 'bottom', type: 'bezier', style: { stroke: 'green', strokeWidth: 2 } },
    { id: 'c-to-bc', source: 'sensorC', sourceHandle: 'bottom', target: 'andBC', targetHandle: 'bottom', type: 'bezier', style: { stroke: 'green', strokeWidth: 2 } },
  
    // ✅ AND gates -> OR gate (now matching screenshot style!)
    { 
      id: 'ab-to-or', 
      source: 'andAB', 
      sourceHandle: 'out', 
      target: 'orGate', 
      targetHandle: 'top', 
      type: 'step',  // Using step to match screenshot 
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-4 rounded shadow h-[700px]">
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default SensorSystem;
