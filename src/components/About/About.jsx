import { useRef, useEffect, useState } from 'react';
import styles from './About.module.css';

const VALUES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Excellence',
    text: 'We hold every pixel, every word, every interaction to the highest standard.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Partnership',
    text: 'Your success is our success. We embed ourselves as strategic partners, not vendors.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Impact',
    text: 'We measure success in business outcomes — not awards or aesthetics alone.',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.inner}>
          <div className={`${styles.left} ${isVisible ? styles.leftVisible : ''}`}>
            <p className="section-label">Who We Are</p>
            <h2 className={styles.title}>
              A studio built for<br />
              the <em className={styles.accent}>bold</em> and<br />
              the <em className={styles.accent}>ambitious.</em>
            </h2>

            <div className={styles.decorBar} />
          </div>

          <div className={`${styles.right} ${isVisible ? styles.rightVisible : ''}`}>
            <p className={styles.intro}>
              Founded in 2019, Vanguard Creative is an independent design and technology studio. We partner with founders, brands, and enterprises to create digital products that define categories.
            </p>
            <p className={styles.body}>
              We're a small, senior team — which means every project gets our full attention. No account managers, no junior handoffs. Just world-class creative work, delivered with urgency and care.
            </p>

            <div className={styles.values}>
              {VALUES.map((val, i) => (
                <div
                  key={val.title}
                  className={styles.value}
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className={styles.valueIcon}>{val.icon}</div>
                  <div>
                    <h4 className={styles.valueTitle}>{val.title}</h4>
                    <p className={styles.valueText}>{val.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
