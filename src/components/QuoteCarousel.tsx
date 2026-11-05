import React, { useState, useEffect, useRef } from 'react';
import { Quotes, CaretLeft, CaretRight, Plus, Trash } from '@phosphor-icons/react';
import { Quote } from '../types/portfolio';

interface QuoteCarouselProps {
  quotes: Quote[];
  editMode: boolean;
  onUpdateQuotes: (quotes: Quote[]) => void;
}

export const QuoteCarousel: React.FC<QuoteCarouselProps> = ({
  quotes,
  editMode,
  onUpdateQuotes,
}) => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Safe index bounds
  const currentIndex = Math.min(activeQuoteIndex, Math.max(0, quotes.length - 1));
  const currentQuote = quotes[currentIndex] || {
    id: 'default',
    text: 'Scientists discover the world that exists; engineers create the world that never was.',
    author: 'Theodore von Kármán',
    affiliation: 'Pioneer of Supersonic Aerodynamics',
  };

  const handleNextQuote = () => {
    setActiveQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const handlePrevQuote = () => {
    setActiveQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  // Auto-rotation timer (every 7 seconds unless hovered or in edit mode)
  useEffect(() => {
    if (editMode || isPaused || quotes.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [editMode, isPaused, quotes.length]);

  const handleUpdateCurrentQuote = (field: keyof Quote, value: string) => {
    const updated = [...quotes];
    updated[currentIndex] = {
      ...updated[currentIndex],
      [field]: value,
    };
    onUpdateQuotes(updated);
  };

  const handleAddQuote = () => {
    const newQuote: Quote = {
      id: `q-${Date.now()}`,
      text: 'New inspirational aerospace quote…',
      author: 'Aeronautical Pioneer',
      affiliation: 'Research / Space Agency',
    };
    onUpdateQuotes([...quotes, newQuote]);
    setActiveQuoteIndex(quotes.length);
  };

  const handleDeleteQuote = (idx: number) => {
    if (quotes.length <= 1) return;
    const updated = quotes.filter((_, i) => i !== idx);
    onUpdateQuotes(updated);
    setActiveQuoteIndex(0);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-md p-6 sm:p-7 rounded-none bg-[#000000]/95 border border-slate-800 hud-corner-bracket shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[230px] transition-all"
    >
      {/* Card Header with Counter */}
      <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 pb-2 border-b border-slate-800/80">
        <div className="text-amber-400 text-xl leading-none flex items-center space-x-2">
          <Quotes size={22} weight="fill" />
          <span className="text-[10px] tracking-widest text-slate-400 font-mono-tech uppercase">
            AEROSPACE ARCHIVE
          </span>
        </div>
        <div className="text-[11px] tracking-widest text-slate-400 font-mono-tech tabular-nums">
          {currentIndex + 1} / {quotes.length}
        </div>
      </div>

      {/* Quote Body */}
      <div className="py-3.5 flex-1 flex flex-col justify-center">
        {editMode ? (
          <div className="space-y-2.5">
            <textarea
              rows={3}
              value={currentQuote.text}
              onChange={(e) => handleUpdateCurrentQuote('text', e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-700 rounded-none p-2 text-base sm:text-xs text-slate-100 font-heading focus:outline-none focus:border-amber-400"
              placeholder="Quote text…"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={currentQuote.author}
                onChange={(e) => handleUpdateCurrentQuote('author', e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-none px-2 py-1 text-base sm:text-[11px] text-amber-400 font-mono-tech focus:outline-none focus:border-amber-400"
                placeholder="Author"
              />
              <input
                type="text"
                value={currentQuote.affiliation || ''}
                onChange={(e) => handleUpdateCurrentQuote('affiliation', e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-none px-2 py-1 text-base sm:text-[11px] text-slate-400 font-mono-tech focus:outline-none focus:border-amber-400"
                placeholder="Affiliation / Role"
              />
            </div>
          </div>
        ) : (
          <blockquote className="space-y-2.5">
            <p className="text-sm sm:text-base text-slate-100 font-heading italic leading-relaxed min-h-[50px] transition-all duration-300">
              “{currentQuote.text}”
            </p>
            <footer>
              <div className="text-xs sm:text-sm font-mono-tech font-bold text-amber-400 tracking-wide">
                &mdash; {currentQuote.author}
              </div>
              {currentQuote.affiliation && (
                <div className="text-[11px] text-slate-400 font-mono-tech mt-0.5">
                  {currentQuote.affiliation}
                </div>
              )}
            </footer>
          </blockquote>
        )}
      </div>

      {/* Card Footer: Active Dash Indicator + Navigation Arrows */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <div className="flex items-center space-x-1.5">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveQuoteIndex(idx)}
              aria-label={`Go to quote ${idx + 1}`}
                    ? 'w-6 bg-amber-400'
                    : 'w-2 bg-zinc-800 hover:bg-zinc-600'
                  }`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-1.5">
          {editMode && (
            <>
              <button
                onClick={handleAddQuote}
                title="Add Quote"
                className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-amber-400"
              >
                <Plus size={14} weight="bold" />
              </button>
              {quotes.length > 1 && (
                <button
                  onClick={() => handleDeleteQuote(currentIndex)}
                  title="Delete Quote"
                  className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-red-400"
                >
                  <Trash size={14} />
                </button>
              )}
            </>
          )}

          <button
            onClick={handlePrevQuote}
            className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="Previous quote"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
          <button
            onClick={handleNextQuote}
            className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="Next quote"
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
};
