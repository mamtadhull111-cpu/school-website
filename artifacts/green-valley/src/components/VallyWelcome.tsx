import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Volume2, VolumeX, X } from "lucide-react";

const BASE_PATH = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const robotImg  = `${BASE_PATH}/vally-robot.png`;
const STORAGE_KEY = "gvps_vally_v2";
const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

function fetchFromTTSApi(text: string, language = "en"): Promise<HTMLAudioElement | null> {
  return fetch(`${BASE_URL}/api/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  })
    .then(res => (res.ok ? res.blob() : Promise.reject(res)))
    .then(blob => {
      const url   = URL.createObjectURL(blob);
      const audio = new Audio(url);
      return audio;
    })
    .catch(() => null);
}

function fetchTTSAudio(text: string, language = "en", stepIndex?: number): Promise<HTMLAudioElement | null> {
  if (stepIndex !== undefined) {
    const staticUrl = `${BASE_PATH}/audio/tour-${stepIndex}-${language}.mp3`;
    return fetch(staticUrl)
      .then(res => {
        if (!res.ok) throw new Error("not found");
        const audio = new Audio(staticUrl);
        return audio as HTMLAudioElement;
      })
      .catch(() => fetchFromTTSApi(text, language));
  }
  return fetchFromTTSApi(text, language);
}

type Lang  = "en" | "hi";
type Phase = "idle" | "welcome" | "tour" | "done";

/* ─── Bilingual tour steps ──────────────────────────────────────────────── */
const TOUR_STEPS = [
  {
    path: "/",
    title: { en: "🏠 Home Page", hi: "🏠 होम पेज" },
    text: {
      en: "Welcome to Green Valley Public School — established in 2006 in the village of Pai, Kaithal, Haryana. We are affiliated to both CBSE and the Haryana State Board. On this Home page you can see our school building, key highlights like 900+ students and 90+ awards, why parents choose us, our academic programmes, a gallery preview, and real testimonials from our families.",
      hi: "ग्रीन वैली पब्लिक स्कूल में आपका स्वागत है — 2006 में गाँव पाई, कैथल, हरियाणा में स्थापित। हम CBSE और हरियाणा राज्य बोर्ड दोनों से संबद्ध हैं। इस होम पेज पर आप स्कूल की इमारत, 900+ छात्र और 90+ पुरस्कार जैसी प्रमुख जानकारी, हमारे कार्यक्रम, गैलरी की झलक और अभिभावकों के अनुभव देख सकते हैं।",
    },
  },
  {
    path: "/about",
    title: { en: "📖 About Us", hi: "📖 हमारे बारे में" },
    text: {
      en: "Green Valley was founded in the year 2000 with a dream to bring quality education to village Pai. Our Vision is to help every child discover their unique strengths and grow into a compassionate, curious, and capable young adult. Our Mission blends academic rigour with art, sport, and character. We stand by four core values — Integrity, Excellence, Compassion, and Innovation. Key milestones include our Senior Secondary wing in 2008, smart classrooms in 2014, and crossing 1,200 students with alumni in over 80 universities by 2024.",
      hi: "ग्रीन वैली की स्थापना 2000 में गाँव पाई में गुणवत्तापूर्ण शिक्षा लाने के सपने के साथ हुई। हमारी दृष्टि हर बच्चे को उनकी अनूठी ताकत खोजने और एक दयालु, जिज्ञासु और सक्षम युवा बनने में मदद करना है। हमारा मिशन शैक्षणिक कठोरता को कला, खेल और चरित्र के साथ मिलाना है। हमारे चार मूल मूल्य हैं — ईमानदारी, उत्कृष्टता, करुणा और नवाचार। 2008 में सीनियर सेकेंडरी विंग, 2014 में स्मार्ट क्लासरूम और 2024 तक 80+ विश्वविद्यालयों में पूर्व छात्रों के साथ 1,200+ छात्र प्रमुख मील के पत्थर हैं।",
    },
  },
  {
    path: "/academics",
    title: { en: "📚 Academics", hi: "📚 शिक्षा" },
    text: {
      en: "Our CBSE-aligned curriculum runs across five stages — Pre-Primary for Nursery and KG with play-based learning; Primary for Classes 1 to 5; Middle School for Classes 6 to 8 with lab-based science; Secondary for Classes 9 and 10 with full Board preparation; and Senior Secondary for Classes 11 and 12 offering Science with PCM or PCB, Commerce, and Arts streams. School runs from 8 AM to 2:50 PM with eight periods daily. Beyond class we have sports, visual arts, music, dance, and a library with over 10,000 titles.",
      hi: "हमारा CBSE-संरेखित पाठ्यक्रम पाँच चरणों में चलता है — नर्सरी और KG के लिए प्री-प्राइमरी; कक्षा 1 से 5 तक प्राइमरी; कक्षा 6 से 8 तक मिडिल स्कूल; कक्षा 9 और 10 के लिए बोर्ड तैयारी; और कक्षा 11-12 के लिए विज्ञान (PCM/PCB), वाणिज्य और कला धाराएँ। स्कूल सुबह 8 बजे से दोपहर 2:50 बजे तक चलता है, आठ पीरियड रोज़ होते हैं। कक्षा से परे खेल, कला, संगीत, नृत्य और 10,000+ पुस्तकों वाला पुस्तकालय है।",
    },
  },
  {
    path: "/faculty",
    title: { en: "👨‍🏫 Faculty", hi: "👨‍🏫 शिक्षक" },
    text: {
      en: "Meet the teachers who make Green Valley what it is — experienced, kind, and quietly dedicated. Our faculty spans five departments: Science, Mathematics, Languages, Arts and Sports, and Computer. You can search any teacher by name, subject, or department, view the full team, or browse by Leadership and by Department. Each card shows their qualifications and years of experience.",
      hi: "उन शिक्षकों से मिलें जो ग्रीन वैली को खास बनाते हैं — अनुभवी, दयालु और समर्पित। हमारे शिक्षक पाँच विभागों में हैं: विज्ञान, गणित, भाषाएँ, कला व खेल और कंप्यूटर। आप किसी भी शिक्षक को नाम, विषय या विभाग से खोज सकते हैं, पूरी टीम देख सकते हैं, या नेतृत्व और विभाग के अनुसार ब्राउज़ कर सकते हैं।",
    },
  },
  {
    path: "/admissions",
    title: { en: "📋 Admissions 2025–26", hi: "📋 प्रवेश 2025–26" },
    text: {
      en: "Admissions for 2025–26 are open! The process has four simple steps — Inquire online, Apply at the school office, a friendly Assessment with your child, and then Confirmation by email. Fee structure ranges from ₹5,000 admission and ₹6,500 per quarter for Pre-Primary, up to ₹9,000 admission and ₹12,500 per quarter for Senior Secondary. Required documents include birth certificate, transfer certificate, report card, passport photos, and Aadhaar. You can submit the inquiry form right here on this page.",
      hi: "2025–26 के लिए प्रवेश खुले हैं! प्रक्रिया में चार सरल चरण हैं — ऑनलाइन पूछताछ, स्कूल कार्यालय में आवेदन, बच्चे के साथ मूल्यांकन, और फिर ईमेल पर पुष्टि। शुल्क संरचना प्री-प्राइमरी के लिए ₹5,000 प्रवेश और ₹6,500 प्रति तिमाही से लेकर सीनियर सेकेंडरी के लिए ₹9,000 और ₹12,500 प्रति तिमाही तक है। आवश्यक दस्तावेजों में जन्म प्रमाणपत्र, स्थानांतरण प्रमाणपत्र, रिपोर्ट कार्ड, फोटो और आधार शामिल हैं। आप इस पेज से ही पूछताछ फॉर्म भर सकते हैं।",
    },
  },
  {
    path: "/gallery",
    title: { en: "🖼️ Gallery", hi: "🖼️ गैलरी" },
    text: {
      en: "The Gallery is a window into everyday life at Green Valley — browse photos and videos filtered by Campus, Events, Sports, Cultural activities, and Annual Day celebrations. Click any image to open it in fullscreen. You can also watch our school video that captures the spirit of campus life throughout the year.",
      hi: "गैलरी ग्रीन वैली के रोज़मर्रा की झलक है — कैंपस, कार्यक्रम, खेल, सांस्कृतिक गतिविधियाँ और वार्षिक दिवस की तस्वीरें और वीडियो देखें। किसी भी तस्वीर पर क्लिक करके उसे फुलस्क्रीन में खोलें। आप हमारा स्कूल वीडियो भी देख सकते हैं जो कैंपस जीवन की भावना को कैद करता है।",
    },
  },
  {
    path: "/contact",
    title: { en: "📍 Contact Us", hi: "📍 संपर्क करें" },
    text: {
      en: "You can reach us at Village Pai, Kaithal, Haryana — 136027. Call or WhatsApp us on 099960 65035, or email at greenvalleypai@gmail.com. Our office is open Monday to Saturday from 8:00 AM to 3:30 PM. You can also send a message directly through the form on this page, and we respond within one working day. A live map shows our exact location in Pai.",
      hi: "आप हमसे विलेज पाई, कैथल, हरियाणा — 136027 पर संपर्क कर सकते हैं। 099960 65035 पर कॉल या WhatsApp करें, या greenvalleypai@gmail.com पर ईमेल करें। हमारा कार्यालय सोमवार से शनिवार, सुबह 8 बजे से दोपहर 3:30 बजे तक खुला रहता है। इस पेज पर फॉर्म के ज़रिए भी संदेश भेजें — हम एक कार्यदिवस में जवाब देते हैं। लाइव मैप पर पाई में हमारी सटीक लोकेशन देखें।",
    },
  },
  {
    path: "/",
    title: { en: "🎉 Tour Complete!", hi: "🎉 टूर पूरा हुआ!" },
    text: {
      en: "That's the full tour of Green Valley Public School! We hope you got a clear picture of who we are, what we teach, and how we can be the right school for your child. I'm Vally — always at the bottom-right corner. Click me anytime to ask about admissions, fees, academics, or anything else.",
      hi: "यह था ग्रीन वैली पब्लिक स्कूल का पूरा दौरा! हमें उम्मीद है कि आपको हमारे बारे में, हम क्या पढ़ाते हैं, और हम आपके बच्चे के लिए सही स्कूल कैसे हो सकते हैं, इसकी स्पष्ट तस्वीर मिली। मैं वैली हूँ — हमेशा नीचे-दाईं ओर। प्रवेश, शुल्क, पढ़ाई या किसी भी चीज़ के बारे में पूछने के लिए कभी भी क्लिक करें।",
    },
  },
];

const SCROLL_DURATION_MS = 13000; // scroll the full page slowly over 13 seconds

/* ─── Component ─────────────────────────────────────────────────────────── */
interface Props { onTourStart: () => void; onTourEnd: () => void; }

export const VallyWelcome = ({ onTourStart, onTourEnd }: Props) => {
  const [phase,    setPhase]    = useState<Phase>("idle");
  const [visible,  setVisible]  = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [lang,     setLang]     = useState<Lang>("en");
  const [muted,    setMuted]    = useState(false);
  const navigate = useNavigate();

  /* Refs for use inside async / rAF callbacks (avoid stale closures) */
  const phaseRef    = useRef<Phase>("idle");
  const tourStepRef = useRef(0);
  const langRef     = useRef<Lang>("en");
  const mutedRef    = useRef(false);
  const scrollId       = useRef<number>(0);
  const scriptScrollId = useRef<number>(0);
  const autoTimer      = useRef<ReturnType<typeof setTimeout>>();
  const navigateRef    = useRef(navigate);
  const scriptBoxRef   = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef      = useRef<Promise<HTMLAudioElement | null> | null>(null);

  const stopSpeech = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
  };

  /* Keep refs in sync */
  useEffect(() => { phaseRef.current    = phase;    }, [phase]);
  useEffect(() => { tourStepRef.current = tourStep; }, [tourStep]);

  /* Auto-scroll script box to top on each new step */
  useEffect(() => {
    if (scriptBoxRef.current) scriptBoxRef.current.scrollTop = 0;
  }, [tourStep]);
  useEffect(() => { langRef.current     = lang;     }, [lang]);
  useEffect(() => { mutedRef.current    = muted;    }, [muted]);
  useEffect(() => { navigateRef.current = navigate; }, [navigate]);

  /* Cleanup on unmount */
  useEffect(() => () => {
    cancelAnimationFrame(scrollId.current);
    cancelAnimationFrame(scriptScrollId.current);
    clearTimeout(autoTimer.current);
    stopSpeech();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── helpers ── */
  const stopAll = () => {
    cancelAnimationFrame(scrollId.current);
    cancelAnimationFrame(scriptScrollId.current);
    clearTimeout(autoTimer.current);
    stopSpeech();
  };

  const startScrollAnim = () => {
    cancelAnimationFrame(scrollId.current);
    const t0 = Date.now();
    const tick = () => {
      const elapsed  = Date.now() - t0;
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
      const maxY     = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (maxY > 0) window.scrollTo(0, maxY * progress);
      if (progress < 1) scrollId.current = requestAnimationFrame(tick);
    };
    scrollId.current = requestAnimationFrame(tick);
  };

  const startScriptScrollAnim = () => {
    cancelAnimationFrame(scriptScrollId.current);
    /* Wait one frame so the new text is rendered and scrollHeight is correct */
    scriptScrollId.current = requestAnimationFrame(() => {
      const box = scriptBoxRef.current;
      if (!box) return;
      const t0 = Date.now();
      const tick = () => {
        const elapsed  = Date.now() - t0;
        const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
        const maxScroll = box.scrollHeight - box.clientHeight;
        if (maxScroll > 0) box.scrollTop = maxScroll * progress;
        if (progress < 1) scriptScrollId.current = requestAnimationFrame(tick);
      };
      scriptScrollId.current = requestAnimationFrame(tick);
    });
  };

  /* ── core: run a specific step ── */
  const runStep = useCallback((step: number) => {
    stopAll();
    const s = TOUR_STEPS[step];
    setTourStep(step);
    tourStepRef.current = step;
    setVisible(false);

    const text    = s.text[langRef.current];
    const isMuted = mutedRef.current;

    /* Use preloaded audio for step 0; fetch fresh for all other steps */
    const audioPromise: Promise<HTMLAudioElement | null> = isMuted
      ? Promise.resolve(null)
      : (step === 0 && preloadRef.current)
        ? (() => { const p = preloadRef.current!; preloadRef.current = null; return p; })()
        : fetchTTSAudio(text, langRef.current, step);

    setTimeout(() => {
      navigateRef.current(s.path);

      /* Wait for BOTH: layout settle (320ms) + audio ready — then show + play together */
      const settlePromise = new Promise<void>(resolve => setTimeout(resolve, 320));

      Promise.all([settlePromise, audioPromise]).then(([, audio]) => {
        if (phaseRef.current !== "tour") {
          if (audio) URL.revokeObjectURL(audio.src);
          return;
        }

        /* Show tour overlay and start scroll exactly when audio is ready */
        setVisible(true);
        startScrollAnim();
        startScriptScrollAnim();

        if (!isMuted) {
          if (!audio) {
            /* TTS failed — auto-advance after delay */
            autoTimer.current = setTimeout(() => {
              if (phaseRef.current !== "tour") return;
              const next = tourStepRef.current + 1;
              if (next >= TOUR_STEPS.length) doEndTour();
              else runStep(next);
            }, 5000);
            return;
          }
          currentAudioRef.current = audio;
          audio.onended = () => {
            URL.revokeObjectURL(audio.src);
            currentAudioRef.current = null;
            cancelAnimationFrame(scrollId.current);
            if (phaseRef.current !== "tour") return;
            autoTimer.current = setTimeout(() => {
              const next = tourStepRef.current + 1;
              if (next >= TOUR_STEPS.length) doEndTour();
              else runStep(next);
            }, 700);
          };
          audio.onerror = () => {
            URL.revokeObjectURL(audio.src);
            currentAudioRef.current = null;
            if (phaseRef.current !== "tour") return;
            autoTimer.current = setTimeout(() => {
              const next = tourStepRef.current + 1;
              if (next >= TOUR_STEPS.length) doEndTour();
              else runStep(next);
            }, 5000);
          };
          audio.play().catch(() => {
            if (phaseRef.current !== "tour") return;
            autoTimer.current = setTimeout(() => {
              const next = tourStepRef.current + 1;
              if (next >= TOUR_STEPS.length) doEndTour();
              else runStep(next);
            }, 5000);
          });
        } else {
          /* Muted → auto-advance after estimated reading time */
          const words    = text.split(/\s+/).length;
          const readTime = Math.max(Math.round((words / 140) * 60000), 4500);
          autoTimer.current = setTimeout(() => {
            if (phaseRef.current !== "tour") return;
            const next = tourStepRef.current + 1;
            if (next >= TOUR_STEPS.length) doEndTour();
            else runStep(next);
          }, readTime);
        }
      });
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doEndTour = useCallback(() => {
    /* Mark phase dead immediately so any in-flight speech onend/onerror
       callbacks cannot re-trigger runStep */
    phaseRef.current = "done";
    stopAll();
    setVisible(false);
    setPhase("done");
    onTourEnd();
    navigateRef.current("/");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTourEnd]);

  const beginTour = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    setTimeout(() => {
      setPhase("tour");
      phaseRef.current = "tour";
      onTourStart();
      runStep(0);
    }, 50);
  }, [onTourStart, runStep]);

  /* ── show welcome modal on first visit ── */
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      setPhase("welcome");
      setTimeout(() => setVisible(true), 30);
      /* Preload step 0 audio while user reads the welcome modal */
      if (!mutedRef.current) {
        preloadRef.current = fetchTTSAudio(
          TOUR_STEPS[0].text[langRef.current],
          langRef.current,
          0,
        );
      }
    }, 700);
    return () => clearTimeout(t);
  }, []);

  /* ── listen for external "start tour" event (from chatbox) ── */
  useEffect(() => {
    const handler = () => {
      setPhase("tour");
      phaseRef.current = "tour";
      onTourStart();
      runStep(0);
    };
    window.addEventListener("gvps:startTour", handler);
    return () => window.removeEventListener("gvps:startTour", handler);
  }, [onTourStart, runStep]);

  /* ── dismiss welcome modal ── */
  const dismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 400);
  };

  /* ── manual Next ── */
  const handleNext = () => {
    const next = tourStepRef.current + 1;
    if (next >= TOUR_STEPS.length) doEndTour();
    else runStep(next);
  };

  /* ── language switch ── */
  const switchLang = (l: Lang) => {
    setLang(l);
    langRef.current = l;
    if (phaseRef.current === "tour") runStep(tourStepRef.current);
  };

  /* ── mute toggle ── */
  const toggleMute = () => {
    const next = !mutedRef.current;
    setMuted(next);
    mutedRef.current = next;
    if (phaseRef.current === "tour") {
      if (next) {
        stopSpeech();
        clearTimeout(autoTimer.current);
        const words = TOUR_STEPS[tourStepRef.current].text[langRef.current].split(/\s+/).length;
        const t     = Math.max(Math.round((words / 140) * 60000), 4500);
        autoTimer.current = setTimeout(() => {
          if (phaseRef.current !== "tour") return;
          const nx = tourStepRef.current + 1;
          if (nx >= TOUR_STEPS.length) doEndTour();
          else runStep(nx);
        }, t);
      } else {
        runStep(tourStepRef.current);
      }
    }
  };

  /* ── render ── */
  if (phase === "idle" || phase === "done") return null;

  return (
    <>
      {/* ════ WELCOME MODAL ════════════════════════════════════════════ */}
      {phase === "welcome" && (
        <>
          <style>{`
            @keyframes vallyFloat {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-14px); }
            }
          `}</style>
          <div
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              transition: "opacity 0.4s",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* Outer wrapper — Vally above, box below */}
            <div
              className="flex flex-col items-center w-full max-w-sm"
              style={{
                transform: visible ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s",
                opacity: visible ? 1 : 0,
              }}
            >
              {/* ── Vally robot — floats OUTSIDE the box ── */}
              <div
                className="relative z-10"
                style={{
                  animation: "vallyFloat 2.2s ease-in-out infinite",
                  marginBottom: "-56px",
                }}
              >
                <img
                  src={robotImg}
                  alt="Vally"
                  className="h-36 w-36 object-contain drop-shadow-2xl"
                />
              </div>

              {/* ── Box — text + buttons only ── */}
              <div className="relative w-full rounded-3xl bg-white shadow-2xl overflow-hidden">
                <div className="h-2 bg-primary w-full" />
                <button
                  onClick={dismiss}
                  className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors text-muted-foreground"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex flex-col items-center gap-4 px-8 pb-8 pt-14 text-center">
                  <div>
                    <p className="text-xl font-bold text-foreground leading-snug">
                      Welcome to Green Valley Public School 🌿
                    </p>
                    <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                      I'm <span className="font-semibold text-primary">Vally</span>. How can I help you today?
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-3 mt-1">
                    <button
                      onClick={beginTour}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/80 hover:scale-[1.04] hover:shadow-[0_6px_24px_hsl(var(--primary)/0.45)] active:scale-95 transition-all duration-200"
                    >
                      Start Tour <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={dismiss}
                      className="w-full rounded-2xl border border-border py-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:border-primary/40 hover:text-primary hover:scale-[1.04] active:scale-95 transition-all duration-200"
                    >
                      No Thanks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* ════ TOUR BUBBLE ═══════════════════════════════════════════════ */}
      {phase === "tour" && (
        <div
          className="fixed bottom-4 right-4 z-[300] flex flex-col items-end gap-2"
          style={{
            transition: "opacity 0.3s, transform 0.3s",
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {/* Speech bubble card */}
          <div className="w-[300px] rounded-2xl rounded-br-sm bg-white border border-primary/20 shadow-2xl overflow-hidden">

            {/* ── header ── */}
            <div className="flex items-center justify-between bg-primary px-3 py-2.5 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <img src={robotImg} alt="Vally" className="h-7 w-7 object-contain shrink-0" />
                <span className="text-xs font-bold text-white truncate">Vally — Tour</span>
              </div>

              {/* controls: lang toggle + mute + close */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Language toggle */}
                <div className="flex items-center rounded-full bg-white/15 p-0.5 text-[10px] font-semibold">
                  <button
                    onClick={() => switchLang("en")}
                    className={`rounded-full px-2 py-0.5 transition-colors ${lang === "en" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}
                  >EN</button>
                  <button
                    onClick={() => switchLang("hi")}
                    className={`rounded-full px-2 py-0.5 transition-colors ${lang === "hi" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}
                  >हिं</button>
                </div>

                {/* Volume */}
                <button
                  onClick={toggleMute}
                  title={muted ? "Unmute" : "Mute"}
                  className="text-white/70 hover:text-white transition-colors p-0.5"
                  aria-label={muted ? "Unmute Vally" : "Mute Vally"}
                >
                  {muted
                    ? <VolumeX className="h-4 w-4" />
                    : <Volume2 className="h-4 w-4" />}
                </button>

                {/* Close / end tour */}
                <button
                  onClick={doEndTour}
                  className="text-white/70 hover:text-white transition-colors p-0.5"
                  aria-label="End tour"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── progress bar ── */}
            <div className="flex gap-1 px-4 pt-3">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-colors duration-300"
                  style={{ background: i <= tourStep ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                />
              ))}
            </div>

            {/* ── step content ── */}
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-semibold text-primary mb-1.5">
                {TOUR_STEPS[tourStep].title[lang]}
              </p>
              <div
                ref={scriptBoxRef}
                className="overflow-y-auto pr-1 text-sm text-foreground leading-relaxed"
                style={{ maxHeight: "160px" }}
              >
                {TOUR_STEPS[tourStep].text[lang]}
              </div>
            </div>

            {/* ── action row ── */}
            <div className="flex gap-2 px-4 pb-4">
              <button
                onClick={handleNext}
                className="flex-1 rounded-xl bg-primary py-2 text-sm font-semibold text-white hover:bg-primary/90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1"
              >
                {tourStep < TOUR_STEPS.length - 1 ? (
                  <>{lang === "hi" ? "अगला" : "Next"} <ChevronRight className="h-3.5 w-3.5" /></>
                ) : (
                  lang === "hi" ? "समाप्त 🎉" : "Done 🎉"
                )}
              </button>
              {tourStep < TOUR_STEPS.length - 1 && (
                <button
                  onClick={doEndTour}
                  className="rounded-xl border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted active:scale-95 transition-all duration-200"
                >
                  {lang === "hi" ? "छोड़ें" : "Skip"}
                </button>
              )}
            </div>

            {/* bubble tail */}
            <div className="flex justify-end pr-5 -mt-1 pb-1">
              <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-white" />
            </div>
          </div>

          {/* Vally robot avatar */}
          <div className="w-20 h-20 relative">
            <img src={robotImg} alt="Vally" className="w-full h-full object-contain drop-shadow-xl" />
            <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-green-400 border-2 border-white shadow" />
          </div>
        </div>
      )}
    </>
  );
};
