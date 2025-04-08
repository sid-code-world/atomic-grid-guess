
export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category: string;
  group: number;
  period: number;
  block: string;
  properties: string[];
  position: { row: number; col: number };
}

export const periodicTableElements: Element[] = [
  {
    atomicNumber: 1,
    symbol: "H",
    name: "Hydrogen",
    atomicMass: "1.008",
    category: "nonmetal",
    group: 1,
    period: 1,
    block: "s",
    properties: ["Lightest element", "Most abundant element in the universe", "Highly flammable"],
    position: { row: 1, col: 1 }
  },
  {
    atomicNumber: 2,
    symbol: "He",
    name: "Helium",
    atomicMass: "4.0026",
    category: "noble gas",
    group: 18,
    period: 1,
    block: "s",
    properties: ["Second lightest element", "Used in balloons", "Unreactive gas"],
    position: { row: 1, col: 18 }
  },
  {
    atomicNumber: 3,
    symbol: "Li",
    name: "Lithium",
    atomicMass: "6.94",
    category: "alkali metal",
    group: 1,
    period: 2,
    block: "s",
    properties: ["Lightest metal", "Used in batteries", "Highly reactive"],
    position: { row: 2, col: 1 }
  },
  {
    atomicNumber: 4,
    symbol: "Be",
    name: "Beryllium",
    atomicMass: "9.0122",
    category: "alkaline earth metal",
    group: 2,
    period: 2,
    block: "s",
    properties: ["Toxic", "Used in aerospace", "High melting point"],
    position: { row: 2, col: 2 }
  },
  {
    atomicNumber: 5,
    symbol: "B",
    name: "Boron",
    atomicMass: "10.81",
    category: "metalloid",
    group: 13,
    period: 2,
    block: "p",
    properties: ["Semiconductor", "Used in detergents", "Low abundance"],
    position: { row: 2, col: 13 }
  },
  {
    atomicNumber: 6,
    symbol: "C",
    name: "Carbon",
    atomicMass: "12.011",
    category: "nonmetal",
    group: 14,
    period: 2,
    block: "p",
    properties: ["Basis of organic chemistry", "Forms diamonds and graphite", "Essential for life"],
    position: { row: 2, col: 14 }
  },
  {
    atomicNumber: 7,
    symbol: "N",
    name: "Nitrogen",
    atomicMass: "14.007",
    category: "nonmetal",
    group: 15,
    period: 2,
    block: "p",
    properties: ["Most abundant gas in Earth's atmosphere", "Used in fertilizers", "Forms strong triple bonds"],
    position: { row: 2, col: 15 }
  },
  {
    atomicNumber: 8,
    symbol: "O",
    name: "Oxygen",
    atomicMass: "15.999",
    category: "nonmetal",
    group: 16,
    period: 2,
    block: "p",
    properties: ["Essential for respiration", "Makes up 21% of Earth's atmosphere", "Highly reactive"],
    position: { row: 2, col: 16 }
  },
  {
    atomicNumber: 9,
    symbol: "F",
    name: "Fluorine",
    atomicMass: "18.998",
    category: "halogen",
    group: 17,
    period: 2,
    block: "p",
    properties: ["Most electronegative element", "Highly reactive", "Used in toothpaste"],
    position: { row: 2, col: 17 }
  },
  {
    atomicNumber: 10,
    symbol: "Ne",
    name: "Neon",
    atomicMass: "20.180",
    category: "noble gas",
    group: 18,
    period: 2,
    block: "p",
    properties: ["Used in neon signs", "Inert gas", "Low reactivity"],
    position: { row: 2, col: 18 }
  },
  {
    atomicNumber: 11,
    symbol: "Na",
    name: "Sodium",
    atomicMass: "22.990",
    category: "alkali metal",
    group: 1,
    period: 3,
    block: "s",
    properties: ["Highly reactive metal", "Essential for nerve function", "Used in salt (NaCl)"],
    position: { row: 3, col: 1 }
  },
  {
    atomicNumber: 12,
    symbol: "Mg",
    name: "Magnesium",
    atomicMass: "24.305",
    category: "alkaline earth metal",
    group: 2,
    period: 3,
    block: "s",
    properties: ["Burns with bright white light", "Used in alloys", "Essential for chlorophyll"],
    position: { row: 3, col: 2 }
  },
  {
    atomicNumber: 13,
    symbol: "Al",
    name: "Aluminum",
    atomicMass: "26.982",
    category: "post-transition metal",
    group: 13,
    period: 3,
    block: "p",
    properties: ["Lightweight metal", "Abundant in Earth's crust", "Highly recyclable"],
    position: { row: 3, col: 13 }
  },
  {
    atomicNumber: 14,
    symbol: "Si",
    name: "Silicon",
    atomicMass: "28.085",
    category: "metalloid",
    group: 14,
    period: 3,
    block: "p",
    properties: ["Semiconductor", "Used in electronics", "Second most abundant element in Earth's crust"],
    position: { row: 3, col: 14 }
  },
  {
    atomicNumber: 15,
    symbol: "P",
    name: "Phosphorus",
    atomicMass: "30.974",
    category: "nonmetal",
    group: 15,
    period: 3,
    block: "p",
    properties: ["Essential for DNA and RNA", "Used in fertilizers", "Can ignite spontaneously"],
    position: { row: 3, col: 15 }
  },
  {
    atomicNumber: 16,
    symbol: "S",
    name: "Sulfur",
    atomicMass: "32.06",
    category: "nonmetal",
    group: 16,
    period: 3,
    block: "p",
    properties: ["Yellow solid", "Used in rubber vulcanization", "Component of amino acids"],
    position: { row: 3, col: 16 }
  },
  {
    atomicNumber: 17,
    symbol: "Cl",
    name: "Chlorine",
    atomicMass: "35.45",
    category: "halogen",
    group: 17,
    period: 3,
    block: "p",
    properties: ["Used in water purification", "Green gas", "Salt component"],
    position: { row: 3, col: 17 }
  },
  {
    atomicNumber: 18,
    symbol: "Ar",
    name: "Argon",
    atomicMass: "39.948",
    category: "noble gas",
    group: 18,
    period: 3,
    block: "p",
    properties: ["Used in light bulbs", "Third most abundant gas in Earth's atmosphere", "Inert gas"],
    position: { row: 3, col: 18 }
  },
  {
    atomicNumber: 19,
    symbol: "K",
    name: "Potassium",
    atomicMass: "39.098",
    category: "alkali metal",
    group: 1,
    period: 4,
    block: "s",
    properties: ["Essential for plants", "Highly reactive with water", "Used in fertilizers"],
    position: { row: 4, col: 1 }
  },
  {
    atomicNumber: 20,
    symbol: "Ca",
    name: "Calcium",
    atomicMass: "40.078",
    category: "alkaline earth metal",
    group: 2,
    period: 4,
    block: "s",
    properties: ["Essential for bones and teeth", "Used in construction", "Fifth most abundant element in Earth's crust"],
    position: { row: 4, col: 2 }
  }
];

// Utility function to get elements by their position on the table
export const getElementByPosition = (row: number, col: number): Element | undefined => {
  return periodicTableElements.find(element => 
    element.position.row === row && element.position.col === col
  );
};

// Get the neighboring elements of a specific element
export const getNeighborElements = (element: Element): Element[] => {
  const { row, col } = element.position;
  return periodicTableElements.filter(e => 
    (e.position.row === row && (e.position.col === col - 1 || e.position.col === col + 1)) ||
    (e.position.col === col && (e.position.row === row - 1 || e.position.row === row + 1))
  );
};

// Get a random element from the periodic table
export const getRandomElement = (): Element => {
  const randomIndex = Math.floor(Math.random() * periodicTableElements.length);
  return periodicTableElements[randomIndex];
};
