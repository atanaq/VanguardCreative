import { useState, useRef, useEffect } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left info */}
          <div className={`${styles.info} ${isVisible ? styles.infoVisible : ''}`}>
            <p className="section-label">Get In Touch</p>
            <h2 className={styles.title}>
              Let's build<br />
              something<br />
              <em className={styles.accent}>remarkable.</em>
            </h2>

            <div className={styles.contactDetails}>
              <a href="mailto:hello@vanguardcreative.co" className={styles.contactLink} data-cursor-hover>
                <div className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span>hello@vanguardcreative.co</span>
              </a>

              <a href="tel:+12025550178" className={styles.contactLink} data-cursor-hover>
                <div className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.91-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <span>+1 (202) 555-0178</span>
              </a>
            </div>

            <div className={styles.availability}>
              <span className={styles.availDot} />
              <span>Available for projects starting Q3 2025</span>
            </div>
          </div>

          {/* Form or success */}
          <div className={`${styles.formWrap} ${isVisible ? styles.formWrapVisible : ''}`}>
            {isSuccess ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successText}>
                  Thank you, {form.name.split(' ')[0]}! We've received your message and will be in touch within 24 hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setIsSuccess(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                  data-cursor-hover
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder=" "
                    autoComplete="name"
                  />
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder=" "
                    autoComplete="email"
                  />
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>

                <div className={`${styles.field} ${styles.fieldTextarea} ${errors.message ? styles.fieldError : ''}`}>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder=" "
                    rows={5}
                  />
                  <label htmlFor="message" className={styles.label}>Tell Us About Your Project</label>
                  {errors.message && <span className={styles.error}>{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
                  disabled={isSubmitting}
                  data-cursor-hover
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
