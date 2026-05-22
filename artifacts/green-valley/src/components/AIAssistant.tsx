import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, RotateCcw, MapPin, Volume2, VolumeX } from "lucide-react";

const BASE_PATH = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const robotImg = `${BASE_PATH}/vally-robot.png`;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  wasStreamed?: boolean; // true = arrived via SSE stream (already animated); false/absent = instant
}
type Lang = "en" | "hi";
const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

let _mid = 0;
const makeId = () => `m${++_mid}`;

const GREETINGS: Record<Lang, string> = {
  en: "Hi! I'm Vally, your Green Valley School assistant. Ask me anything about school.",
  hi: "नमस्ते! मैं Vally हूँ, आपका Green Valley School सहायक। स्कूल के बारे में कुछ भी पूछें।",
};
const PLACEHOLDERS: Record<Lang, string> = {
  en: "Type your question...",
  hi: "अपना सवाल लिखें...",
};
const SUBTITLES: Record<Lang, string> = {
  en: "Green Valley AI Assistant",
  hi: "Green Valley AI सहायक",
};

/* ── Typewriter component ── */
const CHAR_MS = 18; // ms per character

const TypewriterText = ({ text }: { text: string }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!text) return;
    let i = 0;
    setShown(0);
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= text.length) clearInterval(id);
    }, CHAR_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs only on mount — text is stable for instant messages

  const done = shown >= text.length;
  return (
    <>
      {text.slice(0, shown)}
      {!done && (
        <span
          className="inline-block rounded-full bg-primary/60 align-middle ml-0.5"
          style={{ width: "2px", height: "12px", animation: "vallyBlink 0.7s step-end infinite" }}
        />
      )}
    </>
  );
};

const speakText = async (
  text: string,
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
  language = "en",
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language }),
    });
    if (!res.ok) return;
    const blob  = await res.blob();
    const url   = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => { URL.revokeObjectURL(url); audioRef.current = null; };
    audio.onerror = () => { URL.revokeObjectURL(url); audioRef.current = null; };
    audio.play().catch(() => {});
  } catch {}
};

