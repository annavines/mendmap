export type ClothingCategory =
  | "High Fashion"
  | "Fast Fashion"
  | "Fancy Dress"
  | "Y2K"
  | "Vintage"
  | "Sustainable"
  | "Streetwear"
  | "Minimalist";

export type EventType = "Swap" | "Repair" | "Donation" | "Market";
export type MapLayer = "second-hand" | "menders";

export type MendEvent = {
  id: string;
  name: string;
  type: EventType;
  date: string;
  time: string;
  locationName: string;
  borough: string;
  coordinates: [number, number];
  lookingFor: ClothingCategory[];
  description: string;
  host: string;
};

export type ClothingItem = {
  id: string;
  eventId: string;
  title: string;
  category: ClothingCategory;
  size: string;
  condition: string;
  imageUrl: string;
  note: string;
};

export type Mender = {
  id: string;
  name: string;
  borough: string;
  locationName: string;
  coordinates: [number, number];
  specialties: ClothingCategory[];
  description: string;
  availability: string;
};

export const categories: ClothingCategory[] = [
  "High Fashion",
  "Fast Fashion",
  "Fancy Dress",
  "Y2K",
  "Vintage",
  "Sustainable",
  "Streetwear",
  "Minimalist",
];

export const events: MendEvent[] = [
  {
    id: "hackney-swap",
    name: "Natural Materials Swap",
    type: "Swap",
    date: "Today",
    time: "14:00-17:00",
    locationName: "Hackney Bridge",
    borough: "Hackney",
    coordinates: [-0.0213, 51.5432],
    lookingFor: ["Vintage", "Sustainable", "Minimalist"],
    description:
      "Curated swap celebrating organic fabrics, natural dyes, and sustainable textiles. Focus on linen, wool, cotton, and hemp pieces with timeless appeal.",
    host: "East London Circular",
  },
  {
    id: "brixton-repair",
    name: "Y2K Revival Lab",
    type: "Repair",
    date: "Tomorrow",
    time: "11:30-15:30",
    locationName: "Brixton House",
    borough: "Lambeth",
    coordinates: [-0.1147, 51.4627],
    lookingFor: ["Fancy Dress", "Minimalist", "Y2K"],
    description:
      "Repair and upcycle your Y2K pieces—baby tees, cargo pants, and early 2000s silhouettes. Expert mending plus styling advice and restoration tips.",
    host: "Brixton Remake Club",
  },
  {
    id: "camden-rail",
    name: "Minimalist Edit Collective",
    type: "Donation",
    date: "Sat 18 May",
    time: "10:00-16:00",
    locationName: "St Pancras Community Association",
    borough: "Camden",
    coordinates: [-0.1327, 51.5416],
    lookingFor: ["Sustainable", "Streetwear", "Minimalist"],
    description:
      "Celebrate refined simplicity with neutral palettes and timeless silhouettes. Perfect basics, clean lines, and capsule-ready pieces for everyday elegance.",
    host: "North London Mutual Aid",
  },
  {
    id: "peckham-market",
    name: "Vintage x Streetwear Fusion",
    type: "Market",
    date: "Sun 19 May",
    time: "12:00-18:00",
    locationName: "Copeland Park",
    borough: "Southwark",
    coordinates: [-0.0677, 51.4695],
    lookingFor: ["Streetwear", "Fancy Dress", "Y2K"],
    description:
      "Where vintage meets modern street style. Curated selection of retro pieces, contemporary urban wear, and eclectic finds from independent collectors.",
    host: "Peckham Sustainable Style",
  },
  {
    id: "walthamstow-kids",
    name: "Sustainable Kids Edit",
    type: "Swap",
    date: "Wed 22 May",
    time: "09:30-12:30",
    locationName: "Crate St James",
    borough: "Waltham Forest",
    coordinates: [-0.0233, 51.5829],
    lookingFor: ["Fast Fashion", "Streetwear", "Sustainable"],
    description:
      "Eco-conscious children's fashion swap featuring organic, ethically-made pieces. Quality kids clothing that grows with them, swapped with parents who care.",
    host: "Mini Mend Network",
  },
  {
    id: "lewisham-loop",
    name: "High Fashion Archive",
    type: "Donation",
    date: "Thu 23 May",
    time: "17:00-20:00",
    locationName: "Catford Mews",
    borough: "Lewisham",
    coordinates: [-0.0204, 51.4452],
    lookingFor: ["Minimalist", "Vintage", "Sustainable"],
    description:
      "Elevated evening event celebrating designer pieces, luxury fabrics, and statement items. Premium contributions create accessible high fashion for all.",
    host: "Lewisham Share Shed",
  },
];

