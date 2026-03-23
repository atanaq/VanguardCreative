import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const HEADLINE_WORDS = ['We', 'Build', 'Digital', 'Legacies.'];

export default function Hero() {
  const [visibleWords, setVisibleWords] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const blobRef = useRef(null);

  // Word-by-word reveal
  useEffect(() => {
    HEADLINE_WORDS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleWords(prev => [...prev, i]);
        if (i === HEADLINE_WORDS.length - 1) {
          setTimeout(() => setShowSub(true), 200);
          setTimeout(() => setShowCta(true), 500);
        }
      }, 200 + i * 150);
    });
  }, []);

  // Parallax blob on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      mouseRef.current = { x, y };
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} ref={containerRef} id="hero">
      {/* Animated gradient background */}
      <div className={styles.gradientBg} />
      <div className={styles.blob} ref={blobRef} />
      <div className={styles.noise} />

      {/* Grid lines decoration */}
      <div className={styles.gridLines}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.gridLine} />
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        <p className={`section-label ${styles.sectionLabel}`}>
          ✦ Creative Studio · Est. 2019
        </p>

        <h1 className={styles.headline}>
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className={`${styles.word} ${visibleWords.includes(i) ? styles.wordVisible : ''}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {word === 'Digital' ? (
                <em className={styles.accent}>{word}</em>
              ) : word}
              {i < HEADLINE_WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <p className={`${styles.subtext} ${showSub ? styles.subtextVisible : ''}`}>
          We craft bold digital experiences — from strategy to pixel-perfect execution.<br />
          Brands that lead. Products that endure.
        </p>

        <div className={`${styles.ctaGroup} ${showCta ? styles.ctaVisible : ''}`}>
          <a href="#portfolio" className={styles.primaryBtn} data-cursor-hover>
            View Our Work
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="#services" className={styles.secondaryBtn} data-cursor-hover>
            Our Services
          </a>
        </div>

        <div className={styles.stats}>
          {[
            { value: '120+', label: 'Projects Delivered' },
            { value: '8yr', label: 'In Business' },
            { value: '97%', label: 'Client Retention' },
          ].map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
}
