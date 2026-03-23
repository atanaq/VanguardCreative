import { useMousePosition } from '../../hooks/useMousePosition';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const { position, isHovering, isVisible } = useMousePosition();

  return (
    <>
      <div
        className={`${styles.cursor} ${isHovering ? styles.hovering : ''} ${isVisible ? styles.visible : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div
        className={`${styles.dot} ${isVisible ? styles.visible : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </>
  );
}
