"use client";

import Script from "next/script";

export default function ChatWidget() {
  return (
    <>
      <Script
        id="chat-widget-init"
        type="module"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: 
            `import chatWidget from "https://unpkg.com/vowwchat-widget/dist/chat-widget.mjs";

            chatWidget({
              position: "bottom-right",
              theme: "light",
              agent_id: "30e9d85e-74d3-4544-8ad7-c078475fa4f8"
            });
          `,
        }}
      />
    </>
  );
}