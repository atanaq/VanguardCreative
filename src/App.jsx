import { useTheme } from './hooks/useTheme';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import Accordion from './components/Accordion/Accordion';
import About from './components/About/About';
import ContactForm from './components/ContactForm/ContactForm';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <CustomCursor />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Portfolio />
        <Accordion />
        <About />
        <ContactForm />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '32px 20px',
        fontSize: '13px',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-primary)',
      }}>
        © {new Date().getFullYear()} Vanguard Creative. All rights reserved.
      </footer>
    </div>
  );
}
