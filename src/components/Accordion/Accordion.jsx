import { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';

function AccordionItem({ item, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={isOpen}
        data-cursor-hover
      >
        <div className={styles.triggerLeft}>
          <span className={styles.itemNumber}>0{index + 1}</span>
          <span className={styles.itemTitle}>{item.title}</span>
        </div>
        <div className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      <div
        className={styles.contentWrap}
        style={{ height: `${height}px` }}
      >
        <div className={styles.content} ref={contentRef}>
          <p className={styles.description}>{item.description}</p>

          <div className={styles.details}>
            <div className={styles.techList}>
              <span className={styles.detailLabel}>Technologies</span>
              <div className={styles.tags}>
                {item.technologies.map(tech => (
                  <span key={tech} className={styles.tag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.deliverables}>
              <span className={styles.detailLabel}>Deliverables</span>
              <ul className={styles.deliverableList}>
                {item.deliverables.map(d => (
                  <li key={d} className={styles.deliverable}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    title: 'Branding & Identity',
    description: 'We craft distinctive visual identities that communicate your brand\'s essence with clarity and impact. From logo systems to comprehensive brand books, every touchpoint is intentional.',
    technologies: ['Figma', 'Illustrator', 'Photoshop', 'InDesign'],
    deliverables: ['Logo System', 'Brand Guidelines', 'Color & Typography', 'Business Collateral'],
  },
  {
    title: 'Web Design & Development',
    description: 'Pixel-perfect interfaces built on rock-solid engineering. We design for conversion and build for performance — no compromises.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Webflow', 'GSAP'],
    deliverables: ['UX/UI Design', 'Frontend Development', 'CMS Integration', 'Performance Audit'],
  },
  {
    title: 'Product & UX Design',
    description: 'User-centered product design grounded in research. We map user journeys, prototype rapidly, and iterate until the experience feels effortless.',
    technologies: ['Figma', 'Framer', 'Maze', 'Hotjar', 'Notion'],
    deliverables: ['UX Research', 'Information Architecture', 'Prototyping', 'Usability Testing'],
  },
  {
    title: 'Motion & Campaign',
    description: 'Motion gives brands life. From social content to full campaign production, we create dynamic visual narratives that resonate and convert.',
    technologies: ['After Effects', 'Cinema 4D', 'Premiere', 'Blender', 'Rive'],
    deliverables: ['Brand Animation', 'Social Reels', 'Ad Creatives', 'Launch Videos'],
  },
  {
    title: 'Digital Strategy',
    description: 'Great work starts with smart strategy. We audit, research, and roadmap your digital presence — ensuring every creative decision serves a measurable business goal.',
    technologies: ['GA4', 'SEMrush', 'Ahrefs', 'Hotjar', 'Notion'],
    deliverables: ['Brand Audit', 'Competitor Analysis', 'Content Strategy', 'Roadmap & KPIs'],
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(0);
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
    <section id="services" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div>
            <p className="section-label">What We Do</p>
            <h2 className={styles.title}>Our Services</h2>
          </div>
          <p className={styles.subtitle}>
            Full-spectrum creative solutions for companies that refuse to blend in.
          </p>
        </div>

        <div className={`${styles.accordionList} ${isVisible ? styles.listVisible : ''}`}>
          {SERVICES.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
