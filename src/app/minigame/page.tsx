"use client";

import { useRouter } from "next/navigation";

export default function MinigamePage() {
  const router = useRouter();

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      {/* Exit button /}
      <button
        onClick={() => router.back()}
        title="Thoát game"
        style={{
          position: "fixed",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 16px",
          background: "rgba(10,10,20,0.82)",
          border: "1px solid rgba(255,107,0,0.5)",
          borderRadius: "999px",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 700,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          letterSpacing: "0.5px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,0,0.25)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#FF6B00";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,10,20,0.82)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,0,0.5)";
        }}
      >
        ← Thoát Game
      </button>

      {/ Game iframe */}
      <iframe
        src="/hoop-legends.html"
        title="Hoop Legends – The Lost Court"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        allow="autoplay"
      />
    </div>
  );
}