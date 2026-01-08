import { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, type Edge, type Node } from 'reactflow';
import 'reactflow/dist/style.css';
import type { SystemNode } from '../domain/types';

export function GraphView({
  systems,
}: {
  systems: SystemNode[];
}) {
  const { nodes, edges } = useMemo(() => {
    // simple deterministic layout: place nodes in a grid
    const cols = 4;
    const gapX = 260;
    const gapY = 140;

    const nodes: Node[] = systems.map((s, i) => ({
      id: s.id,
      position: { x: (i % cols) * gapX, y: Math.floor(i / cols) * gapY },
      data: { label: s.name },
      style: {
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 12,
        padding: 10,
        width: 220,
        background: 'white',
        fontSize: 12,
      },
    }));

    // only draw edges when the dependency exists in the visible set
    const visibleIds = new Set(systems.map((s) => s.id));
    const edges: Edge[] = systems.flatMap((s) =>
      (s.dependencies ?? [])
        .filter((depId) => visibleIds.has(depId))
        .map((depId) => ({
          id: `${s.id}->${depId}`,
          source: s.id,
          target: depId,
          animated: true,
        })),
    );

    return { nodes, edges };
  }, [systems]);

  return (
    <div style={{ width: '100%', height: '75vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
