import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import "@milkdown/theme-nord/style.css";

function InnerEditor({ value, onChange }) {
  useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, value || "");

        const listenerInstance = ctx.get(listenerCtx);

        listenerInstance.markdownUpdated((ctx, markdown) => {
          if (onChange) onChange(markdown);
        });
      })
      .use(commonmark)
      .use(listener)
      .use(nord),
  );

  return <Milkdown />;
}

export default function MilkdownEditor(props) {
  return (
    <MilkdownProvider>
      <InnerEditor {...props} />
    </MilkdownProvider>
  );
}
