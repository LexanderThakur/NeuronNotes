import { Box } from "@mui/material";

const api = import.meta.env.VITE_API_URL;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Graph() {
  const { project_id } = useParams();

  const [folders, setFolders] = useState([]);
  const [links, setLinks] = useState([]);
  const [hovered, setHovered] = useState(null);

  async function get_graph() {
    try {
      const response = await fetch(`${api}/projects/${project_id}/graph/`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      setFolders(data.message);
      setLinks(data.links);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get_graph();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="-1500 -1500 3000 3000"
        style={{
          display: "block",
          background: "#F5F3EA",
        }}
      >
        {/* LINKS */}
        {links.map((link, index) => (
          <line
            key={"link" + index}
            x1={link.from_x}
            y1={link.from_y}
            x2={link.to_x}
            y2={link.to_y}
            stroke="#BDBDBD"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.65"
          />
        ))}

        {/* NODES */}
        {folders.map((folder) => {
          const isHovered = hovered === folder.id;

          return (
            <g
              key={folder.id}
              onMouseEnter={() => setHovered(folder.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
              }}
            >
              {/* GLOW */}
              <circle
                cx={folder.x}
                cy={folder.y}
                r={isHovered ? "68" : "58"}
                fill="rgba(0,0,0,0.04)"
                style={{
                  transition: "all 0.2s ease",
                }}
              />

              {/* MAIN NODE */}
              <circle
                cx={folder.x}
                cy={folder.y}
                r={isHovered ? "42" : "34"}
                fill={isHovered ? "#505050" : "#666666"}
                style={{
                  transition: "all 0.2s ease",
                  filter: isHovered
                    ? "drop-shadow(0px 10px 18px rgba(0,0,0,0.18))"
                    : "none",
                }}
              />

              {/* LABEL */}
              <text
                x={folder.x}
                y={folder.y + 82}
                textAnchor="middle"
                fontSize="34"
                fill={isHovered ? "#444444" : "#8A8A8A"}
                fontWeight="500"
                style={{
                  userSelect: "none",
                  pointerEvents: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {folder.name}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
}
