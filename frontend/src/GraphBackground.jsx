import { Box } from "@mui/material";

const graphs = [
  {
    nodes: [
      { id: 1, x: 12, y: 18 },
      { id: 2, x: 20, y: 24 },
      { id: 3, x: 15, y: 34 },
      { id: 4, x: 25, y: 38 },
    ],
    edges: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ],
  },

  {
    nodes: [
      { id: 5, x: 65, y: 16 },
      { id: 6, x: 78, y: 22 },
      { id: 7, x: 72, y: 35 },
      { id: 8, x: 84, y: 30 },
    ],
    edges: [
      [5, 6],
      [6, 7],
      [7, 8],
      [5, 7],
    ],
  },

  {
    nodes: [
      { id: 9, x: 35, y: 52 },
      { id: 10, x: 45, y: 58 },
      { id: 11, x: 38, y: 68 },
    ],
    edges: [
      [9, 10],
      [10, 11],
      [9, 11],
    ],
  },

  {
    nodes: [
      { id: 12, x: 12, y: 72 },
      { id: 13, x: 22, y: 78 },
      { id: 14, x: 18, y: 88 },
    ],
    edges: [
      [12, 13],
      [13, 14],
    ],
  },

  {
    nodes: [
      { id: 15, x: 70, y: 70 },
      { id: 16, x: 82, y: 76 },
      { id: 17, x: 76, y: 88 },
      { id: 18, x: 88, y: 84 },
    ],
    edges: [
      [15, 16],
      [16, 17],
      [17, 18],
      [15, 17],
    ],
  },
];

const allNodes = graphs.flatMap((g) => g.nodes);

export default function GraphBackground() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        {graphs.map((graph) =>
          graph.edges.map(([a, b]) => {
            const n1 = graph.nodes.find((n) => n.id === a);
            const n2 = graph.nodes.find((n) => n.id === b);

            return (
              <line
                key={`${a}-${b}`}
                x1={`${n1.x}%`}
                y1={`${n1.y}%`}
                x2={`${n2.x}%`}
                y2={`${n2.y}%`}
                stroke="#555"
                strokeOpacity="0.12"
                strokeWidth="1.2"
              />
            );
          }),
        )}
      </svg>

      {allNodes.map((node, index) => (
        <Box
          key={node.id}
          sx={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: 14,
            height: 14,
            borderRadius: "50%",
            bgcolor: "#111",
            opacity: 0.75,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            animation: `float${index % 4} ${8 + index}s ease-in-out infinite`,
          }}
        />
      ))}

      <style>
        {`
        @keyframes float0 {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(14px,-10px); }
        }

        @keyframes float1 {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(-12px,12px); }
        }

        @keyframes float2 {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(10px,16px); }
        }

        @keyframes float3 {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(-16px,-8px); }
        }
        `}
      </style>
    </Box>
  );
}
