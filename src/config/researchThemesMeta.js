import {
  IconHeart, IconFork, IconGradCap, IconUsers, IconDroplet, IconLeaf,
  IconTree, IconSprout, IconMountain, IconInstitution, IconDoc, IconCheck,
  IconScale, IconHouse, IconShuffle, IconBird, IconBriefcase, IconGear,
  IconChart, IconCoins,
} from "../components/Icons";

// Visual identity for the "Research Areas" theme listing: a colour + icon
// for each subcap group, and an icon for every individual chip inside it.
export const RESEARCH_GROUP_META = {
  "Human Development": {
    color: "#2f6fed", icon: IconHeart,
    subtitle: "Empowering people for healthier, more prosperous lives",
  },
  "Environment & Natural Resources": {
    color: "#1fa35c", icon: IconLeaf,
    subtitle: "Protecting our planet for future generations",
  },
  "Governance & Public Policy": {
    color: "#c98a1f", icon: IconInstitution,
    subtitle: "Stronger institutions for inclusive and accountable societies",
  },
  "Social Protection & Community Resilience": {
    color: "#e0507a", icon: IconUsers,
    subtitle: "Leaving no one behind",
  },
  "Economic Development": {
    color: "#8b5cf6", icon: IconChart,
    subtitle: "Creating opportunities for inclusive and sustainable growth",
  },
};

export const RESEARCH_CHIP_ICONS = {
  "Health & Health Systems": IconHeart,
  "Nutrition & Food Security": IconFork,
  "Education & Skills Development": IconGradCap,
  "Education & Skills": IconGradCap,
  "Population & Demographic Change": IconUsers,
  "Gender, Youth & Social Inclusion": IconUsers,
  "Water, Sanitation & Hygiene (WASH)": IconDroplet,
  "WASH": IconDroplet,
  "Climate Change & Adaptation": IconLeaf,
  "Environmental Sustainability": IconTree,
  "Natural Resource Management": IconSprout,
  "Land, Agriculture & Rangelands": IconSprout,
  "Agriculture & Rangelands": IconSprout,
  "Disaster Risk & Environmental Resilience": IconMountain,
  "Disaster Risk & Resilience": IconMountain,
  "Governance & Institutions": IconInstitution,
  "Public Policy & Service Delivery": IconDoc,
  "Public Administration & Local Governance": IconUsers,
  "Accountability, Transparency & Citizen Engagement": IconCheck,
  "Accountability & Citizen Engagement": IconCheck,
  "Justice, Rule of Law & Social Institutions": IconScale,
  "Justice & Rule of Law": IconScale,
  "Decentralisation & State–Society Relations": IconInstitution,
  "Social Protection Systems": IconHeart,
  "Social Protection": IconHeart,
  "Livelihoods & Household Resilience": IconHouse,
  "Community Resilience": IconHouse,
  "Displacement, Protection & Durable Solutions": IconShuffle,
  "Displacement & Durable Solutions": IconShuffle,
  "Social Cohesion & Peacebuilding": IconBird,
  "Vulnerability & Inclusion": IconUsers,
  "Private Sector Development": IconBriefcase,
  "Private Sector & Enterprise Development": IconBriefcase,
  "Enterprise & Market Systems": IconGear,
  "Enterprise & Entrepreneurship": IconGear,
  "Markets & Value Chains": IconGear,
  "Employment, Skills & Labour Markets": IconChart,
  "Employment & Labour Markets": IconChart,
  "Economic Inclusion & Financial Access": IconCoins,
  "Financial & Economic Inclusion": IconCoins,
  "Local Economic Development": IconCoins,
};