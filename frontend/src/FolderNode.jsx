import { useState } from "react";

function FolderNode({ folder }) {
  const [open, setOpen] = useState(false);

  function toggleFolder() {
    setOpen(!open);
  }

  return (
    <div style={{ marginLeft: "16px" }}>
      <div onClick={toggleFolder}>{folder.name}</div>

      {open && (
        <div>
          {folder.notes.map(function (note) {
            return <div key={note.id}>{note.name}</div>;
          })}

          {folder.children.map(function (child) {
            return <FolderNode key={child.id} folder={child} />;
          })}
        </div>
      )}
    </div>
  );
}

export default FolderNode;
