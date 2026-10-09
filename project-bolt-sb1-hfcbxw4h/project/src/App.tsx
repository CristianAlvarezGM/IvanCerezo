import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, CalendarDays, ChevronDown, Instagram, MapPin, Menu, Scissors, Sparkles, X } from 'lucide-react';
import { images, siteData, type BookingForm } from '@/data';

const { sections, navigation, project_metadata } = siteData;

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label"><span />{children}</p>;
}

function Image({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} loading="lazy" />;
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#141414]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#inicio" className="brand-mark"><span>IVÁN CEREZO</span><small>HAIR STUDIO</small></a>
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.menu_items.map((item, index) => <a key={item.href} href={item.href} className={`nav-link ${index === 0 ? 'active' : ''}`}>{item.label}</a>)}
        </nav>
        <button onClick={onBook} className="hidden gold-button lg:flex">{sections.hero.cta.text}<ArrowUpRight size={15} /></button>
        <button aria-label="Abrir menú" onClick={() => setOpen(!open)} className="icon-button lg:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && <nav className="mobile-nav lg:hidden">{navigation.menu_items.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}<button onClick={() => { setOpen(false); onBook(); }} className="gold-button">{sections.hero.cta.text}<ArrowUpRight size={15} /></button></nav>}
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return <section id="inicio" className="hero-section page-section">
    <div className="hero-copy">
      <SectionLabel>{project_metadata.location} • {project_metadata.subtitle}</SectionLabel>
      <h1>{sections.hero.title}</h1>
      <p>{sections.hero.description}</p>
      <button onClick={onBook} className="gold-button">{sections.hero.cta.text}<ArrowUpRight size={16} /></button>
    </div>
    <div className="hero-images">
      <div className="hero-image-main"><Image src={images.hero} alt="Retrato editorial de belleza con cabello largo" /></div>
      <div className="hero-image-side"><Image src={images.heroPortrait} alt="Retrato profesional en estética oscura" /></div>
      <div className="hero-stamp"><Scissors size={20} /><span>DESIGN<br />YOUR<br />ICON</span></div>
    </div>
    <div className="scroll-note"><span />SCROLL TO EXPLORE</div>
  </section>;
}

function Services() {
  const [active, setActive] = useState(0);
  const categories = sections.services_overview.categories;
  return <section id="servicios" className="page-section services-section">
    <div className="section-intro"><SectionLabel>{sections.services_overview.id.replace('_', ' / ').replace(/_/g, ' ')}</SectionLabel><h2>{sections.services_overview.title}</h2><p>Una curaduría de servicios pensada para crear tu versión más auténtica.</p></div>
    <div className="services-layout">
      <div className="service-menu">{categories.map((category, index) => <button key={category.id} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span>0{index + 1}</span>{category.name}<ArrowUpRight size={15} /></button>)}</div>
      <div className="service-feature"><Image src={[images.hair[0], images.nails[0], images.makeup][active]} alt={categories[active].name} /><div className="image-overlay"><span>0{active + 1}</span><strong>{categories[active].name}</strong></div></div>
      <div className="service-detail"><span className="detail-number">0{active + 1}</span><h3>{[sections.hair_studio_detail.title, sections.nails_bar.title, sections.makeup_and_brow.title][active]}</h3><ul>{[sections.hair_studio_detail.services_list, sections.nails_bar.services_list, sections.makeup_and_brow.services_list][active].map(item => <li key={item}>{item}</li>)}</ul><a href="#reservas">Descubrir experiencia <ArrowUpRight size={15} /></a></div>
    </div>
  </section>;
}

function SplitService({ id, number, title, list, image, imageAlt, reverse = false }: { id: string; number: string; title: string; list: readonly string[]; image: string; imageAlt: string; reverse?: boolean }) {
  return <section id={id} className={`split-service page-section ${reverse ? 'reverse' : ''}`}><div className="split-image"><Image src={image} alt={imageAlt} /><span className="image-index">{number}</span></div><div className="split-copy"><SectionLabel>{number} / DESKTOP • {title}</SectionLabel><h2>{title}</h2><ul>{list.map(item => <li key={item}>{item}</li>)}</ul><a className="text-link" href="#reservas">Reservar experiencia <ArrowUpRight size={15} /></a></div></section>;
}

