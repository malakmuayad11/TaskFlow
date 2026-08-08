import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import { getQuote, type QuoteResponse } from "~/services/quoteService";

export default function QuoteCard() {
  const theme = useContext(ThemeContext).theme;
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchQuote() {
      try {
        const q = await getQuote();

        if (!ignore) {
          setQuote(q);
        }
      } catch {
        setQuote(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchQuote();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div
      className={`
        ${
          theme === "Light"
            ? "bg-bg-surface border-border-color"
            : "bg-bg-surface-dark border-border-color-dark"
        }
        relative overflow-hidden
        border rounded-btn
        p-5 mt-4
        transition-all duration-300
        hover:shadow-xl
        ${theme === "Light" ? "hover:shadow-xl" : "hover:shadow-primary/30"}
      `}
    >
      {/* Decorative quote icon */}
      <div
        className="
          absolute right-4 top-2
          text-5xl
          opacity-10
          font-serif
        "
      >
        ❝
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">✨</span>

        <h3
          className={`
            font-semibold text-lg
            ${
              theme === "Light" ? "text-text-primary" : "text-text-primary-dark"
            }
          `}
        >
          Quote of the Day
        </h3>
      </div>

      {loading ? (
        <p
          className={
            theme === "Light"
              ? "text-text-secondary"
              : "text-text-secondary-dark"
          }
        >
          Loading inspiration...
        </p>
      ) : quote ? (
        <figure>
          <blockquote
            className={`
              italic
              text-base
              leading-relaxed
              ${
                theme === "Light"
                  ? "text-text-primary"
                  : "text-text-primary-dark"
              }
            `}
          >
            "{quote.quote}"
          </blockquote>

          <figcaption
            className={`
              mt-4 flex items-center justify-between
              text-sm
              ${
                theme === "Light"
                  ? "text-text-secondary"
                  : "text-text-secondary-dark"
              }
            `}
          >
            <span>— {quote.author}</span>
          </figcaption>
        </figure>
      ) : (
        <p
          className={
            theme === "Light"
              ? "text-text-secondary"
              : "text-text-secondary-dark"
          }
        >
          No quotes are available.
        </p>
      )}
    </div>
  );
}
