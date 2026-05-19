import { Router, type IRouter } from "express";

const router: IRouter = Router();

const CARTESIA_API_KEY  = process.env.CARTESIA_API_KEY  ?? "";
const CARTESIA_VOICE_ID = process.env.CARTESIA_VOICE_ID ?? "";

router.post("/tts", async (req, res) => {
  try {
    const { text, language } = req.body as { text: string; language?: string };

    if (!text || typeof text !== "string") {
      res.status(400).json({ error: "text is required" });
      return;
    }

    if (!CARTESIA_API_KEY || !CARTESIA_VOICE_ID) {
      res.status(500).json({ error: "Cartesia TTS not configured" });
      return;
    }

    const ttsRes = await fetch("https://api.cartesia.ai/tts/bytes", {
      method: "POST",
      headers: {
        "Content-Type":    "application/json",
        "X-API-Key":       CARTESIA_API_KEY,
        "Cartesia-Version": "2024-06-10",
      },
      body: JSON.stringify({
        model_id:  "sonic-2",
        transcript: text,
        voice: {
          mode: "id",
          id:   CARTESIA_VOICE_ID,
        },
        output_format: {
          container:   "mp3",
          encoding:    "mp3",
          sample_rate: 44100,
        },
        language: language ?? "en",
      }),
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      console.error("Cartesia error:", ttsRes.status, errText);
      res.status(502).json({ error: "TTS service error" });
      return;
    }

    const audioBuffer = await ttsRes.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("TTS error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
