// app/og/route.tsx
// Dynamic OG image generation
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Compliante Solutions";
  const description = searchParams.get("description") || "Your Complete Healthcare Business Partner";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          backgroundImage: "linear-gradient(135deg, #f0f4f8 0%, #e9f5f4 100%)",
        }}
      >
        {/* Logo/Brand Area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #1C4E80 0%, #3CAEA3 100%)",
              backgroundClip: "text",
              color: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            COMPLIANTE
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "#1C4E80",
            textAlign: "center",
            maxWidth: "90%",
            marginBottom: 20,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 30,
            color: "#4A4A4A",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {description}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#3CAEA3",
          }}
        >
          Compliance • Risk • Revenue • Innovation
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
