export const siteData = {
  project_metadata: {
    title: 'CASO DE ESTUDIO / IVÁN CEREZO HAIR STUDIO',
    location: 'MEXICALI, BAJA CALIFORNIA',
    subtitle: 'EXPERIENCIA DIGITAL DE LUJO • VISUAL EXPERIENCE BOARD',
    brand_name: 'IVÁN CEREZO HAIR STUDIO',
    target_goal: 'Captación de clientes, reserva de citas y presentación de portafolio de servicios de belleza de lujo',
  },
  navigation: {
    logo: { text: 'IVÁN CEREZO HAIR STUDIO', alt: 'Iván Cerezo Hair Studio Logo' },
    menu_items: [
      { label: 'INICIO', href: '#inicio' },
      { label: 'SERVICIOS', href: '#servicios' },
      { label: 'PORTAFOLIO', href: '#portafolio' },
      { label: 'NOSOTROS', href: '#nosotros' },
      { label: 'RESERVAS', href: '#reservas' },
    ],
  },
  sections: {
    hero: {
      id: '01_desktop_inicio', title: 'EL ARTE DE LA ALTA PELUQUERÍA',
      description: 'Experiencia digital de lujo, atención personalizada, experto en diseño de imagen y color de alto nivel.',
      cta: { text: 'RESERVAR AHORA', action: 'open_booking_modal', href: '#reservas' },
    },
    services_overview: {
      id: '02_desktop_servicios', title: 'NUESTRAS EXPERIENCIAS',
      categories: [
        { id: 'hair_studio', name: 'HAIR STUDIO', active: true, href: '#hair-studio' },
        { id: 'cerezo_nails_bar', name: 'CEREZO NAILS BAR', active: false, href: '#nails-bar' },
        { id: 'belleza_maquillaje', name: 'BELLEZA & MAQUILLAJE', active: false, href: '#makeup' },
      ],
    },
    hair_studio_detail: {
      id: '03_desktop_hair_studio', title: 'HAIR STUDIO',
      services_list: ['Balayage', 'Rubios personalizados', 'Corrección de color', 'Corte de diseño'],
    },
    nails_bar: {
      id: '04_desktop_cerezo_nails_bar', title: 'LUXURY NAILS', subtitle: 'CEREZO NAILS BAR',
      services_list: ['Manicure', 'Pedicure', 'Esmaltado en Gel', 'Spa de manos y pies'],
    },
    makeup_and_brow: {
      id: '05_desktop_maquillaje_y_cejas', title: 'HIGH-END MAKEUP & BROW',
      services_list: ['Diseño de cejas', 'Laminado', 'Maquillaje profesional', 'Novias'],
    },
    portfolio: {
      id: '06_desktop_portafolio', title: 'PORTAFOLIO',
    },
    about_us: {
      id: '07_desktop_sobre_nosotros', role: 'DESIGNER', author: 'Iván Cerezo',
      bio: 'Especialista en alta peluquería, diseño de imagen y colorimetría avanzada. Enfocado en resaltar la belleza natural de cada cliente a través de técnicas de vanguardia y productos de lujo.',
      quote: 'Brand identity statement: ensuloss en de color.', imageCaption: 'Brand identity',
    },
    reservations: {
      id: '08_desktop_reservaciones', title: 'Agenda tu Experiencia',
      form: {
        fields: [
          { name: 'experience', type: 'select', placeholder: 'Agenda tu experiencia', options: ['Hair Studio', 'Nails Bar', 'Makeup & Brow'] },
          { name: 'location', type: 'text', value: 'Mexicali, B.C.', icon_name: 'map_pin', readonly: true },
        ],
        submit_button: { text: 'RESERVAR VÍA WHATSAPP / ONLINE', action: 'submit_booking' },
      },
      location_map: { city: 'Mexicali, B.C.', google_maps_url: 'https://maps.google.com/?q=Mexicali,B.C.' },
    },
    mobile_views: {
      mobile_inicio: { brand: 'IVÁN CEREZO', tagline: 'Hair Studio', cta: 'RESERVAR' },
      mobile_servicios: { header: 'ELEGIR SERVICIOS', options: [{ title: 'Hair Studio' }, { title: 'Nails Bar' }, { title: 'Belleza' }] },
      mobile_portafolio: { header: 'PORTAFOLIO' },
      mobile_reservar_cita: { header: 'AGENDA TU CITA', calendar_widget: { days_header: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] }, dropdowns: [{ label: 'Selecciona Servicio' }, { label: 'Selecciona Hora' }], inputs: [{ placeholder: 'Nombre y Teléfono' }], cta: 'RESERVAR CITA' },
    },
  },
} as const;

export const images = {
  hero: 'https://images.pexels.com/photos/30691549/pexels-photo-30691549.jpeg?auto=compress&cs=tinysrgb&w=1200',
  heroPortrait: 'https://images.pexels.com/photos/9016422/pexels-photo-9016422.jpeg?auto=compress&cs=tinysrgb&w=900',
  hair: [
    'https://images.pexels.com/photos/16442705/pexels-photo-16442705.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/19342940/pexels-photo-19342940.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/20894559/pexels-photo-20894559.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/20894552/pexels-photo-20894552.jpeg?auto=compress&cs=tinysrgb&w=900',
  ],
  nails: [
    'https://images.pexels.com/photos/35491156/pexels-photo-35491156.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/17280274/pexels-photo-17280274.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/15923916/pexels-photo-15923916.jpeg?auto=compress&cs=tinysrgb&w=900',
  ],
  makeup: 'https://images.pexels.com/photos/7256651/pexels-photo-7256651.jpeg?auto=compress&cs=tinysrgb&w=1000',
  artist: 'https://images.pexels.com/photos/5188621/pexels-photo-5188621.jpeg?auto=compress&cs=tinysrgb&w=900',
  portfolio: [
    'https://images.pexels.com/photos/30691549/pexels-photo-30691549.jpeg?auto=compress&cs=tinysrgb&w=700',
    'https://images.pexels.com/photos/16442705/pexels-photo-16442705.jpeg?auto=compress&cs=tinysrgb&w=700',
    'https://images.pexels.com/photos/19342940/pexels-photo-19342940.jpeg?auto=compress&cs=tinysrgb&w=700',
    'https://images.pexels.com/photos/20894559/pexels-photo-20894559.jpeg?auto=compress&cs=tinysrgb&w=700',
    'https://images.pexels.com/photos/20894552/pexels-photo-20894552.jpeg?auto=compress&cs=tinysrgb&w=700',
    'https://images.pexels.com/photos/9016422/pexels-photo-9016422.jpeg?auto=compress&cs=tinysrgb&w=700',
    'https://images.pexels.com/photos/7256651/pexels-photo-7256651.jpeg?auto=compress&cs=tinysrgb&w=700',
    'https://images.pexels.com/photos/6642208/pexels-photo-6642208.jpeg?auto=compress&cs=tinysrgb&w=700',
  ],
} as const;

export type BookingForm = { experience: string; name: string; phone: string; date: string; time: string };