export const inventory: ClothingItem[] = [
  {
    id: "coat-1",
    eventId: "hackney-swap",
    title: "Camel wool coat",
    category: "Vintage",
    size: "M",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1539533057566-69f90869fc20?auto=format&fit=crop&w=700&q=80",
    note: "Warm, structured, light wear on cuffs.",
  },
  {
    id: "kids-1",
    eventId: "hackney-swap",
    title: "Striped kids jumper",
    category: "Sustainable",
    size: "Age 5-6",
    condition: "Excellent",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80",
    note: "Soft organic cotton knit, freshly washed.",
  },
  {
    id: "knit-1",
    eventId: "hackney-swap",
    title: "Chunky green cardigan",
    category: "Minimalist",
    size: "L",
    condition: "Very good",
    imageUrl:
      "https://images.unsplash.com/photo-1597783299271-ef6b5e0da6d0?auto=format&fit=crop&w=700&q=80",
    note: "Oversized fit with deep pockets.",
  },
  {
    id: "dress-1",
    eventId: "brixton-repair",
    title: "Blue midi dress",
    category: "Fancy Dress",
    size: "10",
    condition: "Needs repair",
    imageUrl:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=700&q=80",
    note: "Zip needs replacing, fabric is pristine.",
  },
  {
    id: "trousers-1",
    eventId: "brixton-repair",
    title: "Wide-leg black trousers",
    category: "Minimalist",
    size: "12",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1506629082632-20d4c0ac2b5e?auto=format&fit=crop&w=700&q=80",
    note: "Hem has been pinned for adjustment.",
  },
  {
    id: "work-1",
    eventId: "camden-rail",
    title: "Navy interview blazer",
    category: "Minimalist",
    size: "S",
    condition: "Excellent",
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
    note: "Clean, tailored cut, perfect for professional settings.",
  },
  {
    id: "shoes-1",
    eventId: "camden-rail",
    title: "Black leather brogues",
    category: "Streetwear",
    size: "UK 7",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    note: "Polished and ready to wear. Classic streetwear essential.",
  },
  {
    id: "sports-1",
    eventId: "peckham-market",
    title: "Running windbreaker",
    category: "Streetwear",
    size: "M",
    condition: "Very good",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80",
    note: "Lightweight, technical fabric. Urban sport aesthetic.",
  },
  {
    id: "acc-1",
    eventId: "peckham-market",
    title: "Patterned silk scarf",
    category: "Y2K",
    size: "One size",
    condition: "Excellent",
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
    note: "Bright vintage print. Iconic Y2K accessory.",
  },
  {
    id: "kids-2",
    eventId: "walthamstow-kids",
    title: "School raincoat",
    category: "Fast Fashion",
    size: "Age 7-8",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=700&q=80",
    note: "Waterproof with reflective trim. Durable kids' wear.",
  },
  {
    id: "shoes-2",
    eventId: "walthamstow-kids",
    title: "Junior football boots",
    category: "Streetwear",
    size: "UK 2",
    condition: "Fair",
    imageUrl:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=80",
    note: "Plenty of use left. Iconic street style piece.",
  },
  {
    id: "work-2",
    eventId: "lewisham-loop",
    title: "Cotton work shirt bundle",
    category: "Minimalist",
    size: "M",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
    note: "Timeless basics. Neutral colours for capsule wardrobe.",
  },
  {
    id: "knit-2",
    eventId: "lewisham-loop",
    title: "Cream ribbed jumper",
    category: "Vintage",
    size: "S",
    condition: "Very good",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
    note: "Soft neutral rib knit. Effortlessly elegant.",
  },
];

export const menders: Mender[] = [
  {
    id: "thread-house-soho",
    name: "Thread House Soho",
    borough: "Westminster",
    locationName: "Berwick Street Studio",
    coordinates: [-0.1465, 51.5388],
    specialties: ["Fancy Dress", "Minimalist", "Vintage", "Y2K"],
    description:
      "Fast alterations, zip replacements, trouser hems, and careful visible mending for favourite pieces.",
    availability: "Appointments this week",
  },
  {
    id: "east-end-repair-room",
    name: "East End Repair Room",
    borough: "Tower Hamlets",
    locationName: "Roman Road Workshop",
    coordinates: [-0.0348, 51.5308],
    specialties: ["Minimalist", "Vintage", "Sustainable"],
    description:
      "Outerwear patching, knitwear darning, school uniform fixes, and practical repairs for daily wear.",
    availability: "Drop-ins Saturday",
  },
  {
    id: "south-loop-stitch",
    name: "South Loop Stitch",
    borough: "Lambeth",
    locationName: "Herne Hill Market",
    coordinates: [-0.1021, 51.4532],
    specialties: ["Streetwear", "Sustainable", "Minimalist", "Fast Fashion"],
    description:
      "Community repair stall for sports kit, replacement fastenings, basic shoe fixes, and weatherproofing.",
    availability: "Next clinic tomorrow",
  },
];
