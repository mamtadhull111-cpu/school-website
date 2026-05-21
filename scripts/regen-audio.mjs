/**
 * Green Valley — Audio Regeneration Script
 * ──────────────────────────────────────────
 * Regenerates all 16 tour voice files (8 steps × EN + HI) using Cartesia TTS.
 * Falls back to Google TTS (free) if Cartesia credits are insufficient.
 *
 * Usage:
 *   node scripts/regen-audio.mjs           — regenerate all files
 *   node scripts/regen-audio.mjs 6 7       — regenerate specific steps only
 */

import fs from "fs";
import { execSync } from "child_process";
import { createRequire } from "module";

const OUT_DIR = "artifacts/green-valley/public/audio";
const ENV_FILE = "artifacts/api-server/.env";

// ── Load env vars from api-server/.env ────────────────────────────────────
function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs.readFileSync(file, "utf8")
      .split("\n")
      .filter(l => l.trim() && !l.startsWith("#") && l.includes("="))
      .map(l => {
        const [k, ...v] = l.split("=");
        return [k.trim(), v.join("=").trim()];
      })
  );
}

const env = loadEnv(ENV_FILE);
const CARTESIA_API_KEY  = env.CARTESIA_API_KEY  || "";
const CARTESIA_VOICE_ID = env.CARTESIA_VOICE_ID || "";