function Portfolio() {
  return <section id="portafolio" className="page-section portfolio-section"><div className="section-intro"><SectionLabel>{sections.portfolio.id.replace(/_/g, ' ')}</SectionLabel><h2>{sections.portfolio.title}</h2></div><div className="portfolio-grid">{images.portfolio.map((image, index) => <div className={`portfolio-item portfolio-${index + 1}`} key={image}><Image src={image} alt={`Trabajo de estilismo ${index + 1}`} /><span>0{index + 1}</span></div>)}</div></section>;
}

function About() {
  return <section id="nosotros" className="about-section page-section"><div className="about-photo"><Image src={images.artist} alt="Retrato de Iván Cerezo" /><span>{sections.about_us.imageCaption}</span></div><div className="about-copy"><SectionLabel>{sections.about_us.id.replace(/_/g, ' ')}</SectionLabel><p className="eyebrow">{sections.about_us.role}</p><h2>{sections.about_us.author}</h2><p>{sections.about_us.bio}</p><blockquote>“{sections.about_us.quote}”</blockquote><div className="signature">I<span>C</span></div></div></section>;
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<BookingForm>({ experience: '', name: '', phone: '', date: '', time: '' });
  const [sent, setSent] = useState(false);
  const update = (key: keyof BookingForm, value: string) => setForm(current => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}><div className="booking-modal"><button aria-label="Cerrar" onClick={onClose} className="modal-close"><X size={20} /></button>{sent ? <div className="success-state"><Sparkles size={32} /><h2>Tu experiencia comienza aquí.</h2><p>Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo para confirmar tu cita.</p><button onClick={onClose} className="gold-button">Cerrar</button></div> : <><SectionLabel>{sections.reservations.id.replace(/_/g, ' ')}</SectionLabel><h2>{sections.reservations.title}</h2><p className="modal-lead">Selecciona tu servicio y déjanos tus datos. Te contactaremos para confirmar disponibilidad.</p><form onSubmit={submit}><label>Experiencia<select required value={form.experience} onChange={event => update('experience', event.target.value)}><option value="">{sections.reservations.form.fields[0].placeholder}</option>{sections.reservations.form.fields[0].options.map(option => <option key={option}>{option}</option>)}</select></label><div className="form-row"><label>Nombre<input required value={form.name} onChange={event => update('name', event.target.value)} placeholder="Tu nombre" /></label><label>Teléfono<input required value={form.phone} onChange={event => update('phone', event.target.value)} placeholder="686 000 0000" /></label></div><div className="form-row"><label>Fecha<input required type="date" value={form.date} onChange={event => update('date', event.target.value)} /></label><label>Hora<select required value={form.time} onChange={event => update('time', event.target.value)}><option value="">Selecciona hora</option><option>10:00 AM</option><option>12:00 PM</option><option>4:00 PM</option><option>6:00 PM</option></select></label></div><button className="gold-button submit-button" type="submit">{sections.reservations.form.submit_button.text}<ArrowUpRight size={16} /></button></form></>}</div></div>;
}

function Footer() {
  return <footer><div className="brand-mark"><span>IVÁN CEREZO</span><small>HAIR STUDIO</small></div><p>{project_metadata.location}</p><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a><span className="copyright">© 2024 {project_metadata.brand_name}</span></footer>;
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return <div className="site-shell"><Header onBook={() => setBookingOpen(true)} /><main><Hero onBook={() => setBookingOpen(true)} /><Services /><SplitService id="hair-studio" number="03" title={sections.hair_studio_detail.title} list={sections.hair_studio_detail.services_list} image={images.hair[1]} imageAlt="Cabello rubio con ondas" /><SplitService id="nails-bar" number="04" title={`${sections.nails_bar.title} / ${sections.nails_bar.subtitle}`} list={sections.nails_bar.services_list} image={images.nails[1]} imageAlt="Manicure nude de lujo" reverse /><SplitService id="makeup" number="05" title={sections.makeup_and_brow.title} list={sections.makeup_and_brow.services_list} image={images.makeup} imageAlt="Maquillaje profesional editorial" /><Portfolio /><About /><section id="reservas" className="reservation-banner"><div><SectionLabel>{sections.reservations.id.replace(/_/g, ' ')}</SectionLabel><h2>{sections.reservations.title}</h2><p>Regálate un momento creado completamente para ti.</p></div><button onClick={() => setBookingOpen(true)} className="gold-button">{sections.reservations.form.submit_button.text}<ArrowUpRight size={16} /></button><div className="reservation-meta"><MapPin size={16} />{sections.reservations.location_map.city}<CalendarDays size={16} />Citas personalizadas</div></section></main><Footer />{bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}</div>;
}

export default App;
