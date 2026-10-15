export interface Partner {
  name: string;
  category: string;
  description: string;
  tag?: string;
  logoText: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  specifications: string[];
  features: string[];
  applications: string[];
  badge?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  bio: string;
  image: string;
  credentials?: string;
  phone?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const COMPANY_INFO = {
  name: "Danish International",
  shortName: "DI",
  tagline: "Global Nuclear Medicine Services & Healthcare Solutions",
  subtitle: "Pioneering radiation therapy, PET/CT hot lab instrumentation, and medical physics technologies across Pakistan and international markets.",
  foundedYear: 1999,
  yearsExperience: 25,
  stats: {
    experience: "25+",
    partners: "14+",
    categories: "10+",
    productsServed: "500+",
    facilitiesEquipped: "120+",
  },
  contact: {
    address: "51-F, 2nd Floor, Main Boulevard, Punjab Co-Operative Housing Society, Ghazi Road",
    city: "Lahore",
    postalCode: "54000",
    country: "Pakistan",
    phone: "(+92) 423-5923982",
    mobile: "+92 300 8472918",
    email: "sales@danish-international.com",
    supportEmail: "info@danish-international.com",
    skype: "danish.international",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM PKT",
  },
  socials: {
    twitter: "https://twitter.com/DanishInternat1",
    facebook: "https://facebook.com/Danishinternational",
    linkedin: "https://linkedin.com/in/sohail-bhatti-185a2347",
    skype: "skype:danish.international?call",
  },
  // Vision & Mission: wording from danish-international.com/about-us (typos corrected only).
  mission: "Danish International develops nuclear medicine, PET/CT Hot Lab, QA accessories and immobilization devices for healthcare facilities of Pakistan. These products are not only essential for medical procedures of radiotherapy, linac and brachytherapy but are also key to creating an environment that is least harmful to the safety of the people.",
  missionMore: "Danish International works towards creating an environment that is sustainable and most accommodating to the health of the people of Pakistan. We aim to be able to provide what is beneficial to the medical sectors of Pakistan and best for its progress.",
  vision: "Our vision is to one day be able to expand our expertise all around Pakistan, to even its most remote areas. We wish to see the medical sector of the country progress and grow compared to its current state.",
  visionMore: "And then, once we have provided for this country, we wish to expand our expertise all around the world. Danish International aims to be at the top and is working to gradually reach the peak.",
  // About copy: danish-international.com home page.
  aboutStory: "Danish International is a privately held company engaged in developing and selling Nuclear Medicine, PET/CT Hot Lab, QA accessories, Deep Brain Stimulation, Patient Positioners, PET Tracers, Immobilization devices for Radiotherapy, and Complete Dosimeters for Linac and Brachytherapy for healthcare facilities in Pakistan.",
  experienceStory: "Danish International has been in the Healthcare & Nuclear Medicine industry for more than 25 years and is a pioneer in this industry.",
  expertsStory: "Our company professionals are experts in their respective fields and have been in this industry for several decades.",
  partnersStory: "We work in partnership with all the major technology suppliers, developing first class solutions for our clients.",
};

/* ------------------------------------------------------------------ */
/* Homepage content (sourced from danish-international.com)            */
/* ------------------------------------------------------------------ */

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop`;

export interface ProductLine {
  id: string;
  category: string;
  brands: string[];
  summary: string;
  items: string[];
  image: string;
  imageAlt: string;
}

// Product categories and brands as listed in the original product catalog.
export const PRODUCT_LINES: ProductLine[] = [
  {
    id: "radiotherapy",
    category: "Radiotherapy",
    brands: ["Orfit", "Bionix"],
    summary: "Immobilization devices and patient positioners for radiotherapy, with Bionix brachytherapy, head & neck and lung accessories.",
    items: ["Immobilization devices", "Brachytherapy equipment", "Head & neck accessories", "Lung accessories"],
    image: unsplash("photo-1576671414121-aa0c81c869e1"),
    imageAlt: "Thermoplastic radiotherapy mask on a patient, aligned with red positioning lasers",
  },
  {
    id: "nuclear-medicine",
    category: "Nuclear Medicine",
    brands: ["Capintec"],
    summary: "Nuclear medicine and radiotherapy items from Capintec, for which we are a reseller.",
    items: ["Nuclear medicine items", "Radiotherapy items"],
    image: unsplash("photo-1666214282459-c7dff167ecc0"),
    imageAlt: "Nuclear imaging gantry in a bright clinical room",
  },
  {
    id: "pet-tracers",
    category: "PET Tracers",
    brands: ["Huayi Isotopes", "Taiyo Nippon Sanso", "ABX"],
    summary: "Oxygen-18 water, reagent kits, PET tracers and kits for tracer production.",
    items: ["Water-18O (10% & 98% atom)", "Oxygen-18 water", "Reagent kits", "Kits for tracer production"],
    image: unsplash("photo-1578496479531-32e296d5c6e1"),
    imageAlt: "Automated needles dispensing liquid into small vials in a laboratory",
  },
  {
    id: "health-physics",
    category: "Health Physics",
    brands: ["GRAETZ", "Rad Pro International"],
    summary: "Dosemeters, dose rate meters, alarm units, area monitors and contamination measuring instruments.",
    items: ["Dosemeters", "Dose rate meters", "Dose rate alarm units", "Area & contamination monitors"],
    image: unsplash("photo-1567664883526-8f401f277a27"),
    imageAlt: "Analog measurement gauges and dials on an instrument panel",
  },
  {
    id: "radiology-qa",
    category: "Radiology QA",
    brands: ["Sun Nuclear", "IBA Dosimetry", "Pro-Project"],
    summary: "Quality control, diagnostic imaging QA and dosimetry solutions.",
    items: ["Diagnostic imaging QA", "Dosimetry solutions", "Quality control tools"],
    image: unsplash("photo-1579684288402-e3e337bcc7af"),
    imageAlt: "Linear accelerator and treatment couch in a radiotherapy bunker",
  },
  {
    id: "radioactive-sources",
    category: "Radioactive Sources",
    brands: ["Eckert & Ziegler", "Sanders Medical"],
    summary: "Radioactive sources for medical and industrial use.",
    items: ["Medical sources", "Industrial sources"],
    image: unsplash("photo-1558724109-b3007f0fbf7f"),
    imageAlt: "Radiation warning trefoil sign mounted on a building",
  },
  {
    id: "deep-brain-stimulation",
    category: "Deep Brain Stimulation",
    brands: ["PINS Medical"],
    summary: "Deep brain stimulation equipment, distributed in Pakistan by Danish International.",
    items: ["Deep brain stimulation equipment"],
    image: unsplash("photo-1711409645921-ef3db0501f96"),
    imageAlt: "Detailed render of a human brain on a dark background",
  },
];

export interface ServiceLine {
  id: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
}

// Service descriptions based on danish-international.com/our-services.
export const SERVICE_LINES: ServiceLine[] = [
  {
    id: "consultancy",
    title: "Professional Consultancy",
    summary: "Advanced advisory assistance that helps organizations reach their targets. A complete, concrete support system rather than just an equipment vendor.",
    image: unsplash("photo-1758691463569-66de91d76452"),
    imageAlt: "Two clinicians reviewing a medical scan on a tablet",
  },
  {
    id: "planning",
    title: "Project Planning",
    summary: "Management and project scheduling, backed by managerial expertise that turns timely project completion into a reality.",
    image: unsplash("photo-1603901622056-0a5bee231395"),
    imageAlt: "Architectural blueprints with drafting pencils and a metal ruler",
  },
  {
    id: "installation",
    title: "Installation",
    summary: "Trained technicians and engineers oversee products from manufacturing through setup, to ensure machinery is fully functional.",
    image: unsplash("photo-1693264882139-6a308957c9ae"),
    imageAlt: "Imaging system installed in a clinical room under surgical lights",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    summary: "Scheduled inspections and routine upkeep for medical hardware, building fail-proof operating standards and longer product life.",
    image: unsplash("photo-1535612731405-1348d22b842f"),
    imageAlt: "Electronic test and measurement instruments on a bench",
  },
  {
    id: "repair",
    title: "Repair",
    summary: "Dependable, prompt repairs and replacement parts for all products, keeping operations running without interruption.",
    image: unsplash("photo-1581092918056-0c4c3acd3789"),
    imageAlt: "Engineer handling a circuit board during a repair",
  },
  {
    id: "solution-design",
    title: "Solution Design",
    summary: "Tailored end-to-end strategies covering product deployment, ongoing maintenance and auxiliary support, built around each client's needs.",
    image: unsplash("photo-1666214275099-0ca566aefe26"),
    imageAlt: "Clinical team at a workstation beside a treatment room",
  },
];

// Consulting traits listed on the original About page.
export const CONSULTING_TRAITS = ["Professional Consulting", "Valuable Ideas", "Excellent Timing", "Budget Friendly"];

export interface MapPoint {
  id: string;
  label: string;
  lon: number;
  lat: number;
  partners: string[];
}

// The only office listed on danish-international.com.
export const HEADQUARTERS: MapPoint = {
  id: "lahore",
  label: "Lahore, Pakistan",
  lon: 74.35,
  lat: 31.52,
  partners: [],
};

// Home countries of the principals represented by Danish International.
// Markers sit at country level; they are partner origins, not company offices.
export const PARTNER_ORIGINS: MapPoint[] = [
  { id: "usa", label: "United States", lon: -84, lat: 39, partners: ["Capintec", "Bionix", "Sun Nuclear"] },
  { id: "belgium", label: "Belgium", lon: 4.4, lat: 50.8, partners: ["Orfit"] },
  { id: "germany", label: "Germany", lon: 10.4, lat: 51.2, partners: ["IBA Dosimetry", "GRAETZ", "Eckert & Ziegler", "ABX", "Rad Pro International"] },
  { id: "poland", label: "Poland", lon: 19.4, lat: 52.1, partners: ["Pro-Project"] },
  { id: "china", label: "China", lon: 116.4, lat: 39.9, partners: ["Huayi Isotopes", "PINS Medical"] },
  { id: "japan", label: "Japan", lon: 139.7, lat: 35.7, partners: ["Taiyo Nippon Sanso"] },
];

export const STATS: StatItem[] = [
  {
    value: 25,
    suffix: "+",
    label: "Years of Excellence",
    description: "Continuous dedication to advancing nuclear medicine and healthcare physics in Pakistan since 1999."
  },
  {
    value: 14,
    suffix: "+",
    label: "Global Technology Partners",
    description: "Direct distribution alliances with premier manufacturers across Europe, USA, and Japan."
  },
  {
    value: 120,
    suffix: "+",
    label: "Medical Centers Equipped",
    description: "Public oncology institutes, private hospitals, and university diagnostic centers supported nationwide."
  },
  {
    value: 10,
    suffix: "+",
    label: "Specialized Domains",
    description: "Comprehensive solutions from PET tracers and dosimetry to Linac QA and DBS instrumentation."
  }
];

export const PARTNERS: Partner[] = [
  {
    name: "Capintec",
    category: "Nuclear Medicine",
    description: "Global standard in dose calibrators, hot lab management systems, and thyroid uptake instrumentation.",
    tag: "USA",
    logoText: "CAPINTEC"
  },
  {
    name: "Orfit",
    category: "Radiotherapy",
    description: "Precision thermoplastic immobilization systems and patient positioning solutions for radiation oncology.",
    tag: "Belgium",
    logoText: "ORFIT"
  },
  {
    name: "Bionix",
    category: "Radiotherapy",
    description: "Innovative radiation therapy devices, brachytherapy accessories, head & neck positioning aids.",
    tag: "USA",
    logoText: "BIONIX"
  },
  {
    name: "Sun Nuclear",
    category: "Radiology QA",
    description: "Independent quality management solutions for radiation therapy and diagnostic imaging facilities.",
    tag: "USA",
    logoText: "SUN NUCLEAR"
  },
  {
    name: "IBA Dosimetry",
    category: "Radiology QA",
    description: "Advanced dosimetry, quality assurance equipment, and measurement solutions for Linac beams.",
    tag: "Germany",
    logoText: "IBA DOSIMETRY"
  },
  {
    name: "GRAETZ",
    category: "Health Physics",
    description: "High-precision radiation dosemeters, dose rate alarm units, area monitors, and contamination meters.",
    tag: "Germany",
    logoText: "GRAETZ"
  },
  {
    name: "Eckert & Ziegler",
    category: "Radioactive Sources",
    description: "Certified isotopic calibration standards and reference sources for nuclear medicine and industry.",
    tag: "Germany",
    logoText: "ECKERT & ZIEGLER"
  },
  {
    name: "PINS Medical",
    category: "Neuromodulation",
    description: "State-of-the-art Deep Brain Stimulation (DBS) implants and neuro-rehabilitation technologies.",
    tag: "International",
    logoText: "PINS MEDICAL"
  },
  {
    name: "Huayi Isotopes",
    category: "PET Tracers",
    description: "High-purity Oxygen-18 enriched water, precursor reagent kits, and PET synthesis consumables.",
    tag: "China/USA",
    logoText: "HUAYI"
  },
  {
    name: "Taiyo Nippon Sanso",
    category: "PET Tracers",
    description: "Ultra-pure Water-18O (10% and 98% atom) for cyclotron FDG isotope production facilities.",
    tag: "Japan",
    logoText: "TAIYO NIPPON"
  },
  {
    name: "ABX",
    category: "PET Tracers",
    description: "Pharmaceutical-grade reagents, kits, and cassettes for automated radiopharmaceutical synthesis.",
    tag: "Germany",
    logoText: "ABX CHEMICALS"
  },
  {
    name: "Pro-Project",
    category: "Radiology QA",
    description: "Diagnostic imaging phantoms and dedicated QA tools for X-Ray, CT, MRI, and Mammography.",
    tag: "Poland",
    logoText: "PRO-PROJECT"
  },
  {
    name: "Rad-Pro International",
    category: "Health Physics",
    description: "Specialized radiation protection equipment, lead shielding systems, and survey instrumentation.",
    tag: "Germany",
    logoText: "RAD-PRO"
  },
  {
    name: "Sanders Medical",
    category: "Radioactive Sources",
    description: "Custom medical reference sources, flood phantoms, and spot markers for camera calibration.",
    tag: "USA",
    logoText: "SANDERS MEDICAL"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-capintec-hotlab",
    name: "Capintec CRC-55tR Dose Calibrator",
    brand: "Capintec",
    category: "Nuclear Medicine",
    description: "Industry-benchmark chamber dose calibrator with touchscreen interface for isotope activity measurement and hot lab compliance.",
    specifications: [
      "Activity Range: Up to 250 GBq (6 Ci) of Tc-99m",
      "Nuclide Selection: Over 80 built-in radionuclides with customizable keys",
      "Chamber: Well-type pressurized ionization chamber",
      "Display: 8.4-inch color touchscreen display"
    ],
    features: [
      "Automated geometry and linearity correction",
      "Multi-language reporting and Ethernet connectivity",
      "Real-time decay calculation and QA diagnostics",
      "Seamless integration with pharmacy management software"
    ],
    applications: ["Nuclear Pharmacy", "Hospital Hot Labs", "PET/CT Centers", "Research Laboratories"],
    badge: "Industry Benchmark"
  },
  {
    id: "prod-orfit-immobilization",
    name: "Orfit AIO Solution Immobilization",
    brand: "Orfit",
    category: "Radiotherapy",
    description: "All-in-one patient positioning and immobilization system designed for high-precision stereotactic and IGRT radiation treatments.",
    specifications: [
      "Material: High-rigidity carbon fiber with low attenuation",
      "Compatibility: Compatible with all major Linac couches and CT scanners",
      "Sub-systems: Head & Neck, Thorax, Abdomen, Pelvic immobilization",
      "Indexing: 2-pin and 3-pin standard couch indexing"
    ],
    features: [
      "Micro-perforated non-stick thermoplastic masks",
      "Anatomically molded head rests and arm supports",
      "Sub-millimeter repositioning accuracy",
      "Lightweight modular components for quick clinician setup"
    ],
    applications: ["Stereotactic Radiosurgery", "IMRT / VMAT Delivery", "Proton Therapy", "CT Simulation"],
    badge: "Sub-mm Precision"
  },
  {
    id: "prod-graetz-areamonitor",
    name: "GRAETZ Gamma-Twin & Area Monitors",
    brand: "GRAETZ",
    category: "Health Physics",
    description: "Robust dosimeters, calibrated area radiation monitors, and contamination detectors engineered in Germany for rigorous nuclear safety.",
    specifications: [
      "Dose Rate Range: 0.5 µSv/h up to 10 Sv/h",
      "Energy Range: 45 keV to 1.3 MeV (gamma and X-rays)",
      "Alarm Thresholds: 4 preset acoustic and optical alarm levels",
      "Ingress Protection: IP67 waterproof and dustproof housing"
    ],
    features: [
      "Energy-compensated GM tube detector",
      "Continuous background monitoring with visual strobe",
      "Integrated data logger with USB data export",
      "Battery backup system with 72-hour autonomous operation"
    ],
    applications: ["Linac Bunkers", "Hot Cell Surroundings", "Cyclotron Facilities", "Industrial Radiography"],
    badge: "German Standard"
  },
  {
    id: "prod-sunnuclear-qa",
    name: "Sun Nuclear ArcCHECK & Daily QA 3",
    brand: "Sun Nuclear",
    category: "Radiology QA",
    description: "4D cylindrical diode array and daily machine QA systems delivering verified beam measurement and independent patient plan validation.",
    specifications: [
      "Detector Count: 1,386 SunPoint diode detectors",
      "Array Geometry: Cylindrical geometry optimized for helical and rotational delivery",
      "Sampling Rate: 50 ms real-time dose collection",
      "Resolution: 10 mm detector spacing across full 360 degrees"
    ],
    features: [
      "True composite beam measurement without planar interpolation",
      "Simultaneous beam profile, energy, and symmetry verification",
      "Automated pass/fail gamma analysis against DICOM RT plan",
      "Plug-and-play setup requiring under 5 minutes"
    ],
    applications: ["VMAT / RapidArc Patient QA", "CyberKnife Verification", "Daily Linac Morning QA", "IMRT Commissioning"],
    badge: "FDA Cleared"
  },
  {
    id: "prod-pins-dbs",
    name: "PINS Deep Brain Stimulation System",
    brand: "PINS Medical",
    category: "Neuromodulation",
    description: "Next-generation implantable neurostimulation platform offering rechargeable telemetry and precise current steering for movement disorders.",
    specifications: [
      "Battery Life: 15+ years rechargeable neurostimulator",
      "Channels: Independent 16-channel current steering",
      "MRI Safety: 1.5T and 3.0T full-body MRI conditional",
      "Wireless: Encrypted Bluetooth telemetry programmer"
    ],
    features: [
      "Directional lead technology for precise stimulation focusing",
      "Remote physician programming and tele-care capability",
      "Ultra-compact titanium hermetic enclosure",
      "Patient-friendly wireless recharger with voice guidance"
    ],
    applications: ["Parkinson's Disease", "Essential Tremor", "Primary Dystonia", "Intractable Epilepsy"],
    badge: "Neurotech Leader"
  },
  {
    id: "prod-taiyo-o18",
    name: "Water-18O Ultra-Enriched Precursor",
    brand: "Taiyo Nippon Sanso",
    category: "PET Tracers",
    description: "Certified 98% and 10% atom enriched Oxygen-18 water providing maximum yield for cyclotron-produced Fluorine-18 radiopharmaceuticals.",
    specifications: [
      "Isotopic Enrichment: >= 98.0 atom % 18-O",
      "Chemical Purity: Low conductivity ultra-pure HPLC grade",
      "Packaging: Sterilized amber glass vials (10g, 50g, 100g)",
      "Quality Standard: Compliant with European and US Pharmacopoeia"
    ],
    features: [
      "Minimal target corrosion chemistry",
      "High bombardment yield for F-18 synthesis",
      "Comprehensive lot Certificate of Analysis with every shipment",
      "Direct temperature-controlled cold chain delivery in Pakistan"
    ],
    applications: ["18F-FDG Production", "18F-DOPA Synthesis", "Oncology PET Imaging", "Neuro-PET Diagnostics"],
    badge: "98% Enriched"
  },
  {
    id: "prod-iba-dosimetry",
    name: "IBA Blue Phantom² 3D Water Phantom",
    brand: "IBA Dosimetry",
    category: "Radiology QA",
    description: "Top-tier 3D water phantom system for precise Linac commissioning, beam data acquisition, and annual radiation physics calibrations.",
    specifications: [
      "Scanning Dimensions: 480 x 480 x 410 mm",
      "Positioning Accuracy: 0.1 mm mechanical reproducibility",
      "Sensor Types: Semiflex ionization chambers and stereotactic diodes",
      "Interface: myQA global quality assurance platform"
    ],
    features: [
      "Integrated fast water reservoir with auto-leveling",
      "Continuous sensor scanning mode without motor vibration",
      "Automated conversion into treatment planning system (TPS) beam models",
      "Full compliance with TG-51 and TRS-398 protocols"
    ],
    applications: ["Linac Annual Calibration", "New Beam Commissioning", "TPS Beam Modeling", "Research Physics"],
    badge: "Gold Standard"
  },
  {
    id: "prod-eckert-sources",
    name: "Eckert & Ziegler Certified Radiation Sources",
    brand: "Eckert & Ziegler",
    category: "Radioactive Sources",
    description: "NIST-traceable calibration sources, flood phantoms (Co-57), and spot markers designed for gamma camera and SPECT detector validation.",
    specifications: [
      "Radionuclides: Co-57, Cs-137, Ba-133, Ge-68/Ga-68",
      "Traceability: NIST and DAkkS accredited calibration certificates",
      "Uniformity: < 1.0% coefficient of variation for rectangular flood phantoms",
      "Lead Storage: Heavy-duty tungsten/lead container shielding included"
    ],
    features: [
      "Direct radioactive material import authorization in Pakistan",
      "Hermetically sealed leak-tested capsule construction",
      "Custom active geometries matching modern detector heads",
      "Responsible radioactive waste return advisory"
    ],
    applications: ["Gamma Camera Uniformity", "PET/CT System Normalization", "Dose Calibrator QA", "Radiation Safety Training"],
    badge: "NIST Traceable"
  }
];

export const SERVICES: Service[] = [
  {
    id: "service-consultancy",
    title: "Professional Consultancy",
    shortDesc: "Strategic clinical advisory and healthcare facility planning from radiation physics specialists.",
    fullDesc: "We provide end-to-end guidance for hospitals and diagnostic facilities setting up new nuclear medicine, radiotherapy, or PET/CT centers. From regulatory compliance with the Pakistan Nuclear Regulatory Authority (PNRA) to facility shielding calculations and equipment selection, our senior consultants ensure seamless clinical execution.",
    iconName: "Stethoscope",
    features: [
      "Nuclear bunker and hot lab architectural shielding design",
      "PNRA license application and radiation safety audit preparation",
      "Techno-commercial feasibility and equipment matching",
      "Clinical workflow optimization and radiopharmacy design"
    ],
    deliverables: [
      "Detailed Shielding Calculation Reports",
      "Facility Layout & Flow Blueprints",
      "Regulatory Compliance Roadmap",
      "Equipment Specification Dossiers"
    ]
  },
  {
    id: "service-planning",
    title: "Project Planning & Turnkey Execution",
    shortDesc: "Comprehensive lifecycle management ensuring timely deployment of sophisticated medical systems.",
    fullDesc: "Leveraging over two decades of managerial and engineering experience, we orchestrate complex healthcare technology projects from initial blueprint to first patient scan. We eliminate deployment friction, coordinate cold-chain logistics for radioisotopes, and synchronize structural prerequisites.",
    iconName: "CalendarClock",
    features: [
      "Critical-path scheduling and contractor coordination",
      "Specialized import logistics and customs clearance for isotope hardware",
      "Site readiness verification (HVAC, clean power, radiation interlocks)",
      "Phased milestone tracking with transparent client reporting"
    ],
    deliverables: [
      "Integrated Project Gantt Chart",
      "Site Acceptance Checklist",
      "Logistics Tracking Manifest",
      "Milestone Verification Reports"
    ]
  },
  {
    id: "service-installation",
    title: "Installation & Commissioning",
    shortDesc: "Precision setup and beam calibration by certified biomedical engineers and medical physicists.",
    fullDesc: "Our factory-trained engineers oversee uncrating, mechanical mounting, electrical interconnection, software calibration, and initial dosimetry runs. We test all hardware under stringent factory acceptance protocols to ensure zero downtime from day one.",
    iconName: "Wrench",
    features: [
      "Rigid mechanical anchoring and laser leveling",
      "Calibration against primary isotopic standards",
      "Software integration with hospital PACS / RIS / TPS networks",
      "Comprehensive site acceptance testing (SAT) sign-off"
    ],
    deliverables: [
      "Commissioning Certificate",
      "Baseline Calibration Logbooks",
      "Network Integration Protocol",
      "Operator Handover Documentation"
    ]
  },
  {
    id: "service-maintenance",
    title: "Preventive Maintenance (PPM)",
    shortDesc: "Scheduled inspections and preventive maintenance ensuring fail-proof operational uptime.",
    fullDesc: "Radiation equipment and hot lab analyzers demand uncompromising reliability. Our preventive maintenance programs include periodic detector sensitivity verification, mechanical lubrication, leak tests, and safety interlock validation to maximize equipment longevity and ensure patient safety.",
    iconName: "ShieldCheck",
    features: [
      "Quarterly and semi-annual scheduled maintenance visits",
      "Isotope chamber linearity and accuracy checks",
      "Thermoplastic and positioning mechanical audits",
      "Emergency response SLA with prioritized engineer dispatch"
    ],
    deliverables: [
      "PPM Inspection Checklists",
      "Detector Performance Trend Graphs",
      "Preventive Parts Replacement Log",
      "Annual Safety Compliance Audit"
    ]
  },
  {
    id: "service-repair",
    title: "Repair & Genuine Spare Parts",
    shortDesc: "Rapid diagnostics and authentic OEM component replacements to eliminate operational downtime.",
    fullDesc: "When equipment halts, clinical schedules suffer. Danish International maintains a local bonded inventory of critical spare parts, ionizing chambers, sensor boards, and connectors. Our diagnostic technicians rapidly identify faults and perform certified component-level repairs.",
    iconName: "Cpu",
    features: [
      "Dedicated diagnostic equipment for field sensor troubleshooting",
      "Direct access to European, US, and Japanese OEM supply chains",
      "Component-level circuit and electromechanical remediation",
      "Post-repair calibration verification before clinical release"
    ],
    deliverables: [
      "Root Cause Failure Analysis",
      "OEM Parts Authenticity Certificate",
      "Post-Repair Dosimetry Validation",
      "Updated Service History Log"
    ]
  },
  {
    id: "service-solution-design",
    title: "Custom Solution Design",
    shortDesc: "Tailored integrated systems combining hardware, shielding, software, and training.",
    fullDesc: "Every medical center possesses unique spatial, clinical, and budgetary constraints. We develop bespoke configurations—pairing dosimeters, patient immobilization arrays, gas safety monitors, and QA phantoms into a unified operational ecosystem designed around your clinical caseload.",
    iconName: "Layers",
    features: [
      "Bespoke radiation immobilization kits tailored to clinical specialty",
      "Multi-point gas monitoring and emergency alarm networks",
      "Integrated QA software suites for streamlined physics reporting",
      "Custom hands-on clinical staff training curricula"
    ],
    deliverables: [
      "Custom Solution Architecture Document",
      "Multi-Vendor Integration Matrix",
      "Clinical Staff Training Manual",
      "Operational SOP Protocols"
    ]
  }
];

export const TEAM: TeamMember[] = [
  {
    name: "Sohail Bhatti",
    role: "Chief Executive Officer & Founder",
    email: "sales@danish-international.com",
    bio: "With over 25 years of pioneering leadership in Pakistan's healthcare industry, Sohail has spearheaded the deployment of advanced nuclear medicine and radiation oncology infrastructure across the country.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    credentials: "25+ Years Healthcare Executive"
  },
  {
    name: "Danish Aslam",
    role: "Manager Sales & Marketing",
    email: "danishaslam.international@gmail.com",
    bio: "Leading international brand partnerships and institutional client relations, Danish orchestrates nationwide equipment distribution, hospital tenders, and strategic supplier alignments.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    credentials: "Strategic Healthcare Marketing"
  },
  {
    name: "Engr. Zulfiqar",
    role: "Lead Technical Consultant",
    email: "zulfiqarsk@gmail.com",
    bio: "A seasoned radiation physics and biomedical technology specialist, Zulfiqar oversees complex Linac dosimetry setups, PET/CT hot lab validations, and clinical technical support.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    credentials: "Lead Clinical Technology Specialist"
  }
];

export const WHY_CHOOSE_US = [
  {
    id: "why-experience",
    title: "25+ Years Clinical Track Record",
    description: "A quarter century of continuous operational experience navigating Pakistan's healthcare, nuclear medicine, and hospital procurement ecosystem.",
    stat: "25+",
    statLabel: "Years Experience",
    iconName: "Award"
  },
  {
    id: "why-partnerships",
    title: "Direct Global OEM Authorized Partnerships",
    description: "Official distributor agreements with top-tier American, German, Belgian, and Japanese manufacturers ensuring 100% genuine hardware and factory warranties.",
    stat: "14+",
    statLabel: "Global Brands",
    iconName: "Globe"
  },
  {
    id: "why-endtoend",
    title: "Full Lifecycle Turnkey Execution",
    description: "Not merely a broker; we provide site planning, architectural radiation shielding, customs logistics, commissioning, and continuous preventive upkeep.",
    stat: "360°",
    statLabel: "Support Model",
    iconName: "Workflow"
  },
  {
    id: "why-nationwide",
    title: "Nationwide On-Ground Coverage",
    description: "Active support for diagnostic centers and oncology institutes across Lahore, Karachi, Islamabad, Peshawar, Quetta, Multan, and remote regional facilities.",
    stat: "100%",
    statLabel: "Nationwide Reach",
    iconName: "MapPin"
  },
  {
    id: "why-engineers",
    title: "Factory-Trained Biomedical Team",
    description: "Certified biomedical engineers and clinical technical consultants equipped to service complex ionizing radiation and hot lab systems.",
    stat: "24/7",
    statLabel: "Technical Priority",
    iconName: "UserCheck"
  },
  {
    id: "why-compliance",
    title: "Regulatory & PNRA Compliance Assurance",
    description: "In-depth understanding of Pakistan Nuclear Regulatory Authority (PNRA) standards, radiation safety protocols, and certified isotope handling procedures.",
    stat: "PNRA",
    statLabel: "Standard Compliant",
    iconName: "CheckCircle2"
  }
];

export const CERTIFICATIONS = [
  {
    title: "PNRA Radiation Safety Standards",
    issuer: "Pakistan Nuclear Regulatory Authority",
    description: "Full procedural adherence to national radiation protection, ionizing source transport, and radioactive material storage protocols.",
    category: "Regulatory"
  },
  {
    title: "ISO 13485 Medical Device Standards",
    issuer: "Partner OEM Harmonization",
    description: "Distribution and service workflows harmonized with international quality management systems for medical device supply chains.",
    category: "Quality Management"
  },
  {
    title: "CE & FDA Certified Products",
    issuer: "International Regulatory Bodies",
    description: "All represented instrumentation carries European Conformity (CE) and US FDA clearances for clinical human diagnostics and therapy.",
    category: "Product Compliance"
  },
  {
    title: "NIST & DAkkS Metrology Traceability",
    issuer: "National Standards Laboratories",
    description: "Calibration sources and dosimetry phantoms verified with unbroken chain of comparisons to primary international metrological standards.",
    category: "Metrology"
  }
];

export const COVERAGE_REGIONS = [
  {
    region: "Punjab (Central)",
    cities: "Lahore, Faisalabad, Rawalpindi, Multan, Gujranwala, Sialkot",
    description: "Headquarters hub servicing major tertiary cancer institutes, university medical centers, and private diagnostic hot labs.",
    centers: "50+ Facilities"
  },
  {
    region: "Sindh (South)",
    cities: "Karachi, Hyderabad, Sukkur, Larkana",
    description: "Extensive support for mega-city oncology institutions, private diagnostic networks, and industrial gamma radiography units.",
    centers: "35+ Facilities"
  },
  {
    region: "Federal Capital & KPK",
    cities: "Islamabad, Peshawar, Abbottabad, Mardan, Swat",
    description: "Strategic partnerships with national healthcare institutions, armed forces medical centers, and provincial radiation oncology units.",
    centers: "25+ Facilities"
  },
  {
    region: "Balochistan & Remote Regions",
    cities: "Quetta, Turbat, Gilgit, Mirpur (AJK)",
    description: "Fulfilling our founding vision to bring modern radiation diagnostic and safety accessories to underserved and emerging medical centers.",
    centers: "15+ Facilities"
  }
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
];

/** Category photography shared by the homepage rail and the catalog cards. */
export function lineForCategory(category: string): ProductLine | undefined {
  const key = category.toLowerCase() === "neuromodulation" ? "deep brain stimulation" : category.toLowerCase();
  return PRODUCT_LINES.find((l) => l.category.toLowerCase() === key);
}

export interface PartnerLogo {
  name: string;
  /** Path under /public, or null when the original site shows no logo. */
  src: string | null;
  width: number;
  height: number;
}

// Logos as published on danish-international.com/products (trimmed and resized, colours kept).
// The original site shows no logo for Sanders Medical, so it is set as a wordmark.
export const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Capintec", src: "/logos/capintec.png", width: 420, height: 90 },
  { name: "Orfit", src: "/logos/orfit.png", width: 211, height: 96 },
  { name: "Sun Nuclear", src: "/logos/sun-nuclear.png", width: 420, height: 90 },
  { name: "Bionix", src: "/logos/bionix.png", width: 288, height: 96 },
  { name: "IBA Dosimetry", src: "/logos/iba-dosimetry.png", width: 96, height: 96 },
  { name: "Eckert & Ziegler", src: "/logos/eckert-ziegler.png", width: 410, height: 96 },
  { name: "Huayi Isotopes", src: "/logos/huayi.png", width: 355, height: 96 },
  { name: "GRAETZ", src: "/logos/graetz.png", width: 108, height: 96 },
  { name: "Taiyo Nippon Sanso", src: "/logos/taiyo-nippon-sanso.png", width: 420, height: 81 },
  { name: "PINS Medical", src: "/logos/pins-medical.png", width: 420, height: 52 },
  { name: "ABX", src: "/logos/abx.png", width: 420, height: 75 },
  { name: "Rad Pro International", src: "/logos/radpro.png", width: 420, height: 61 },
  { name: "Pro-Project", src: "/logos/pro-project.png", width: 178, height: 96 },
  { name: "Sanders Medical", src: null, width: 0, height: 0 },
];

export interface Brand {
  name: string;
  category: string;
  /** Wording from danish-international.com/products, spelling corrected only. */
  description: string;
  products: string[];
  logo: string | null;
  /** Manufacturer page the original catalog links to. */
  url: string;
}

export const BRANDS: Brand[] = [
  {
    name: "Capintec",
    category: "Nuclear Medicine",
    description: "We are resellers of Capintec nuclear medicine and radiotherapy products.",
    products: ["Nuclear medicine items", "Radiotherapy items"],
    logo: "/logos/capintec.png",
    url: "https://capintec.com/product-category/nuclear-medicine/",
  },
  {
    name: "Orfit",
    category: "Radiotherapy",
    description: "We are resellers of a variety of Orfit radiotherapy products.",
    products: ["Radiotherapy items"],
    logo: "/logos/orfit.png",
    url: "https://www.orfit.com/radiation-oncology/#products",
  },
  {
    name: "Bionix",
    category: "Radiotherapy",
    description:
      "We are resellers of a large variety of Bionix radiotherapy products, including equipment for brachytherapy, head & neck, lung and other accessories.",
    products: ["Brachytherapy equipment", "Head & neck accessories", "Lung accessories", "Other radiotherapy accessories"],
    logo: "/logos/bionix.png",
    url: "https://www.bionixrt.com/about-bionix/",
  },
  {
    name: "Huayi Isotopes",
    category: "PET Tracers",
    description: "We are resellers of Huayi for Oxygen-18 water, reagent kits and many other accessories.",
    products: ["Oxygen-18 water", "Reagent kits", "Accessories"],
    logo: "/logos/huayi.png",
    url: "https://danish-international.com/huayi-isotopes/",
  },
  {
    name: "Taiyo Nippon Sanso",
    category: "PET Tracers",
    description: "We are resellers of Water-18O (10% and 98% atom) for Taiyo Nippon Sanso in Pakistan.",
    products: ["Water-18O (10% atom)", "Water-18O (98% atom)"],
    logo: "/logos/taiyo-nippon-sanso.png",
    url: "https://danish-international.com/tayio-nippon/",
  },
  {
    name: "ABX",
    category: "PET Tracers",
    description: "PET tracers and kits for tracer production.",
    products: ["PET tracers", "Kits for tracer production"],
    logo: "/logos/abx.png",
    url: "http://www.abx.de/Information/Index/?viewId=FDG",
  },
  {
    name: "Rad Pro International",
    category: "Health Physics",
    description: "We are resellers of Rad Pro company equipment in Pakistan.",
    products: ["Rad Pro equipment"],
    logo: "/logos/radpro.png",
    url: "https://danish-international.com/radpro-international/",
  },
  {
    name: "GRAETZ",
    category: "Health Physics",
    description:
      "We are resellers of GRAETZ for dosemeters, dose rate meters, dose rate alarm units, area monitors, contamination measuring instruments and more.",
    products: ["Dosemeters", "Dose rate meters", "Dose rate alarm units", "Area monitors", "Contamination measuring instruments"],
    logo: "/logos/graetz.png",
    url: "https://danish-international.com/graetz/",
  },
  {
    name: "Eckert & Ziegler",
    category: "Radioactive Sources",
    description: "We supply radioactive sources for medical and industrial use from Eckert & Ziegler.",
    products: ["Medical sources", "Industrial sources"],
    logo: "/logos/eckert-ziegler.png",
    url: "https://www.ezag.com/home/products/isotope_products/",
  },
  {
    name: "Sanders Medical",
    category: "Radioactive Sources",
    description: "We are suppliers of radioactive sources for Sanders Medical.",
    products: ["Radioactive sources"],
    logo: null,
    url: "https://www.sandersmedical.com/",
  },
  {
    name: "PINS Medical",
    category: "Deep Brain Stimulation",
    description: "We supply deep brain stimulation equipment of PINS Medical in Pakistan.",
    products: ["Deep brain stimulation equipment"],
    logo: "/logos/pins-medical.png",
    url: "https://danish-international.com/deep-brain-simulation/",
  },
  {
    name: "Pro-Project",
    category: "Radiology QA",
    description: "Pro-Project provides solutions for quality control.",
    products: ["Quality control solutions"],
    logo: "/logos/pro-project.png",
    url: "https://danish-international.com/proproject/",
  },
  {
    name: "Sun Nuclear Corporation",
    category: "Radiology QA",
    description: "Industry-leading solutions for diagnostic imaging QA.",
    products: ["Diagnostic imaging QA"],
    logo: "/logos/sun-nuclear.png",
    url: "https://www.sunnuclear.com/solutions/diagnostic/",
  },
  {
    name: "IBA Dosimetry",
    category: "Radiology QA",
    description: "IBA Dosimetry solutions.",
    products: ["Dosimetry solutions"],
    logo: "/logos/iba-dosimetry.png",
    url: "https://www.iba-dosimetry.com/",
  },
];

/** People listed on danish-international.com/about-us. The original shows no photos. */
export const LEADERSHIP = [
  { name: "Sohail Bhatti", role: "CEO", email: "sales@danish-international.com", linkedin: "https://www.linkedin.com/in/sohail-bhatti-185a2347/" },
  { name: "Danish Aslam", role: "Manager Sales & Marketing", email: "danishaslam.international@gmail.com", linkedin: null },
  { name: "Zulfiqar", role: "Technical Consultant", email: "zulfiqarsk@gmail.com", linkedin: null },
];
