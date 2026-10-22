import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Mic, Volume2, Sparkles, X, MessageSquare, Bot, Languages } from "lucide-react";

export const VernacularVoiceWidget = () => {
  const { language, setLanguage, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeQuery, setActiveQuery] = useState(null);

  const queries = {
    kn: [
      {
        q: "ನನ್ನ Employability Score ಯಾಕೆ ಕಡಿಮೆ ಇದೆ?",
        a: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ Employability Score 88 ಆಗಿದೆ. React.js (92%) ಮತ್ತು ಅಲ್ಗಾರಿದಮ್‌ಗಳಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಕೌಶಲ್ಯವಿದೆ. ಆದರೆ ಕ್ಲೌಡ್ ತಂತ್ರಜ್ಞಾನ (AWS) ಮತ್ತು ಡಾಕರ್ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು ಕಡಿಮೆ ಇರುವುದರಿಂದ ನಿಮ್ಮ ಅಂಕವು 88 ಆಗಿದೆ. ಸಿಫಾರಸು ಮಾಡಲಾದ ಡಾಕರ್ ವರ್ಕ್‌ಶಾಪ್ ಮುಗಿಸಿದರೆ ನಿಮ್ಮ ಅಂಕವು 94+ ಗೆ ಏರುತ್ತದೆ."
      },
      {
        q: "ನನ್ನ ಕೌಶಲ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಯಾವ ಉದ್ಯೋಗಗಳು ಲಭ್ಯವಿವೆ?",
        a: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪ್ರಕಾರ Bosch ಮತ್ತು Tata Elxsi ಸಂಸ್ಥೆಗಳ 'Associate Cloud Developer' ಮತ್ತು 'Embedded Edge AI' ಹುದ್ದೆಗಳಿಗೆ 92% ಹೊಂದಾಣಿಕೆ (Fit Score) ಇದೆ. ಇಂದೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು."
      },
      {
        q: "ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿಶೇಷ ಅವಕಾಶಗಳಿವೆಯೇ?",
        a: "ಹೌದು, ಉದ್ಯಮ ಸೇತು ವೇದಿಕೆಯಲ್ಲಿ ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ (ಕಲಬುರಗಿ, ಬೀದರ್, ಬಳ್ಳಾರಿ, ರಾಯಚೂರು, ಕೊಪ್ಪಳ, ಯಾದಗಿರಿ) ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರತ್ಯೇಕ ಕ್ಯಾಂಪಸ್ ಡ್ರೈವ್ ಹಾಗೂ ಸ್ಥಳೀಯ ಭಾಷಾ ತರಬೇತಿ ಉಚಿತವಾಗಿ ಲಭ್ಯವಿದೆ."
      }
    ],
    en: [
      {
        q: "Why is my Employability Score 88/100?",
        a: "Your score is strong in Fullstack Web Development (92%) and Data Structures (88%). To reach the top 5% bracket, complete practical projects in Docker Containerization and AWS Cloud Deployments."
      },
      {
        q: "Which campus drives am I eligible for?",
        a: "Based on your 8.84 CGPA and 92.5% attendance, you are directly eligible for the Tata Elxsi and Bosch Campus Selection drives."
      },
      {
        q: "What is a Verified Digital Workforce Identity?",
        a: "It is an unalterable QR-backed digital credential issued by your college and Udyam Sethu confirming your verified skills, attendance, and academic achievements."
      }
    ],
    hi: [
      {
        q: "मेरा Employability Score 88/100 क्यों है?",
        a: "आपका कोर प्रोग्रामिंग और वेब डेवलपमेंट स्कोर 92% है। डॉकर और एडब्ल्यूएस क्लाउड पर एक लाइव प्रोजेक्ट करने से आपका स्कोर 95+ हो जाएगा।"
      },
      {
        q: "मेरे लिए कौन सी कंपनियाँ उपलब्ध हैं?",
        a: "टाटा एल्क्सी और बॉश आपके कौशल के अनुसार 90%+ फिट स्कोर प्रदान करते हैं। आप सीधे आवेदन कर सकते हैं।"
      }
    ]
  };

  const currentQueries = queries[language] || queries.en;

  const handleSpeak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === "kn") {
        utterance.lang = "kn-IN";
      } else if (language === "hi") {
        utterance.lang = "hi-IN";
      } else {
        utterance.lang = "en-IN";
      }
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const handleSelectQuery = (item) => {
    setActiveQuery(item);
    handleSpeak(item.a);
  };

  const simulateMic = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSelectQuery(currentQueries[0]);
    }, 1500);
  };

  return (
    <>
      <button
        className="vernacular-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Vernacular AI Assistant (Kannada, English, Hindi)"
      >
        <Sparkles size={20} />
        <span>{language === "kn" ? "ಕನ್ನಡ AI ಸಹಾಯಕ" : language === "hi" ? "हिंदी AI सहायक" : "Vernacular AI (ಕನ್ನಡ/Eng)"}</span>
        <span className="badge badge-amber" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
          Pillar #3
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "85px",
            right: "24px",
            width: "380px",
            maxWidth: "calc(100vw - 48px)",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            border: "1px solid var(--gray-200)",
            zIndex: 101,
            overflow: "hidden"
          }}
          className="animate-fade-in"
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)",
              color: "#ffffff",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <Bot size={22} />
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {language === "kn" ? "ಉದ್ಯಮ ಸೇತು ವಾಯ್ಸ್ AI" : language === "hi" ? "उद्यम सेतु वॉइस एआई" : "Vernacular AI Voice Guide"}
                </h4>
                <p style={{ fontSize: "0.725rem", opacity: 0.9 }}>
                  {language === "kn" ? "ಕನ್ನಡ • English • हिंदी" : "Voice-enabled regional career intelligence"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: "#ffffff", opacity: 0.8, padding: "0.25rem" }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Language Tabs inside widget */}
          <div style={{ display: "flex", background: "var(--gray-100)", borderBottom: "1px solid var(--gray-200)", padding: "0.4rem 0.8rem", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--gray-600)" }}>
              <Languages size={14} /> Lang:
            </span>
            {[
              { code: "kn", label: "ಕನ್ನಡ" },
              { code: "en", label: "English" },
              { code: "hi", label: "हिंदी" }
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setActiveQuery(null);
                }}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "9999px",
                  background: language === l.code ? "#ffffff" : "transparent",
                  color: language === l.code ? "var(--primary)" : "var(--gray-600)",
                  border: language === l.code ? "1px solid var(--gray-300)" : "none"
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div style={{ padding: "1.25rem", maxHeight: "380px", overflowY: "auto" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--gray-600)", marginBottom: "0.75rem", fontWeight: 600 }}>
              {language === "kn"
                ? "ಕೆಳಗಿನ ಪ್ರಶ್ನೆ ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಮೈಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ:"
                : language === "hi"
                ? "नीचे दिए गए प्रश्न चुनें या माइक पर क्लिक करें:"
                : "Ask or select a question to hear regional AI guidance:"}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
              {currentQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(item)}
                  style={{
                    textAlign: "left",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--gray-200)",
                    background: activeQuery?.q === item.q ? "var(--primary-light)" : "var(--gray-50)",
                    borderColor: activeQuery?.q === item.q ? "var(--primary-border)" : "var(--gray-200)",
                    fontSize: "0.825rem",
                    fontWeight: 600,
                    color: activeQuery?.q === item.q ? "var(--primary)" : "var(--gray-800)",
                    transition: "var(--transition)"
                  }}
                >
                  💬 "{item.q}"
                </button>
              ))}
            </div>

            {/* Answer Display */}
            {activeQuery && (
              <div
                style={{
                  background: "#f0fdfa",
                  border: "1px solid #99f6e4",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                  marginBottom: "1rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f766e" }}>
                    🤖 {language === "kn" ? "AI ಉತ್ತರ ಮತ್ತು ಸಲಹೆ:" : "AI Explanation & Next Steps:"}
                  </span>
                  <button
                    onClick={() => handleSpeak(activeQuery.a)}
                    className="btn btn-sm btn-secondary"
                    style={{ padding: "0.2rem 0.5rem", fontSize: "0.7rem", gap: "0.3rem" }}
                  >
                    <Volume2 size={13} />
                    {isSpeaking ? "Speaking..." : "Listen"}
                  </button>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#134e4a", lineHeight: 1.5 }}>
                  {activeQuery.a}
                </p>
              </div>
            )}
          </div>

          {/* Voice Mic Footer */}
          <div
            style={{
              padding: "0.85rem 1.25rem",
              background: "var(--gray-50)",
              borderTop: "1px solid var(--gray-200)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={simulateMic}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: isListening ? "#dc2626" : "var(--primary)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isListening ? "0 0 12px rgba(220, 38, 38, 0.6)" : "none"
                }}
                title="Tap to speak in Kannada, English or Hindi"
              >
                <Mic size={18} />
              </button>
              <span style={{ fontSize: "0.8rem", color: "var(--gray-600)", fontWeight: 500 }}>
                {isListening ? (language === "kn" ? "ಆಲಿಸಲಾಗುತ್ತಿದೆ..." : "Listening...") : (language === "kn" ? "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ" : "Tap to Speak")}
              </span>
            </div>

            <span className="badge badge-purple" style={{ fontSize: "0.7rem" }}>
              Indic-LLM 2.0
            </span>
          </div>
        </div>
      )}
    </>
  );
};
