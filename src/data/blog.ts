export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  img: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "gst-group-expands-to-dubai",
    title: "GST Group Expands to Dubai: A New Chapter in the UAE",
    excerpt:
      "Our new Dubai office brings metal works, glass façades and MEP delivery capability to the heart of the UAE construction market.",
    date: "12 July 2026",
    readTime: "4 min read",
    category: "Company News",
    author: "GST Group Newsroom",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80",
    body: [
      "Dubai has become the natural next step for GST Group. After twenty-five years of delivering structural, architectural and MEP packages across the Kingdom of Saudi Arabia, our teams are now operating from a dedicated office in the UAE — bringing the same engineering discipline to Business Bay, Downtown and the wider Emirates.",
      "The Dubai operation is fully integrated with our Riyadh fabrication capacity. That means clients get local project management and site supervision, backed by regional workshops for metal works, glass and aluminium systems, without paying for duplicated overheads.",
      "Our first UAE packages cover curtain wall installation, architectural metalwork and fit-out coordination for commercial towers. Each is delivered under the same ISO-aligned quality and HSE framework used on our Saudi mega-projects.",
      "If you are planning a project in the UAE, our Dubai desk is open for design consultation, budgetary estimates and value engineering reviews.",
    ],
  },
  {
    slug: "glass-facades-gulf-climate",
    title: "Designing Glass Façades That Survive the Gulf Climate",
    excerpt:
      "Thermal load, sand abrasion and humidity all attack a façade differently. Here is how we specify glazing that lasts decades.",
    date: "28 June 2026",
    readTime: "6 min read",
    category: "Engineering",
    author: "Engineering Desk",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
    body: [
      "A façade in the Gulf is not just an aesthetic decision — it is a thermal and structural one. Peak surface temperatures, high solar gain and airborne sand mean that the wrong specification shows up as failed seals and delaminated units within a few short years.",
      "We start with a performance brief: target U-value, solar heat gain coefficient, wind load and acoustic rating. Only then do we select glass build-ups — typically low-E coated, argon filled double glazing with structural silicone and thermally broken aluminium framing.",
      "Detailing matters more than the datasheet. Drainage paths, pressure equalisation and movement joints are where most façades actually fail. Our shop drawings model every transition before a single unit is fabricated.",
      "Finally, we mock up. A visual and performance mock-up on site removes ambiguity for the consultant and protects the programme from late-stage rework.",
    ],
  },
  {
    slug: "steel-fabrication-quality-control",
    title: "Inside Our Steel Fabrication Quality Control Process",
    excerpt:
      "From mill certificates to final coating inspection — a walkthrough of the checks behind every structure we deliver.",
    date: "9 June 2026",
    readTime: "5 min read",
    category: "Quality",
    author: "QA/QC Department",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80",
    body: [
      "Structural steel is unforgiving: a weld defect or a missed tolerance becomes an expensive site problem. Our workshop runs a documented inspection trail from raw material to installed member.",
      "Material control begins with mill test certificates traced to heat numbers. Nothing enters production without documented chemistry and mechanical properties.",
      "Welding is performed to qualified procedures by certified welders, with visual inspection on 100% of welds and non-destructive testing on critical connections. Dimensional checks follow the approved fabrication drawings, not assumptions.",
      "Surface preparation and coating are audited for blast profile, dry film thickness and adhesion. Each assembly is released with an inspection and test plan record the client can archive.",
    ],
  },
  {
    slug: "mep-firefighting-compliance-ksa",
    title: "MEP & Firefighting Compliance: What KSA Projects Require",
    excerpt:
      "Civil Defence approvals, sprinkler design and life-safety coordination explained for owners and developers.",
    date: "21 May 2026",
    readTime: "7 min read",
    category: "Compliance",
    author: "MEP Division",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=80",
    body: [
      "Life-safety systems are the single most common cause of handover delays. Approvals depend on a coordinated design package, not just installed hardware.",
      "We begin with hazard classification and occupancy analysis, which drives sprinkler density, hydrant coverage, pump sizing and tank capacity. These decisions must be locked before builders' work openings are cast.",
      "Detection, alarm, smoke management and emergency lighting are then coordinated against architectural ceilings and structural zones in a federated model — eliminating clashes that would otherwise appear on site.",
      "Commissioning is documented end to end: flow tests, cause-and-effect matrix verification and witnessed acceptance with the authority. The result is a clean approval rather than a punch-list negotiation.",
    ],
  },
  {
    slug: "sustainable-construction-vision-2030",
    title: "Sustainable Construction and Saudi Vision 2030",
    excerpt:
      "Giga-projects are raising the sustainability bar. Here is how contractors can meet it without inflating cost.",
    date: "4 May 2026",
    readTime: "5 min read",
    category: "Sustainability",
    author: "GST Group Newsroom",
    img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1400&q=80",
    body: [
      "Vision 2030 has moved sustainability from a marketing line to a contractual requirement. Energy performance, embodied carbon and waste diversion now appear in tender documents.",
      "Practical gains come from material choices: high-recycled-content steel, locally sourced aggregate, and glazing selected for solar performance rather than appearance alone.",
      "On site, the biggest wins are logistics — reducing rework, pre-fabricating in controlled workshop conditions, and segregating waste streams from day one.",
      "None of this needs to raise cost. Prefabrication typically shortens programme, and better façade specification lowers lifetime operating cost for the owner.",
    ],
  },
  {
    slug: "choosing-a-contracting-partner",
    title: "Six Questions to Ask Before Choosing a Contracting Partner",
    excerpt:
      "Price is the easiest thing to compare and the least useful. These questions reveal real delivery capability.",
    date: "17 April 2026",
    readTime: "4 min read",
    category: "Insights",
    author: "GST Group Newsroom",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80",
    body: [
      "Ask who actually performs the work. A contractor that owns its fabrication capacity controls programme; one that subcontracts everything controls only paperwork.",
      "Ask for the last three projects of similar scope, with references you may call. Sector experience is not transferable in the way brochures suggest.",
      "Ask how design changes are priced and how variations are recorded. Clarity here prevents most commercial disputes.",
      "Finally, ask about HSE statistics, QA/QC documentation and after-handover support. A partner that answers all six comfortably will usually be the one that finishes on time.",
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
