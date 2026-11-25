/**
 * ============================================================
 *  CONTENT DATA — replace products, images and copy here.
 *  Images use Pexels photo IDs (sample photography). To use your own
 *  photos, swap `img` for a full URL string, e.g. "/images/my-tile.jpg".
 * ============================================================
 */

export type CategoryId =
  | "marble"
  | "porcelain"
  | "ceramic"
  | "wood"
  | "onyx"
  | "stone"
  | "outdoor"
  | "slabs";

/** Pexels ID or full/relative URL */
export type ImgSrc = number | string;

export const imgUrl = (src: ImgSrc, w = 1200) =>
  typeof src === "number"
    ? `https://images.pexels.com/photos/${src}/pexels-photo-${src}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
    : src;

export const imgSrcSet = (src: ImgSrc) =>
  typeof src === "number"
    ? [480, 800, 1200, 1800, 2400].map((w) => `${imgUrl(src, w)} ${w}w`).join(", ")
    : undefined;

/* ---------------------------------------------------------- */
export const HERO_IMAGE: ImgSrc = 14011664;
export const ABOUT_IMAGE: ImgSrc = 7722168;
export const SHOWROOM_IMAGE: ImgSrc = 6987730;
export const INTERLUDE_IMAGE: ImgSrc = 6587860;

/* ---------------------------------------------------------- */
export interface Collection {
  id: CategoryId;
  name: string;
  short: string;
  blurb: string;
  designs: number;
  img: ImgSrc;
}

export const COLLECTIONS: Collection[] = [
  {
    id: "marble",
    name: "Italian Marble",
    short: "Marble",
    blurb: "Quarried in Carrara and Verona, book-matched by hand.",
    designs: 64,
    img: 7078686,
  },
  {
    id: "porcelain",
    name: "Premium Porcelain",
    short: "Porcelain",
    blurb: "Technical perfection with the soul of natural stone.",
    designs: 92,
    img: 4790056,
  },
  {
    id: "ceramic",
    name: "Ceramic Tiles",
    short: "Ceramic",
    blurb: "Glazed, tactile surfaces for walls of quiet character.",
    designs: 118,
    img: 9992549,
  },
  {
    id: "wood",
    name: "Wooden Finish",
    short: "Wood Finish",
    blurb: "The warmth of oak and walnut, with the resilience of porcelain.",
    designs: 41,
    img: 15066939,
  },
  {
    id: "onyx",
    name: "Onyx Collection",
    short: "Onyx",
    blurb: "Translucent, luminous and utterly unrepeatable.",
    designs: 18,
    img: 13214152,
  },
  {
    id: "stone",
    name: "Natural Stone",
    short: "Natural Stone",
    blurb: "Travertine, limestone and slate in honest, tactile finishes.",
    designs: 56,
    img: 8122356,
  },
  {
    id: "outdoor",
    name: "Outdoor & Elevation",
    short: "Outdoor",
    blurb: "Façades, terraces and pool decks that endure every season.",
    designs: 37,
    img: 7031406,
  },
  {
    id: "slabs",
    name: "Large Format Slabs",
    short: "Slabs",
    blurb: "Up to 3200 × 1600 mm — uninterrupted surfaces, almost no joints.",
    designs: 29,
    img: 4709407,
  },
];

/* ---------------------------------------------------------- */
export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  img: ImgSrc;
  dimensions: string[];
  finish: string;
  material: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    name: "Calacatta Oro",
    category: "marble",
    img: 7078686,
    dimensions: ["600 × 1200 mm", "800 × 800 mm", "1200 × 2400 mm"],
    finish: "Polished",
    material: "Italian Marble",
    description: "Luminous white ground with bold, golden-grey veining. A timeless statement for floors and feature walls.",
  },
  {
    id: "p02",
    name: "Statuario Venato",
    category: "marble",
    img: 5623204,
    dimensions: ["600 × 600 mm", "600 × 1200 mm"],
    finish: "Honed",
    material: "Italian Marble",
    description: "Soft, cloud-like veining across a pure white field. Calm, gallery-grade elegance.",
  },
  {
    id: "p03",
    name: "Nero Marquina",
    category: "marble",
    img: 3847492,
    dimensions: ["600 × 600 mm", "900 × 1800 mm"],
    finish: "Polished",
    material: "Spanish Marble",
    description: "Deep black with crisp white fissures — dramatic for bathrooms, bars and entrance halls.",
  },
  {
    id: "p04",
    name: "Onyx Ambra",
    category: "onyx",
    img: 13214152,
    dimensions: ["600 × 1200 mm", "1200 × 2400 mm"],
    finish: "Polished, backlit-ready",
    material: "Natural Onyx",
    description: "Honey-toned translucent onyx. Backlight it and the wall becomes a work of light.",
  },
  {
    id: "p05",
    name: "Onyx Miele",
    category: "onyx",
    img: 4709029,
    dimensions: ["600 × 1200 mm", "900 × 900 mm"],
    finish: "Polished",
    material: "Natural Onyx",
    description: "Earthy amber layers with delicate banding, ideal for vanity tops and accent panels.",
  },
  {
    id: "p06",
    name: "Terra Grigia",
    category: "porcelain",
    img: 6486630,
    dimensions: ["600 × 600 mm", "800 × 800 mm", "1200 × 1200 mm"],
    finish: "Matt, Anti-slip",
    material: "Full-body Porcelain",
    description: "A speckled, grounded neutral for contemporary homes, retail and hospitality floors.",
  },
  {
    id: "p07",
    name: "Terrazzo Bianco",
    category: "porcelain",
    img: 4977451,
    dimensions: ["600 × 600 mm", "1200 × 600 mm"],
    finish: "Satin",
    material: "Porcelain Stoneware",
    description: "A modern take on Venetian terrazzo with refined chips in soft ivory and grey.",
  },
  {
    id: "p08",
    name: "Sabbia Muro",
    category: "ceramic",
    img: 9992549,
    dimensions: ["300 × 600 mm", "400 × 800 mm"],
    finish: "Matt Glaze",
    material: "Ceramic",
    description: "Sand-toned wall tile with a quiet, hand-glazed softness. Perfect for kitchens and spas.",
  },
  {
    id: "p09",
    name: "Azzurro Lucido",
    category: "ceramic",
    img: 38843784,
    dimensions: ["100 × 300 mm", "200 × 200 mm"],
    finish: "High Gloss",
    material: "Ceramic",
    description: "Glossy Mediterranean blue with beautiful depth of glaze. Splashbacks, pools and feature walls.",
  },
  {
    id: "p10",
    name: "Rovere Spina",
    category: "wood",
    img: 15066939,
    dimensions: ["150 × 900 mm", "200 × 1200 mm"],
    finish: "Natural Textured",
    material: "Wood-look Porcelain",
    description: "Herringbone-ready European oak effect. All the warmth, none of the maintenance.",
  },
  {
    id: "p11",
    name: "Noce Plank",
    category: "wood",
    img: 36178801,
    dimensions: ["200 × 1200 mm", "230 × 1800 mm"],
    finish: "Brushed",
    material: "Wood-look Porcelain",
    description: "Rich walnut tones with fine grain relief; water-resistant for living areas and bathrooms.",
  },
  {
    id: "p12",
    name: "Pietra Serena",
    category: "stone",
    img: 8122356,
    dimensions: ["150 × 600 mm", "200 × 400 mm"],
    finish: "Split-face",
    material: "Natural Sandstone",
    description: "Vertical ledgestone with sculptural shadow lines for fireplaces and feature walls.",
  },
  {
    id: "p13",
    name: "Travertino Romano",
    category: "stone",
    img: 6952650,
    dimensions: ["400 × 800 mm", "600 × 1200 mm"],
    finish: "Honed & Filled",
    material: "Natural Travertine",
    description: "Warm, linear travertine from the Roman quarries. A signature of classic and modern villas alike.",
  },
  {
    id: "p14",
    name: "Dolomia Esterno",
    category: "outdoor",
    img: 3575827,
    dimensions: ["600 × 600 mm", "600 × 900 mm", "20 mm outdoor paver"],
    finish: "Anti-slip R11",
    material: "20 mm Porcelain",
    description: "Frost-proof, UV-stable outdoor paving in a rugged grey stone effect.",
  },
  {
    id: "p15",
    name: "Calacatta Viola Slab",
    category: "slabs",
    img: 4709407,
    dimensions: ["1600 × 3200 mm", "1200 × 2800 mm"],
    finish: "Polished",
    material: "Sintered Stone Slab",
    description: "A dramatic violet-brown veined slab for kitchen islands, wall cladding and bookmatched feature walls.",
  },
  {
    id: "p16",
    name: "Sahara Noir Slab",
    category: "slabs",
    img: 7718458,
    dimensions: ["1600 × 3200 mm", "1500 × 3000 mm"],
    finish: "Satin",
    material: "Sintered Stone Slab",
    description: "Sand and espresso strata in a single seamless sheet — for architects who dislike joints.",
  },
];

/* ---------------------------------------------------------- */
export interface Room {
  id: string;
  name: string;
  caption: string;
  tiles: string;
  img: ImgSrc;
}

export const ROOMS: Room[] = [
  {
    id: "living",
    name: "Living Rooms",
    caption: "Floors that quietly hold the whole room together.",
    tiles: "Calacatta Oro · 1200 × 2400",
    img: 8135496,
  },
  {
    id: "kitchen",
    name: "Kitchens",
    caption: "Splashbacks and islands in surfaces made to be touched.",
    tiles: "Calacatta Viola Slab · Satin",
    img: 18285887,
  },
  {
    id: "bathroom",
    name: "Bathrooms",
    caption: "A private spa, wrapped floor to ceiling in stone.",
    tiles: "Statuario Venato · Honed",
    img: 6587860,
  },
  {
    id: "bedroom",
    name: "Bedrooms",
    caption: "Softer textures, warmer tones, deeper rest.",
    tiles: "Rovere Spina · Natural",
    img: 8135502,
  },
  {
    id: "commercial",
    name: "Commercial Spaces",
    caption: "Hotel lobbies and flagship stores that make an entrance.",
    tiles: "Nero Marquina · Polished",
    img: 37969730,
  },
  {
    id: "exterior",
    name: "Exterior Elevations",
    caption: "Façades and terraces built to last generations.",
    tiles: "Dolomia Esterno · R11",
    img: 34378030,
  },
];

/* ---------------------------------------------------------- */
export interface Material {
  id: string;
  name: string;
  origin: string;
  note: string;
  img: ImgSrc;
  tone: string;
}

export const MATERIALS: Material[] = [
  {
    id: "calacatta",
    name: "Calacatta Oro",
    origin: "Carrara, Italy",
    note: "Luminous white with bold golden veining.",
    img: 7078686,
    tone: "#e9e5dc",
  },
  {
    id: "travertino",
    name: "Travertino Romano",
    origin: "Tivoli, Italy",
    note: "Warm, linear and endlessly calm.",
    img: 6952650,
    tone: "#cfbfa6",
  },
  {
    id: "onyx",
    name: "Onyx Ambra",
    origin: "Iran · Pakistan",
    note: "Translucent honey tones that glow when backlit.",
    img: 13214152,
    tone: "#b98a4c",
  },
  {
    id: "nero",
    name: "Nero Marquina",
    origin: "Markina, Spain",
    note: "Deep black, pierced by white lightning.",
    img: 3847492,
    tone: "#1c1c1b",
  },
  {
    id: "grigia",
    name: "Pietra Grigia",
    origin: "Dolomites, Italy",
    note: "Cool grey stone with a quiet, mineral grain.",
    img: 4709033,
    tone: "#8f8c86",
  },
];

export const TILE_FORMATS = [
  { id: "600", label: "600 × 600", w: 1, h: 1, cols: 12 },
  { id: "1200x600", label: "1200 × 600", w: 2, h: 1, cols: 6 },
  { id: "800", label: "800 × 800", w: 1, h: 1, cols: 8 },
  { id: "slab", label: "1600 × 3200 slab", w: 1, h: 2, cols: 3 },
];

/* ---------------------------------------------------------- */
export const TRUST = [
  {
    title: "Exceptional Product Quality",
    text: "Every slab is graded, calibrated and inspected against international standards before it leaves the quarry.",
    icon: "gem",
  },
  {
    title: "Extensive Design Collection",
    text: "Over 450 surfaces from Italy, Spain and beyond — from timeless marble to avant-garde sintered stone.",
    icon: "grid",
  },
  {
    title: "Professional Guidance",
    text: "Our design consultants work alongside architects and homeowners from first mood board to final grout line.",
    icon: "compass",
  },
  {
    title: "Reliable Supply",
    text: "Large, climate-controlled stock holdings so your project is never delayed — and every batch matches.",
    icon: "truck",
  },
  {
    title: "Quality Assurance",
    text: "Batch-matched shade control, breakage protection and a written warranty on every installation.",
    icon: "shield",
  },
  {
    title: "Customer Satisfaction",
    text: "Dedicated after-sales care and long-term relationships with thousands of delighted clients.",
    icon: "heart",
  },
] as const;

/* ---------------------------------------------------------- */
export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  year: string;
  img: ImgSrc;
}

export const PROJECTS: Project[] = [
  { id: "pr1", title: "The Marble Residence", type: "Luxury Residential", location: "Sample location", year: "2024", img: 8135492 },
  { id: "pr2", title: "Grand Hotel Foyer", type: "Commercial Interior", location: "Sample location", year: "2023", img: 13369841 },
  { id: "pr3", title: "Villa Horizon", type: "Modern Architecture", location: "Sample location", year: "2024", img: 17174768 },
  { id: "pr4", title: "Spa Suite Nº 4", type: "Premium Bathroom", location: "Sample location", year: "2023", img: 8134805 },
  { id: "pr5", title: "Gallery Floor", type: "Luxury Flooring", location: "Sample location", year: "2022", img: 8143680 },
];

/* ---------------------------------------------------------- */
export const TESTIMONIALS = [
  {
    quote:
      "They understood the project before we had finished explaining it. The Calacatta slabs arrived perfectly matched, and the finished floor is the first thing every guest remarks on.",
    name: "Sample Client One",
    role: "Homeowner · Villa Renovation",
  },
  {
    quote:
      "Reliable supply and an extraordinary eye. As an architect, I can specify with total confidence that what I draw is what we receive.",
    name: "Sample Client Two",
    role: "Principal Architect · Studio Partner",
  },
  {
    quote:
      "Our hotel lobby needed scale, durability and quiet luxury. The team delivered all three — on schedule, and without a single compromise.",
    name: "Sample Client Three",
    role: "Hospitality Developer",
  },
  {
    quote:
      "From selection to installation guidance, the service felt like a private design consultation. Our bathroom now feels like a retreat.",
    name: "Sample Client Four",
    role: "Interior Designer",
  },
];

export const STATS = [
  { value: 25, suffix: "+", label: "Years of expertise" },
  { value: 450, suffix: "+", label: "Surfaces in the collection" },
  { value: 3200, suffix: "", label: "Projects completed" },
  { value: 12, suffix: "", label: "Countries sourced from" },
];
