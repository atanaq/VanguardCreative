import { useRef, useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import styles from './Portfolio.module.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Meridian Finance',
    category: 'Branding',
    description: 'Complete visual identity system for a disruptive fintech startup redefining wealth management.',
    image: '/images/project-1.jpg',
    tags: ['Identity', 'Strategy', 'Print'],
    year: '2024',
    link: '#',
  },
  {
    id: 2,
    title: 'Fauna Store',
    category: 'Web Design',
    description: 'Conversion-focused e-commerce experience built for a sustainable lifestyle brand.',
    image: '/images/project-2.jpg',
    tags: ['UX/UI', 'React', 'E-commerce'],
    year: '2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Prism Motion',
    category: 'Motion Design',
    description: 'Dynamic brand launch campaign featuring abstract 3D motion graphics and visual storytelling.',
    image: '/images/project-3.jpg',
    tags: ['After Effects', '3D', 'Campaign'],
    year: '2023',
    link: '#',
  },
  {
    id: 4,
    title: 'Vitalis App',
    category: 'Product Design',
    description: 'End-to-end UX design for a health-tech platform serving 200K+ active users.',
    image: '/images/project-4.jpg',
    tags: ['Mobile', 'UX Research', 'Figma'],
    year: '2023',
    link: '#',
  },
  {
    id: 5,
    title: 'Obsidian Fashion',
    category: 'Campaign',
    description: 'Editorial photography direction and art direction for a luxury fashion house seasonal campaign.',
    image: '/images/project-5.jpg',
    tags: ['Art Direction', 'Photography', 'Print'],
    year: '2023',
    link: '#',
  },
];

export default function Portfolio() {
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
    <section id="portfolio" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className={styles.title}>Our Portfolio</h2>
          </div>
          <p className={styles.subtitle}>
            A curated selection of projects where bold ideas meet meticulous execution.
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.gridVisible : ''}`}>
          {/* Large card 1 */}
          <div className={styles.item1}>
            <ProjectCard project={PROJECTS[0]} size="large" />
          </div>
          {/* Normal card 2 */}
          <div className={styles.item2}>
            <ProjectCard project={PROJECTS[1]} />
          </div>
          {/* Normal card 3 */}
          <div className={styles.item3}>
            <ProjectCard project={PROJECTS[2]} />
          </div>
          {/* Large card 4 */}
          <div className={styles.item4}>
            <ProjectCard project={PROJECTS[3]} size="large" />
          </div>
          {/* Normal card 5 */}
          <div className={styles.item5}>
            <ProjectCard project={PROJECTS[4]} />
          </div>
        </div>

        <div className={`${styles.footer} ${isVisible ? styles.footerVisible : ''}`}>
          <a href="#contact" className={styles.allWork} data-cursor-hover>
            Start a Project
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