// ── Tour steps ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    slug: "tour-0",
    en: "Welcome to Green Valley Public School — established in 2006 in the village of Pai, Kaithal, Haryana. We are affiliated to both CBSE and the Haryana State Board. On this Home page you can see our school building, key highlights like 900+ students and 90+ awards, why parents choose us, our academic programmes, a gallery preview, and real testimonials from our families.",
    hi: "ग्रीन वैली पब्लिक स्कूल में आपका स्वागत है — 2006 में गाँव पाई, कैथल, हरियाणा में स्थापित। हम CBSE और हरियाणा राज्य बोर्ड दोनों से संबद्ध हैं। इस होम पेज पर आप स्कूल की इमारत, 900+ छात्र और 90+ पुरस्कार जैसी प्रमुख जानकारी, हमारे कार्यक्रम, गैलरी की झलक और अभिभावकों के अनुभव देख सकते हैं।",
  },
  {
    slug: "tour-1",
    en: "Green Valley was founded in the year 2000 with a dream to bring quality education to village Pai. Our Vision is to help every child discover their unique strengths and grow into a compassionate, curious, and capable young adult. Our Mission blends academic rigour with art, sport, and character. We stand by four core values — Integrity, Excellence, Compassion, and Innovation. Key milestones include our Senior Secondary wing in 2008, smart classrooms in 2014, and crossing 1,200 students with alumni in over 80 universities by 2024.",
    hi: "ग्रीन वैली की स्थापना 2000 में गाँव पाई में गुणवत्तापूर्ण शिक्षा लाने के सपने के साथ हुई। हमारी दृष्टि हर बच्चे को उनकी अनूठी ताकत खोजने और एक दयालु, जिज्ञासु और सक्षम युवा बनने में मदद करना है। हमारा मिशन शैक्षणिक कठोरता को कला, खेल और चरित्र के साथ मिलाना है। हमारे चार मूल मूल्य हैं — ईमानदारी, उत्कृष्टता, करुणा और नवाचार। 2008 में सीनियर सेकेंडरी विंग, 2014 में स्मार्ट क्लासरूम और 2024 तक 80+ विश्वविद्यालयों में पूर्व छात्रों के साथ 1,200+ छात्र प्रमुख मील के पत्थर हैं।",
  },
  {
    slug: "tour-2",
    en: "Our CBSE-aligned curriculum runs across five stages — Pre-Primary for Nursery and KG with play-based learning; Primary for Classes 1 to 5; Middle School for Classes 6 to 8 with lab-based science; Secondary for Classes 9 and 10 with full Board preparation; and Senior Secondary for Classes 11 and 12 offering Science with PCM or PCB, Commerce, and Arts streams. School runs from 8 AM to 2:50 PM with eight periods daily. Beyond class we have sports, visual arts, music, dance, and a library with over 10,000 titles.",
    hi: "हमारा CBSE-संरेखित पाठ्यक्रम पाँच चरणों में चलता है — नर्सरी और KG के लिए प्री-प्राइमरी; कक्षा 1 से 5 तक प्राइमरी; कक्षा 6 से 8 तक मिडिल स्कूल; कक्षा 9 और 10 के लिए बोर्ड तैयारी; और कक्षा 11-12 के लिए विज्ञान (PCM/PCB), वाणिज्य और कला धाराएँ। स्कूल सुबह 8 बजे से दोपहर 2:50 बजे तक चलता है, आठ पीरियड रोज़ होते हैं। कक्षा से परे खेल, कला, संगीत, नृत्य और 10,000+ पुस्तकों वाला पुस्तकालय है।",
  },
  {
    slug: "tour-3",
    en: "Meet the teachers who make Green Valley what it is — experienced, kind, and quietly dedicated. Our faculty spans five departments: Science, Mathematics, Languages, Arts and Sports, and Computer. You can search any teacher by name, subject, or department, view the full team, or browse by Leadership and by Department. Each card shows their qualifications and years of experience.",
    hi: "उन शिक्षकों से मिलें जो ग्रीन वैली को खास बनाते हैं — अनुभवी, दयालु और समर्पित। हमारे शिक्षक पाँच विभागों में हैं: विज्ञान, गणित, भाषाएँ, कला व खेल और कंप्यूटर। आप किसी भी शिक्षक को नाम, विषय या विभाग से खोज सकते हैं, पूरी टीम देख सकते हैं, या नेतृत्व और विभाग के अनुसार ब्राउज़ कर सकते हैं।",
  },
  {
    slug: "tour-4",
    en: "Admissions for 2025–26 are open! The process has four simple steps — Inquire online, Apply at the school office, a friendly Assessment with your child, and then Confirmation by email. Fee structure ranges from ₹5,000 admission and ₹6,500 per quarter for Pre-Primary, up to ₹9,000 admission and ₹12,500 per quarter for Senior Secondary. Required documents include birth certificate, transfer certificate, report card, passport photos, and Aadhaar. You can submit the inquiry form right here on this page.",
    hi: "2025–26 के लिए प्रवेश खुले हैं! प्रक्रिया में चार सरल चरण हैं — ऑनलाइन पूछताछ, स्कूल कार्यालय में आवेदन, बच्चे के साथ मूल्यांकन, और फिर ईमेल पर पुष्टि। शुल्क संरचना प्री-प्राइमरी के लिए ₹5,000 प्रवेश और ₹6,500 प्रति तिमाही से लेकर सीनियर सेकेंडरी के लिए ₹9,000 और ₹12,500 प्रति तिमाही तक है। आवश्यक दस्तावेजों में जन्म प्रमाणपत्र, स्थानांतरण प्रमाणपत्र, रिपोर्ट कार्ड, फोटो और आधार शामिल हैं। आप इस पेज से ही पूछताछ फॉर्म भर सकते हैं।",
  },
  {
    slug: "tour-5",
    en: "The Gallery is a window into everyday life at Green Valley — browse photos and videos filtered by Campus, Events, Sports, Cultural activities, and Annual Day celebrations. Click any image to open it in fullscreen. You can also watch our school video that captures the spirit of campus life throughout the year.",
    hi: "गैलरी ग्रीन वैली के रोज़मर्रा की झलक है — कैंपस, कार्यक्रम, खेल, सांस्कृतिक गतिविधियाँ और वार्षिक दिवस की तस्वीरें और वीडियो देखें। किसी भी तस्वीर पर क्लिक करके उसे फुलस्क्रीन में खोलें। आप हमारा स्कूल वीडियो भी देख सकते हैं जो कैंपस जीवन की भावना को कैद करता है।",
  },
  {
    slug: "tour-6",
    en: "You can reach us at Village Pai, Kaithal, Haryana — 136027. Call or WhatsApp us on 099960 65035, or email at greenvalleypai@gmail.com. Our office is open Monday to Saturday from 8:00 AM to 3:30 PM. You can also send a message directly through the form on this page, and we respond within one working day. A live map shows our exact location in Pai.",
    hi: "आप हमसे विलेज पाई, कैथल, हरियाणा — 136027 पर संपर्क कर सकते हैं। 099960 65035 पर कॉल या WhatsApp करें, या greenvalleypai@gmail.com पर ईमेल करें। हमारा कार्यालय सोमवार से शनिवार, सुबह 8 बजे से दोपहर 3:30 बजे तक खुला रहता है। इस पेज पर फॉर्म के ज़रिए भी संदेश भेजें — हम एक कार्यदिवस में जवाब देते हैं। लाइव मैप पर पाई में हमारी सटीक लोकेशन देखें।",
  },
  {
    slug: "tour-7",
    en: "That's the full tour of Green Valley Public School! We hope you got a clear picture of who we are, what we teach, and how we can be the right school for your child. I'm Vally — always at the bottom-right corner. Click me anytime to ask about admissions, fees, academics, or anything else.",
    hi: "यह था ग्रीन वैली पब्लिक स्कूल का पूरा दौरा! हमें उम्मीद है कि आपको हमारे बारे में, हम क्या पढ़ाते हैं, और हम आपके बच्चे के लिए सही स्कूल कैसे हो सकते हैं, इसकी स्पष्ट तस्वीर मिली। मैं वैली हूँ — हमेशा नीचे-दाईं ओर। प्रवेश, शुल्क, पढ़ाई या किसी भी चीज़ के बारे में पूछने के लिए कभी भी क्लिक करें।",
  },
];

