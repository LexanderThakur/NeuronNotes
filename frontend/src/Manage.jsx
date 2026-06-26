import Graph from "./Graph";

import {
  Box,
  Typography,
  Divider,
  TextareaAutosize,
  TextField,
  Button,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FolderNode from "./FolderNode";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProjectBar from "./ProjectBar";
import MilkdownEditor from "./MilkdownEditor";
import { fetch_project } from "./api/project_api";

import { get_note, save_note } from "./api/manage_api";

import { useState, useEffect, createContext } from "react";
import build_tree from "./treeBuilder";
import { useSnackbar } from "./SnackbarContext";

export const ManageContext = createContext();

export const ViewOnlyContext = createContext();

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Manage({ view_only = false }) {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { project_id, note_id } = useParams();

  const [treeData, setTreeData] = useState({ items: [] });
  const [data, setData] = useState(null);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loadingNote, setLoadingNote] = useState(false);

  const [graph, setGraph] = useState(false);

  const [loadingProject, setLoadingProject] = useState(true);

  const [showNoteSkeleton, setShowNoteSkeleton] = useState(false);
  const [showProjectSkeleton, setShowProjectSkeleton] = useState(false);

  async function refresh() {
    await getProject();
  }

  async function getProject() {
    let timeout;
    try {
      setLoadingProject(true);

      setLoadingNote(true);
      timeout = setTimeout(() => {
        setShowProjectSkeleton(true);
      }, 500);
      const projectData = await fetch_project(project_id);
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log(projectData);
      setData(projectData);
      setTreeData(build_tree(projectData.folders, projectData.notes));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProject(false);
      clearTimeout(timeout);

      setShowProjectSkeleton(false);
    }
  }

  async function render_note() {
    let timeout;
    try {
      setLoadingNote(true);
      timeout = setTimeout(() => {
        setShowNoteSkeleton(true);
      }, 500);

      const fetched_content = await get_note(note_id);

      let content = fetched_content.content || "";

      content = content.replace(/\s*$/, "\n\n\n");

      setContent(fetched_content.content || "");
      setTitle(fetched_content.name || "");
    } catch (error) {
      console.log(error);
    } finally {
      clearTimeout(timeout);

      setLoadingNote(false);
      setShowNoteSkeleton(false);
    }
  }

  async function handle_save_note() {
    try {
      await save_note(note_id, title, content);

      showSnackbar({
        title: "Saved Successfully",
        description: "Your note has been updated.",
        success: true,
      });
      // await render_note();
    } catch (error) {
      showSnackbar({
        title: error.status,
        description: error.message,
        success: false,
      });
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    refresh();

    if (note_id) {
      render_note();
    } else {
      setContent("");
      setTitle("");
    }
  }, [project_id, note_id]);

  return (
    <ViewOnlyContext.Provider value={{ view_only }}>
      <ManageContext.Provider value={{ refresh }}>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            backgroundColor: "#F8F8F8",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {/* SIDEBAR */}
          {loadingProject && showProjectSkeleton ? (
            <Box
              sx={{
                width: 270,
                height: "100vh",
                bgcolor: "#0B0B0B",
                color: "white",
                p: 2,
                borderRight: "1px solid #1E1E1E",
              }}
            >
              <Stack spacing={2}>
                {/* Project title */}
                <Skeleton
                  variant="text"
                  width="70%"
                  height={50}
                  sx={{ bgcolor: "grey.800" }}
                />

                {/* Divider */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={1}
                  sx={{ bgcolor: "grey.900" }}
                />

                {/* Notes/folders */}
                <Stack spacing={1}>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={40}
                    sx={{ bgcolor: "grey.800" }}
                  />

                  <Skeleton
                    variant="rounded"
                    width="85%"
                    height={40}
                    sx={{ bgcolor: "grey.800" }}
                  />

                  <Skeleton
                    variant="rounded"
                    width="92%"
                    height={40}
                    sx={{ bgcolor: "grey.800" }}
                  />

                  <Skeleton
                    variant="rounded"
                    width="75%"
                    height={40}
                    sx={{ bgcolor: "grey.800" }}
                  />
                </Stack>
              </Stack>
            </Box>
          ) : (
            <ProjectBar
              name={data?.project?.name}
              treeData={treeData}
              graph={graph}
              setGraph={setGraph}
            />
          )}

          {/* MAIN EDITOR */}
          {graph && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",

                height: "100%",
                bgcolor: "#ffffff",
              }}
            >
              <Graph setGraph={setGraph}></Graph>
            </Box>
          )}

          {!graph && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                bgcolor: "#ffffff",
              }}
            >
              {loadingNote && showNoteSkeleton && (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    bgcolor: "#ffffff",
                  }}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      width: "100%",
                      p: 3,
                    }}
                  >
                    {/* Title */}
                    <Skeleton variant="text" width="30%" height={70} />

                    {/* Underline */}
                    <Skeleton variant="rectangular" width="35%" height={4} />

                    {/* Content lines */}
                    <Stack spacing={1}>
                      <Skeleton variant="text" width="45%" height={40} />
                      <Skeleton variant="text" width="35%" height={40} />
                      <Skeleton variant="text" width="42%" height={40} />
                      <Skeleton variant="text" width="55%" height={40} />
                      <Skeleton variant="text" width="48%" height={40} />
                      <Skeleton variant="text" width="38%" height={40} />
                      <Skeleton variant="text" width="52%" height={40} />
                      <Skeleton variant="text" width="44%" height={40} />
                    </Stack>

                    {/* Fake save button */}
                    <Box
                      sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 32,
                      }}
                    >
                      <Skeleton variant="rounded" width={90} height={42} />
                    </Box>
                  </Stack>
                </Box>
              )}
              {!note_id && (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>Select a note to start</Typography>
                </Box>
              )}

              {note_id && !loadingNote && (
                <>
                  <Box
                    sx={{
                      px: 2,
                      pt: 3,
                      pb: 1,
                    }}
                  >
                    <TextField
                      placeholder="Untitled note"
                      variant="standard"
                      fullWidth
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      sx={{
                        "& input": {
                          fontSize: "28px",
                          fontWeight: 600,
                          borderBottom: "2px solid black",
                          width: "fit-content",
                          display: "inline-block",
                          paddingBottom: "4px",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      px: 2,
                      // pb: 3,
                      display: "flex",
                      flexDirection: "column",

                      "& .milkdown": {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      },

                      "& .milkdown .editor": {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      },

                      "& .ProseMirror": {
                        flex: 1,
                        minHeight: "100vh",
                        overflowY: "auto",
                        bgcolor: "#ffffff",
                      },
                    }}
                  >
                    <MilkdownEditor
                      noteId={note_id}
                      value={content}
                      onChange={setContent}
                    />
                  </Box>
                </>
              )}
              {note_id && !loadingNote && !view_only && (
                <Box
                  sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 32,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Tooltip
                    arrow
                    placement="top"
                    slotProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#101110",
                          p: 2,
                          maxWidth: 320,
                          "& .MuiTypography-root": {
                            fontSize: "0.95rem",
                          },
                        },
                      },
                    }}
                    title={
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            mb: 1,
                          }}
                        >
                          Markdown Shortcuts
                        </Typography>

                        <Typography># Heading</Typography>
                        <Typography>## Subheading</Typography>
                        <Typography>``` CodeBlock</Typography>
                        <Typography>**Bold**</Typography>
                        <Typography>*Italic*</Typography>
                        <Typography>- Bullet List</Typography>
                        <Typography>1. Numbered List</Typography>
                      </Box>
                    }
                  >
                    <HelpOutlineIcon
                      sx={{
                        fontSize: 25,
                        color: "#666",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                  <Button
                    onClick={async () => {
                      await handle_save_note();
                    }}
                    variant="contained"
                    sx={{ backgroundColor: "#3EC300" }}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </ManageContext.Provider>
    </ViewOnlyContext.Provider>
  );
}
