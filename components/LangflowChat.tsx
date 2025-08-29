"use client";
import { useEffect } from "react";

export default function LangflowChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <langflow-chat
      window_title="Untitled document"
      flow_id="1575782a-8ed4-43a6-b90b-aeeaa5f07ef7"
      host_url="https://jackvs720v-eduardo-apiagro.hf.space"
      auto_open="true"   // <= isto abre o chat automaticamente
    ></langflow-chat>
  );
}
