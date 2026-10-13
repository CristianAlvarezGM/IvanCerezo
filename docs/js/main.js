(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name, size) => `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;
  const label = (el, text) => { el.innerHTML = `<span></span>${esc(text)}`; };
  const refreshIcons = () => { if (window.lucide) window.lucide.createIcons(); };

  let data;
  let activeService = 0;

  function renderNav() {
    const items = data.navigation.menu_items;
    $('desktop-nav').innerHTML = items
      .map((item, i) => `<a href="${esc(item.href)}" class="nav-link${i === 0 ? ' active' : ''}">${esc(item.label)}</a>`)
      .join('');
    const cta = data.sections.hero.cta.text;
    $('mobile-nav').innerHTML =
      items.map((item) => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join('') +
      `<button type="button" class="gold-button" data-open-booking>${esc(cta)}${icon('arrow-up-right', 15)}</button>`;
    document.querySelector('.header-cta').innerHTML = `${esc(cta)}${icon('arrow-up-right', 15)}`;
  }

  function renderHero() {
    const { hero } = data.sections;
    const m = data.project_metadata;
    label($('hero-label'), `${m.location} • ${m.subtitle}`);
    $('hero-title').textContent = hero.title;
    $('hero-description').textContent = hero.description;
    $('hero-cta').innerHTML = `${esc(hero.cta.text)}${icon('arrow-up-right', 16)}`;
    $('hero-img-main').src = data.images.hero;
    $('hero-img-side').src = data.images.heroPortrait;
  }

  function renderServices() {
    const s = data.sections;
    label($('services-label'), s.services_overview.id.replace('_', ' / ').replace(/_/g, ' '));
    $('services-title').textContent = s.services_overview.title;
    $('services-intro').textContent = data.ui.services_intro;
    $('service-detail-link').innerHTML = `${esc(data.ui.discover)} ${icon('arrow-up-right', 15)}`;
    $('service-menu').innerHTML = s.services_overview.categories
      .map((c, i) => `<button type="button" data-service="${i}">` +
        `<span>0${i + 1}</span>${esc(c.name)}${icon('arrow-up-right', 15)}</button>`)
      .join('');
    $('service-menu').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-service]');
      if (btn) selectService(Number(btn.dataset.service));
    });
    selectService(0);
  }

  function selectService(index) {
    activeService = index;
    const s = data.sections;
    const cat = s.services_overview.categories[index];
    const details = [s.hair_studio_detail, s.nails_bar, s.makeup_and_brow][index];
    document.querySelectorAll('#service-menu button').forEach((b, i) => b.classList.toggle('selected', i === index));
    const img = $('service-img');
    img.src = data.ui.service_images[index];
    img.alt = cat.name;
    $('service-overlay-num').textContent = `0${index + 1}`;
    $('service-overlay-name').textContent = cat.name;
    $('service-detail-num').textContent = `0${index + 1}`;
    $('service-detail-title').textContent = details.title;
    $('service-detail-list').innerHTML = details.services_list.map((li) => `<li>${esc(li)}</li>`).join('');
  }

  function renderSplitServices() {
    $('split-services').innerHTML = data.ui.split_services
      .map((svc) => {
        const src = data.sections[svc.source];
        const title = src.subtitle ? `${src.title} / ${src.subtitle}` : src.title;
        return `<section id="${esc(svc.id)}" class="split-service page-section${svc.reverse ? ' reverse' : ''}">
          <div class="split-image"><img src="${esc(svc.image)}" alt="${esc(svc.alt)}" loading="lazy" /><span class="image-index">${esc(svc.number)}</span></div>
          <div class="split-copy">
            <p class="section-label"><span></span>${esc(svc.number)} / DESKTOP • ${esc(title)}</p>
            <h2>${esc(title)}</h2>
            <ul>${src.services_list.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>
            <a class="text-link" href="#reservas">${esc(data.ui.reserve_experience)} ${icon('arrow-up-right', 15)}</a>
          </div></section>`;
      })
      .join('');
  }

  function renderPortfolio() {
    const p = data.sections.portfolio;
    label($('portfolio-label'), p.id.replace(/_/g, ' '));
    $('portfolio-title').textContent = p.title;
    $('portfolio-grid').innerHTML = data.images.portfolio
      .map((src, i) => `<div class="portfolio-item portfolio-${i + 1}"><img src="${esc(src)}" alt="Trabajo de estilismo ${i + 1}" loading="lazy" /><span>0${i + 1}</span></div>`)
      .join('');
  }

  function renderAbout() {
    const a = data.sections.about_us;
    $('about-img').src = data.images.artist;
    $('about-caption').textContent = a.imageCaption;
    label($('about-label'), a.id.replace(/_/g, ' '));
    $('about-role').textContent = a.role;
    $('about-author').textContent = a.author;
    $('about-bio').textContent = a.bio;
    $('about-quote').textContent = `“${a.quote}”`;
  }

  function renderReservations() {
    const r = data.sections.reservations;
    const submit = r.form.submit_button.text;
    const labelText = r.id.replace(/_/g, ' ');
    label($('reservation-label'), labelText);
    label($('modal-label'), labelText);
    $('reservation-title').textContent = r.title;
    $('modal-title').textContent = r.title;
    $('reservation-lead').textContent = data.ui.reservation_lead;
    $('reservation-cta').innerHTML = `${esc(submit)}${icon('arrow-up-right', 16)}`;
    $('form-submit').innerHTML = `${esc(submit)}${icon('arrow-up-right', 16)}`;
    $('reservation-city').textContent = r.location_map.city;
    $('reservation-meta').textContent = data.ui.reservation_meta;
    const exp = r.form.fields[0];
    $('form-experience').innerHTML = `<option value="">${esc(exp.placeholder)}</option>` +
      exp.options.map((o) => `<option>${esc(o)}</option>`).join('');
  }

  function renderFooter() {
    $('footer-location').textContent = data.project_metadata.location;
    $('footer-instagram').href = data.ui.instagram_url;
    $('footer-copy').textContent = `© 2024 ${data.project_metadata.brand_name}`;
  }

  /* Interacciones */
  function setMenu(open) {
    $('mobile-nav').hidden = !open;
    $('icon-menu').style.display = open ? 'none' : '';
    $('icon-close').style.display = open ? '' : 'none';
  }

  function openBooking() {
    $('booking-form').reset();
    $('booking-success').hidden = true;
    $('booking-content').hidden = false;
    $('booking-modal').hidden = false;
  }
  function closeBooking() { $('booking-modal').hidden = true; }

  function bindEvents() {
    $('menu-toggle').addEventListener('click', () => setMenu($('mobile-nav').hidden));
    $('mobile-nav').addEventListener('click', (e) => { if (e.target.closest('a, button')) setMenu(false); });

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-open-booking]')) openBooking();
      else if (e.target.closest('[data-close-booking]')) closeBooking();
    });
    $('booking-modal').addEventListener('mousedown', (e) => { if (e.target === e.currentTarget) closeBooking(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBooking(); });

    $('booking-form').addEventListener('submit', (e) => {
      e.preventDefault();
      $('booking-content').hidden = true;
      $('booking-success').hidden = false;
    });

    // Enlace activo en navegación de escritorio
    const links = Array.from(document.querySelectorAll('#desktop-nav .nav-link'));
    const sections = links.map((l) => document.querySelector(l.getAttribute('href')));
    const onScroll = () => {
      let current = 0;
      sections.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top <= 120) current = i; });
      links.forEach((l, i) => l.classList.toggle('active', i === current));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  async function init() {
    try {
      const res = await fetch('./data/data.json');
      if (!res.ok) throw new Error(res.status);
      data = await res.json();
    } catch (err) {
      console.error('No se pudo cargar data/data.json. Si abres index.html con file://, usa un servidor local.', err);
      return;
    }
    renderNav();
    renderHero();
    renderServices();
    renderSplitServices();
    renderPortfolio();
    renderAbout();
    renderReservations();
    renderFooter();
    bindEvents();
    refreshIcons();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
