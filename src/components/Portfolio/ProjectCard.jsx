import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, size = 'normal' }) {
  return (
    <article className={`${styles.card} ${size === 'large' ? styles.large : ''}`}>
      <div className={styles.imageWrap}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <span className={styles.category}>{project.category}</span>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <a href={project.link || '#'} className={styles.viewLink} data-cursor-hover>
              View Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.cardMeta}>
        <div>
          <span className={styles.metaCategory}>{project.category}</span>
          <h3 className={styles.metaTitle}>{project.title}</h3>
        </div>
        <span className={styles.year}>{project.year}</span>
      </div>
    </article>
  );
}
