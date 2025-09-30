import MbbrImg from "@/assets/mbbr.png";

export const modelsList = [
  {
    id: 1,
    title: "MBBR (Moving Bed Biofilm Reactor)",
    description:
      "A biological wastewater treatment process that uses free-floating plastic carriers with high surface area for biofilm growth. The carriers move freely in the reactor, providing efficient organic matter and nitrogen removal through aerobic biological processes",
    category: "Biological Treatment",
    expectedResults: [
      "Loading Rates",
      "Tank Volumes",
      "Media Surface Area",
      "Tank Dimensions",
    ],
    image: MbbrImg,
    imageAlt: "MBBR Treatment Model",
  },

  {
    id: 2,
    title: "Anaerobic Digestion (AD)",
    description:
      "A biochemical process where microorganisms break down organic matter (sludge, biosolids) in the absence of oxygen. The primary outputs are treated solids and valuable biogas (primarily methane and carbon dioxide).",
    category: "Sludge & Resource Recovery",
    expectedResults: [
      "Volatile Solids Reduction",
      "Biogas Production Rate",
      "Digester Volume",
      "Retention Time",
    ],
    image: MbbrImg,
    imageAlt: "Anaerobic Digestion Biogas Reactor Model",
  },

  {
    id: 3,
    title: "Septic Tank",
    description:
      "A decentralized on-site wastewater treatment system that uses settling and anaerobic processes to treat sewage from individual homes or small communities. Solids settle to the bottom as sludge, and effluent flows to a drainfield.",
    category: "Preliminary Treatment",
    expectedResults: [
      "Tank Volume & Dimensions",
      "Hydraulic Retention Time",
      "Sludge Accumulation Rate",
      "Required Drainfield Area",
    ],
    image: MbbrImg,
    imageAlt: "Simple Septic Tank Model for On-site Treatment",
  },

  {
    id: 4,
    title: "Upflow Anaerobic Sludge Bed Reactor (UASB)",
    description:
      "A high-rate anaerobic treatment system that uses a dense blanket of microbial granules to treat wastewater flowing upwards. This system is energy-efficient and highly effective for organic removal in warm climates or industrial applications.",
    category: "Biological Treatment",
    expectedResults: [
      "Sludge Bed Velocity",
      "Organic Loading Rate (OLR)",
      "Methane Yield",
      "Effluent COD Concentration",
    ],
    image: MbbrImg,
    imageAlt: "UASB Reactor High-Rate Wastewater Model",
  },
];
