/*
* Vencord, a Discord client mod
* Copyright (c) 2025 Vendicated and contributors*
* SPDX-License-Identifier: GPL-3.0-or-later
*/

import definePlugin from "@utils/types";

enum Mode
{
    INSERT = "insert",
    NORMAL = "normal"
}

let mode: Mode = Mode.INSERT;
function getScroller(): HTMLElement | null
{
  const wrapper = document.querySelector('[class*="messagesWrapper_"]');
  if (!wrapper) return null;

  return wrapper.querySelector('[class*="scroller_"]') as HTMLElement;
}

function handleKeyDown(key_event: KeyboardEvent): void
{
  const spaceKeyPressed: boolean = key_event.key === "Escape";
  const hasInsertModeEnabled: boolean = mode == Mode.INSERT;
  if ( hasInsertModeEnabled )
  {
    if ( spaceKeyPressed )
    {
      mode = Mode.NORMAL;
    }
    return;
  }

  const scroller = getScroller();
  key_event.preventDefault();
  switch (key_event.key)
  {
    case "j":
      scroller?.scrollBy({ top: 50, behavior: "instant" });
      break;
    case "k":
      scroller?.scrollBy({ top: -50, behavior: "instant" });
      break;
    case "i":
      mode = Mode.INSERT;
      break;
  }
}


export default definePlugin({
    name: "vimMotion",
    description: "A plugin that allow you to use vim keymap to navigate in Discord",
    authors: [{ name: "yewspine", id: 1061439057722359808n }],
    start()
    {
      window.addEventListener("keydown", handleKeyDown, true);
    },
    stop()
    {
      window.removeEventListener("keydown", handleKeyDown, true);
    }
});