// ── Cartesia TTS ───────────────────────────────────────────────────────────
async function generateCartesia(text, language, outFile) {
  if (!CARTESIA_API_KEY || !CARTESIA_VOICE_ID) throw new Error("Cartesia keys not set");
  const res = await fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: {
      "Content-Type":     "application/json",
      "X-API-Key":        CARTESIA_API_KEY,
      "Cartesia-Version": "2024-06-10",
    },
    body: JSON.stringify({
      model_id:  "sonic-2",
      transcript: text,
      voice:     { mode: "id", id: CARTESIA_VOICE_ID },
      output_format: { container: "mp3", encoding: "mp3", sample_rate: 44100 },
      language,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cartesia ${res.status}: ${err}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outFile, buf);
  return buf.length;
}

// ── Google TTS fallback (free) ─────────────────────────────────────────────
function generateGoogleFallback(text, language, outFile) {
  const lang = language === "hi" ? "hi" : "en";
  const tld  = language === "hi" ? "co.in" : "com";
  const py   = `
from gtts import gTTS
tts = gTTS(text=${JSON.stringify(text)}, lang="${lang}", tld="${tld}", slow=False)
tts.save(${JSON.stringify(outFile)})
`;
  execSync(`python3 -c '${py.replace(/'/g, "'\\''")}'`);
  return fs.statSync(outFile).size;
}

// ── Main ───────────────────────────────────────────────────────────────────
fs.mkdirSync(OUT_DIR, { recursive: true });

const stepFilter = process.argv.slice(2).map(Number).filter(n => !isNaN(n));
const stepsToRun = stepFilter.length > 0
  ? STEPS.filter((_, i) => stepFilter.includes(i))
  : STEPS;

console.log(`\nGenerating ${stepsToRun.length * 2} audio file(s)...\n`);

for (const step of stepsToRun) {
  for (const [lang, text] of [["en", step.en], ["hi", step.hi]]) {
    const outFile = `${OUT_DIR}/${step.slug}-${lang}.mp3`;
    try {
      const bytes = await generateCartesia(text, lang, outFile);
      console.log(`✅ [Cartesia] ${step.slug}-${lang}.mp3  (${(bytes/1024).toFixed(0)} KB)`);
    } catch (cartesiaErr) {
      console.warn(`⚠️  Cartesia failed (${cartesiaErr.message.slice(0, 60)}) — falling back to Google TTS`);
      try {
        const bytes = generateGoogleFallback(text, lang, outFile);
        console.log(`✅ [Google]   ${step.slug}-${lang}.mp3  (${(bytes/1024).toFixed(0)} KB)`);
      } catch (gttsErr) {
        console.error(`❌ Both failed for ${step.slug}-${lang}: ${gttsErr.message}`);
      }
    }
    await new Promise(r => setTimeout(r, 800));
  }
}

console.log("\nDone! Files saved to:", OUT_DIR);
