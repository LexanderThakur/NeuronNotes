function build_tree(folders, notes) {
  const folderMap = {};
  const rootNotes = [];
  const rootFolders = [];

  //   make folder object
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];

    folderMap[folder.id] = {
      id: folder.id,
      name: folder.name,
      parent: folder.parent,
      children: [],
      notes: [],
    };
  }
  //   put note into the folder

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];

    if (note.folder === null) {
      rootNotes.push(note);
    } else {
      const folderobj = folderMap[note.folder];
      if (folderobj) {
        folderobj.notes.push(note);
      }
    }
  }

  //    build tree
  for (let i = 0; i < folders.length; i++) {
    const folder = folderMap[folders[i].id];
    if (folder.parent === null) {
      rootFolders.push(folder);
    } else {
      const parent = folderMap[folder.parent];
      if (parent) {
        parent.children.push(folder);
      }
    }
  }
  return {
    folders: rootFolders,
    notes: rootNotes,
  };
}
export default build_tree;