export const AIAssistant = ({ hidden = false }: { hidden?: boolean }) => {
  if (hidden) return null;

  const [open,      setOpen]      = useState(false);
  const [lang,      setLang]      = useState<Lang>("en");
  const [messages,  setMessages]  = useState<Message[]>([
    { id: makeId(), role: "assistant", content: GREETINGS.en },
  ]);
  const [input,     setInput]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [muted,     setMuted]     = useState(false);
  const mutedRef    = useRef(false);
  const bottomRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const idleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const toggleMute = () => {
    const next = !mutedRef.current;
    setMuted(next);
    mutedRef.current = next;
    if (next && currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
  };

  useEffect(() => {
    const hideAfterLoad = setTimeout(() => setShowLabel(false), 4000);
    return () => clearTimeout(hideAfterLoad);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowLabel(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setShowLabel(true), 3000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const switchLang = (l: Lang) => {
    if (l === lang) return;
    setLang(l);
    setMessages([{ id: makeId(), role: "assistant", content: GREETINGS[l] }]);
    setInput("");
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMsgs: Message[] = [...messages, { id: makeId(), role: "user", content: text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    const streamMsgId = makeId();
    let reply = "";
    /* Start with empty streamed placeholder */
    setMessages(p => [...p, { id: streamMsgId, role: "assistant", content: "", wasStreamed: true }]);

    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs, lang }),
      });
      const reader = res.body?.getReader();
      const dec    = new TextDecoder();
      if (!reader) throw new Error("No reader");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of dec.decode(value).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const d = JSON.parse(line.slice(6));
            if (d.content) {
              reply += d.content;
              setMessages(p => {
                const u = [...p];
                u[u.length - 1] = { ...u[u.length - 1], content: reply };
                return u;
              });
            }
            if (d.error) {
              setMessages(p => {
                const u = [...p];
                u[u.length - 1] = { ...u[u.length - 1], content: d.error };
                return u;
              });
            }
          } catch {}
        }
      }
      if (reply && !mutedRef.current) speakText(reply, currentAudioRef, lang);
    } catch {
      const err = lang === "hi"
        ? "माफ़ करें, अभी कनेक्ट नहीं हो पाया। कृपया फिर से प्रयास करें।"
        : "Sorry, I couldn't connect right now. Please try again.";
      /* Error message is instant — no wasStreamed flag so it gets typewriter */
      setMessages(p => {
        const u = [...p];
        u[u.length - 1] = { id: makeId(), role: "assistant", content: err };
        return u;
      });
    } finally { setLoading(false); }
  }, [input, loading, messages, lang]);

  const reset = () => {
    setMessages([{ id: makeId(), role: "assistant", content: GREETINGS[lang] }]);
    setInput("");
  };

  const handleStartTour = () => {
    setOpen(false);
    sessionStorage.setItem("gvps_vally_v2", "1");
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("gvps:startTour"));
    }, 200);
  };

  return (
    <>
      <style>{`
        @keyframes vallyFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes vallyBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes vallyMsgIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .vally-msg-in {
          animation: vallyMsgIn 0.22s cubic-bezier(0.34,1.3,0.64,1) both;
        }
      `}</style>

      {/* ── Floating Vally button ── */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-0">
        {!open && showLabel && (
          <span className="mb-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md animate-bounce transition-opacity duration-500">
            {lang === "hi" ? "मैं यहाँ हूँ!" : "I'm here!"}
          </span>
        )}
        <div style={{ animation: "vallyFloat 2.2s ease-in-out infinite" }}>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Open AI Assistant"
            className="relative focus:outline-none transition-transform duration-200 hover:-translate-y-3"
          >
            <img src={robotImg} alt="Vally" className="h-24 w-24 object-contain" draggable={false} />
          </button>
        </div>
      </div>

      {/* ── Chat panel ── */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[300px] max-w-[calc(100vw-20px)] rounded-2xl border border-border bg-white shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "370px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 bg-primary px-3 py-2.5">
            <img src={robotImg} alt="Vally" className="h-8 w-8 object-contain shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-xs leading-tight">Vally</div>
              <div className="text-white/70 text-[10px]">{SUBTITLES[lang]}</div>
            </div>
            <div className="flex items-center rounded-full bg-white/15 p-0.5 text-[10px] font-semibold shrink-0">
              <button onClick={() => switchLang("en")} className={`rounded-full px-2 py-0.5 transition-colors ${lang==="en" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}>EN</button>
              <button onClick={() => switchLang("hi")} className={`rounded-full px-2 py-0.5 transition-colors ${lang==="hi" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}>हिं</button>
            </div>
            <button onClick={reset} title="Reset" className="text-white/70 hover:text-white p-0.5"><RotateCcw className="h-3.5 w-3.5" /></button>
            <button onClick={toggleMute} title={muted ? "Unmute" : "Mute"} className="text-white/70 hover:text-white p-0.5">
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-0.5"><X className="h-3.5 w-3.5" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-2.5 bg-[#f8faf8]">
            {messages.map((msg, i) => {
              const isActiveStream = loading && i === messages.length - 1 && msg.role === "assistant";

              let contentNode: React.ReactNode;

              if (isActiveStream && !msg.content) {
                /* Still waiting for first token → bouncing dots */
                contentNode = (
                  <span className="flex gap-1 items-center py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:300ms]" />
                  </span>
                );
              } else if (isActiveStream) {
                /* Streaming in progress → show text + blinking cursor */
                contentNode = (
                  <>
                    {msg.content}
                    <span
                      className="inline-block rounded-full bg-primary/60 align-middle ml-0.5"
                      style={{ width: "2px", height: "12px", animation: "vallyBlink 0.7s step-end infinite" }}
                    />
                  </>
                );
              } else if (msg.role === "assistant" && !msg.wasStreamed) {
                /* Instant assistant message → typewriter animation */
                contentNode = <TypewriterText key={msg.id} text={msg.content} />;
              } else {
                /* User messages or already-streamed assistant messages → plain text */
                contentNode = msg.content;
              }

              return (
                <div
                  key={msg.id}
                  className={`flex gap-1.5 vally-msg-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <img src={robotImg} alt="" className="h-6 w-6 object-contain shrink-0 mt-0.5" />
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white text-foreground border border-border rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {contentNode}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Start Tour quick action */}
          <div className="px-3 pb-2 bg-[#f8faf8]">
            <button
              onClick={handleStartTour}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 py-1.5 text-xs font-semibold text-primary transition-colors active:scale-95"
            >
              <MapPin className="h-3.5 w-3.5" />
              {lang === "hi" ? "🗺️ वेबसाइट टूर शुरू करें" : "🗺️ Start Website Tour"}
            </button>
          </div>

          {/* Input */}
          <div className="flex items-center gap-1.5 border-t border-border bg-white px-2.5 py-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={PLACEHOLDERS[lang]}
              disabled={loading}
              className="flex-1 rounded-xl border border-border bg-[#f8faf8] px-3 py-1.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white disabled:opacity-40 hover:bg-primary/90 transition-colors active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
