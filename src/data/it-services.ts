import {
  Server, Monitor, Smartphone, Code2, ShoppingCart, Utensils,
  Palette, Cog, Brain, Users, Layers,
  Wrench, Globe, CreditCard, BarChart3, Package, UserCheck,
  Layout, Settings2, Link2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ITService {
  id: string;
  name: string;
  description: string;
  category: "odoo" | "it";
  icon: LucideIcon;
  img: string;
}

export const IT_SERVICE_CATEGORIES = [
  { id: "odoo" as const, label: "Odoo Solutions" },
  { id: "it" as const, label: "IT Services" },
] as const;

export const IT_SERVICES: ITService[] = [
  // ─── Odoo Solutions ────────────────────────────
  {
    id: "odoo-erp",
    name: "Odoo ERP Implementation",
    description: "End-to-end ERP deployment tailored to your business processes, from planning to go-live and beyond.",
    category: "odoo",
    icon: Server,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "odoo-pos",
    name: "Odoo POS Solutions",
    description: "Fast, reliable point-of-sale systems for retail, restaurants, and multi-location businesses.",
    category: "odoo",
    icon: CreditCard,
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "odoo-crm",
    name: "Odoo CRM",
    description: "Streamline your sales pipeline with intelligent lead tracking, automation, and reporting.",
    category: "odoo",
    icon: Users,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "odoo-accounting",
    name: "Odoo Accounting",
    description: "Automated invoicing, bank reconciliation, and real-time financial reporting in one platform.",
    category: "odoo",
    icon: BarChart3,
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "odoo-inventory",
    name: "Odoo Inventory & Warehouse",
    description: "Real-time stock management, barcode scanning, and multi-warehouse logistics optimization.",
    category: "odoo",
    icon: Package,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "odoo-hr",
    name: "Odoo HR & Employee Management",
    description: "Comprehensive HR suite covering recruitment, attendance, payroll, and performance reviews.",
    category: "odoo",
    icon: UserCheck,
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "odoo-website",
    name: "Odoo Website & eCommerce",
    description: "Beautiful, conversion-optimized online stores and corporate websites powered by Odoo.",
    category: "odoo",
    icon: Globe,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "odoo-custom",
    name: "Odoo Customization & Integration",
    description: "Custom modules, third-party API integrations, and workflow automation for your unique needs.",
    category: "odoo",
    icon: Link2,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
  },

  // ─── IT Services ───────────────────────────────
  {
    id: "web-dev",
    name: "Website Development",
    description: "High-performance corporate websites built with modern frameworks and SEO best practices.",
    category: "it",
    icon: Monitor,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "ecommerce-dev",
    name: "E-Commerce Website Development",
    description: "Scalable online stores with secure payments, inventory sync, and conversion optimization.",
    category: "it",
    icon: ShoppingCart,
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "mobile-dev",
    name: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with premium UX.",
    category: "it",
    icon: Smartphone,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "custom-software",
    name: "Custom Software Development",
    description: "Bespoke software solutions engineered to solve your specific business challenges.",
    category: "it",
    icon: Code2,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "restaurant-pos",
    name: "Restaurant POS Software",
    description: "Specialized POS systems for dine-in, takeaway, and delivery with kitchen display integration.",
    category: "it",
    icon: Utensils,
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "online-ordering",
    name: "Online Ordering Systems",
    description: "White-label ordering platforms with real-time tracking and multi-channel integration.",
    category: "it",
    icon: Layout,
    img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description: "User-centered design with wireframing, prototyping, and usability testing for digital products.",
    category: "it",
    icon: Palette,
    img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "business-automation",
    name: "Business Automation",
    description: "Workflow automation, process optimization, and integration to eliminate manual bottlenecks.",
    category: "it",
    icon: Cog,
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "ai-integration",
    name: "AI Integration",
    description: "Intelligent automation, chatbots, predictive analytics, and machine learning solutions.",
    category: "it",
    icon: Brain,
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "crm-dev",
    name: "CRM Development",
    description: "Custom CRM platforms built to fit your sales process, customer journey, and reporting needs.",
    category: "it",
    icon: Users,
    img: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "erp-dev",
    name: "ERP Development",
    description: "Enterprise resource planning systems designed for complex multi-department operations.",
    category: "it",
    icon: Layers,
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "software-maintenance",
    name: "Software Maintenance & Support",
    description: "Ongoing support, bug fixes, performance tuning, and feature enhancements for your systems.",
    category: "it",
    icon: Wrench,
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop",
  },
];
