export interface Project {
  id: string;
  title: string;
  category: 'branding' | 'web' | 'music' | 'creative';
  categoryLabel: string;
  image: string;
  client: string;
  description: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  text: string;
  author: string;
  role: string;
  category: string;
}

export const PROJECTS: Project[] = [
  {
    id: "dangerous-prayer-points",
    title: "Dangerous Prayer Points Campaign",
    category: "creative",
    categoryLabel: "Creative Direction & Print Media",
    image: "/input_file_1.png",
    client: "True Salvation in Christ Ministry",
    description: "High-impact visual strategy and custom layout typography developed for the May breakthrough sessions, achieving a soulful and authoritative spiritual atmosphere."
  },
  {
    id: "raising-holy-children",
    title: "Raising Holy Children in an Ungodly World",
    category: "branding",
    categoryLabel: "Social Media Campaign & Art Direction",
    image: "/input_file_2.png",
    client: "Apostle Michael Osei Afreh",
    description: "Editorial graphics and premium visual identity developed to share critical educational faith guidance for families in Ghana and globally."
  },
  {
    id: "holiness-not-optional",
    title: "Holiness is Not Optional",
    category: "creative",
    categoryLabel: "Cinematic Flyer & Media Production",
    image: "/input_file_3.png",
    client: "True Salvation Lecture Series",
    description: "A gorgeous luxury golden editorial illustration matching gold letterpress accents for high-energy international streaming teachings."
  },
  {
    id: "dangerous-consequences",
    title: "The Dangerous Consequences of Ungratefulness",
    category: "creative",
    categoryLabel: "Executive Broadcaster Graphics",
    image: "/input_file_4.png",
    client: "Ministry Media Network",
    description: "Premium double-breasted suit visual direction, high contrast layouts, and editorial typography designed to inspire genuine soulful reflection."
  },
  {
    id: "mefiri-ghana-visual",
    title: "Mefiri Ghana Visual Identity",
    category: "web",
    categoryLabel: "Tourism Experience & Web Design",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800",
    client: "Ghana Cultural Initiative",
    description: "An elegant storytelling portal preserving and celebrating rich native Ghanaian heritages, custom typography, and gold-dust responsive UI."
  },
  {
    id: "beyond-entertainment",
    title: "Beyond Entertainment Podcast",
    category: "music",
    categoryLabel: "Audio Branding & Podcast Production",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800",
    client: "AD Prince Audio Network",
    description: "Complete sonic signature design, spatial music production, and cinematic video podcasts conveying eternal faith-driven truths."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    stars: 5,
    text: "Working with Heaven Minded Studios completely transformed our ministry visual presence. AD Prince and his team don't just create graphic designs—they capture the raw spiritual density and emotion of the Gospel message. Every single flyer has drawn more visitors to our physical and virtual events.",
    author: "Apostle Michael Osei Afreh",
    role: "Presiding Pastor, True Salvation in Christ Ministry",
    category: "Global Ministry Media"
  },
  {
    id: "testimonial-2",
    stars: 5,
    text: "They are on another level. It feels like an A24 production. If you want a design, a film, or a campaign that has both premium elite aesthetics and genuine divine soul, AD Prince is the absolute gold standard.",
    author: "Dominic Acheampong",
    role: "Ghana Creative Initiative",
    category: "Branding & Web Design"
  },
  {
    id: "testimonial-3",
    stars: 5,
    text: "Heaven Minded Studios designed a landing page and visual system that immediately positions us as global leaders. The Gold and Navy styling, professional spacing, and fast loading time are masterful.",
    author: "Sarah Mensah",
    role: "Kingdom Builders Association",
    category: "Global NGO"
  }
];
