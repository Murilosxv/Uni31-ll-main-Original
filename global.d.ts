// global.d.ts
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "langflow-chat": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {}
