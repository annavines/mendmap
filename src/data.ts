export type ClothingCategory =
  | "Coats"
  | "Shoes"
  | "Dresses"
  | "Trousers"
  | "Kidswear"
  | "Accessories"
  | "Workwear"
  | "Sportswear"
  | "Knitwear";

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

export const events: MendEvent[] = [
  {
    id: "hackney-swap",
    name: "Hackney Wardrobe Swap",
    type: "Swap",
    date: "Today",
    time: "14:00-17:00",
    locationName: "Hackney Bridge",
    borough: "Hackney",
    coordinates: [-0.0213, 51.5432],
    lookingFor: ["Coats", "Kidswear", "Knitwear"],
    description:
      "A neighbourhood clothing swap with rails for winter layers, childrenswear, and repairs on site.",
    host: "East London Circular",
  },
  {
    id: "brixton-repair",
    name: "Brixton Mend & Match",
    type: "Repair",
    date: "Tomorrow",
    time: "11:30-15:30",
    locationName: "Brixton House",
    borough: "Lambeth",
    coordinates: [-0.1147, 51.4627],
    lookingFor: ["Dresses", "Trousers", "Accessories"],
    description:
      "Drop in for zip fixes, hem advice, and a small exchange rail curated by local volunteers.",
    host: "Brixton Remake Club",
  },
  {
    id: "camden-rail",
    name: "Camden Community Rail",
    type: "Donation",
    date: "Sat 18 May",
    time: "10:00-16:00",
    locationName: "St Pancras Community Association",
    borough: "Camden",
    coordinates: [-0.1327, 51.5416],
    lookingFor: ["Workwear", "Shoes", "Coats"],
    description:
      "Collecting interview clothing, smart shoes, and outerwear for local referral partners.",
    host: "North London Mutual Aid",
  },
  {
    id: "peckham-market",
    name: "Peckham Preloved Market",
    type: "Market",
    date: "Sun 19 May",
    time: "12:00-18:00",
    locationName: "Copeland Park",
    borough: "Southwark",
    coordinates: [-0.0677, 51.4695],
    lookingFor: ["Sportswear", "Dresses", "Accessories"],
    description:
      "Independent sellers, free rails, and a community table for items people want to rehome quickly.",
    host: "Peckham Sustainable Style",
  },
  {
    id: "walthamstow-kids",
    name: "Walthamstow Little Layers",
    type: "Swap",
    date: "Wed 22 May",
    time: "09:30-12:30",
    locationName: "Crate St James",
    borough: "Waltham Forest",
    coordinates: [-0.0233, 51.5829],
    lookingFor: ["Kidswear", "Shoes", "Sportswear"],
    description:
      "A parent-friendly swap for fast-growing wardrobes, school shoes, and weekend sports kit.",
    host: "Mini Mend Network",
  },
  {
    id: "lewisham-loop",
    name: "Lewisham Loop Wardrobe",
    type: "Donation",
    date: "Thu 23 May",
    time: "17:00-20:00",
    locationName: "Catford Mews",
    borough: "Lewisham",
    coordinates: [-0.0204, 51.4452],
    lookingFor: ["Trousers", "Knitwear", "Workwear"],
    description:
      "Evening drop-off and browse session focused on work basics, knitwear, and everyday staples.",
    host: "Lewisham Share Shed",
  },
];

export const inventory: ClothingItem[] = [
  {
    id: "coat-1",
    eventId: "hackney-swap",
    title: "Camel wool coat",
    category: "Coats",
    size: "M",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=700&q=80",
    note: "Warm, structured, light wear on cuffs.",
  },
  {
    id: "kids-1",
    eventId: "hackney-swap",
    title: "Striped kids jumper",
    category: "Kidswear",
    size: "Age 5-6",
    condition: "Excellent",
    imageUrl:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80",
    note: "Soft cotton knit, freshly washed.",
  },
  {
    id: "knit-1",
    eventId: "hackney-swap",
    title: "Chunky green cardigan",
    category: "Knitwear",
    size: "L",
    condition: "Very good",
    imageUrl:
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=700&q=80",
    note: "Oversized fit with deep pockets.",
  },
  {
    id: "dress-1",
    eventId: "brixton-repair",
    title: "Blue midi dress",
    category: "Dresses",
    size: "10",
    condition: "Needs repair",
    imageUrl:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
    note: "Zip needs replacing, fabric is pristine.",
  },
  {
    id: "trousers-1",
    eventId: "brixton-repair",
    title: "Wide-leg black trousers",
    category: "Trousers",
    size: "12",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80",
    note: "Hem has been pinned for adjustment.",
  },
  {
    id: "work-1",
    eventId: "camden-rail",
    title: "Navy interview blazer",
    category: "Workwear",
    size: "S",
    condition: "Excellent",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
    note: "Clean, simple cut, suitable for interviews.",
  },
  {
    id: "shoes-1",
    eventId: "camden-rail",
    title: "Black leather brogues",
    category: "Shoes",
    size: "UK 7",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
    note: "Polished and ready to wear.",
  },
  {
    id: "sports-1",
    eventId: "peckham-market",
    title: "Running windbreaker",
    category: "Sportswear",
    size: "M",
    condition: "Very good",
    imageUrl:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=700&q=80",
    note: "Lightweight, packs into side pocket.",
  },
  {
    id: "acc-1",
    eventId: "peckham-market",
    title: "Patterned silk scarf",
    category: "Accessories",
    size: "One size",
    condition: "Excellent",
    imageUrl:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=700&q=80",
    note: "Bright print, no visible marks.",
  },
  {
    id: "kids-2",
    eventId: "walthamstow-kids",
    title: "School raincoat",
    category: "Kidswear",
    size: "Age 7-8",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=700&q=80",
    note: "Waterproof with reflective trim.",
  },
  {
    id: "shoes-2",
    eventId: "walthamstow-kids",
    title: "Junior football boots",
    category: "Shoes",
    size: "UK 2",
    condition: "Fair",
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=700&q=80",
    note: "Plenty of use left for weekend training.",
  },
  {
    id: "work-2",
    eventId: "lewisham-loop",
    title: "Cotton work shirt bundle",
    category: "Workwear",
    size: "M",
    condition: "Good",
    imageUrl:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",
    note: "Three shirts, neutral colours.",
  },
  {
    id: "knit-2",
    eventId: "lewisham-loop",
    title: "Cream ribbed jumper",
    category: "Knitwear",
    size: "S",
    condition: "Very good",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80",
    note: "Soft rib knit, relaxed sleeves.",
  },
];

export const menders: Mender[] = [
  {
    id: "thread-house-soho",
    name: "Thread House Soho",
    borough: "Westminster",
    locationName: "Berwick Street Studio",
    coordinates: [-0.1465, 51.5388],
    specialties: ["Dresses", "Trousers", "Workwear", "Accessories"],
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
    specialties: ["Coats", "Knitwear", "Kidswear"],
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
    specialties: ["Shoes", "Sportswear", "Trousers", "Coats"],
    description:
      "Community repair stall for sports kit, replacement fastenings, basic shoe fixes, and weatherproofing.",
    availability: "Next clinic tomorrow",
  },
];
