export type ContentLink = {
  label: string;
  href: string;
  description?: string;
};

export type ContentCta = {
  label: string;
  href: string;
  enabled?: boolean;
};

export type MainNavItem = {
  label: string;
  href?: string;
  megaMenu?: {
    groups: {
      title: string;
      links: ContentLink[];
    }[];
  };
};

export type ResourceCategory = "Case Study" | "Guide" | "Blog" | "Webinar" | "Download";

export type ResourceItem = {
  slug: string;
  title: string;
  summary: string;
  category: ResourceCategory;
  href: string;
  body: string[];
};

export type MilemendContent = {
  brand: {
    name: string;
    tagline?: string;
    shortDescription?: string;
    logo?: {
      src: string;
      alt: string;
    };
  };
  topBar: {
    enabled: boolean;
    text: string;
    emphasize: string;
  };
  utilityLinks: {
    label: string;
    href: string;
  }[];
  ctas: {
    primary: ContentCta;
    secondary: ContentCta;
  };
  mainNav: MainNavItem[];
  footer: {
    links: ContentLink[];
    legal: ContentLink[];
    contact: {
      email: string;
      location: string;
      phone: string;
    };
  };
  homePage: {
    announcement?: {
      text: string;
      link: ContentLink;
    };
    hero: {
      headline: string;
      subheadline: string;
      bullets: string[];
      primaryCta: ContentCta;
      secondaryCta?: ContentCta;
      image?: {
        src: string;
        alt: string;
      };
      heroVisual: {
        metricCard: {
          label: string;
          value: string;
          delta: string;
          deltaLabel: string;
        };
        miniTable: {
          title: string;
          columns: string[];
          rows: string[][];
        };
      };
      illustrationLabel: string;
    };
    stats: {
      heading: string;
      description: string;
      items: {
        value: string;
        label: string;
      }[];
    };
    whatYouGet: {
      title: string;
      items: Array<{ title: string; description?: string }>;
    };
    coreCapabilities: {
      eyebrow: string;
      title: string;
      description: string;
      cards: {
        title: string;
        description: string;
      }[];
      roadmapNote: string;
    };
    leadershipSection: {
      eyebrow?: string;
      title: string;
      bullets: string[];
      includeFinanceGrants?: boolean;
    };
    modules: {
      eyebrow: string;
      title: string;
      description: string;
      cardLinkLabel: string;
      cards: {
        title: string;
        description: string;
        href: string;
      }[];
    };
    finalCTA: {
      headline: string;
      supportingText: string;
      primaryCta: ContentCta;
      secondaryCta: ContentCta;
    };
  };
  platformPage: {
    overview: {
      eyebrow: string;
      title: string;
      description: string;
    };
    modules: {
      title: string;
      description: string;
      cardLinkLabel: string;
    };
    integrationsTeaser: {
      title: string;
      description: string;
      links: ContentLink[];
    };
    securityTeaser: {
      title: string;
      description: string;
      bullets: string[];
    };
  };
  solutionsPage: {
    byOrganization: {
      eyebrow: string;
      title: string;
      description: string;
      organizations: {
        name: string;
        summary: string;
        focusAreas: string[];
      }[];
    };
  };
  resourcesPage: {
    heading: {
      eyebrow: string;
      title: string;
      description: string;
    };
    filterLabel: string;
    allFilterLabel: string;
    cardLinkLabel: string;
    categories: ResourceCategory[];
    items: ResourceItem[];
  };
  companyAboutPage: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    mission: {
      title: string;
      body: string;
    };
    values: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    howItWorks: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    whyMileMend: {
      title: string;
      body: string;
    };
  };
  contactPage: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    form: {
      submitLabel: string;
      successTitle: string;
      successBody: string;
      fields: {
        name: string;
        email: string;
        org: string;
        message: string;
      };
      errors: {
        required: string;
        emailInvalid: string;
      };
    };
  };
};

export const milemendContent: MilemendContent = {
  brand: {
    name: "Milemend",
    logo: { src: "/milemend-logo.png", alt: "Milemend" },
    tagline: "Modern street maintenance operations for public works teams.",
    shortDescription:
      "Milemend helps local governments plan, coordinate, and report roadway maintenance from one platform.",
  },
  topBar: {
    enabled: true,
    text: "Meet the next step in Infrastructure Intelligence",
    emphasize: "Infrastructure Intelligence",
  },
  utilityLinks: [
    { label: "FAQ", href: "/resources/faq" },
  ],
  ctas: {
    primary: {
      label: "Request a demo",
      href: "/contact",
    },
    secondary: {
      label: "Login",
      href: "/login",
      enabled: false,
    },
  },
  mainNav: [
    {
      label: "Product",
      href: "/product",
    },
    {
      label: "Security & Privacy",
      href: "/security-privacy",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  footer: {
    links: [
      { label: "Product", href: "/product" },
      { label: "Security & Privacy", href: "/security-privacy" },
      { label: "FAQ", href: "/resources/faq" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    contact: {
      email: "info@milemend.com",
      location: "United States",
      phone: "",
    },
  },
  homePage: {
    announcement: {
      text: "New: Milemend Winter Operations Toolkit is now available.",
      link: {
        label: "Download now",
        href: "/resources?category=Download",
      },
    },
    hero: {
      headline: "Know road condition for every mile with Milemend.",
      subheadline:
        "Coordinate requests, crews, assets, and reporting with a single platform designed for public works.",
      bullets: [
        "Network-level condition visibility (coverage + recency)",
        "Prioritized candidate list (transparent rationale)",
        "Council-ready summaries (easy to forward internally)",
      ],
      primaryCta: {
        label: "Request a demo",
        href: "/contact",
      },
      image: {
        src: "/hero-photo.jpg",
        alt: "Person typing on a laptop",
      },
      heroVisual: {
        metricCard: {
          label: "MPCI",
          value: "78%",
          delta: "+1.3%",
          deltaLabel: "improvement",
        },
        miniTable: {
          title: "Prioritized Candidate List",
          columns: ["Street", "Current MPCI", "180 Day Delta", "1 Year Delta"],
          rows: [
            ["Ambler Ave", "67%", "-11%", "-15%"],
            ["Park Ave", "82%", "-12%", "-16%"],
          ],
        },
      },
      illustrationLabel: "Abstract operations dashboard illustration",
    },
    stats: {
      heading: "Operational clarity for every district",
      description:
        "Track service delivery, backlog movement, and resident communication performance in one place.",
      items: [
        { value: "95%", label: "on-time work order completion" },
        { value: "42 hrs", label: "weekly time saved on coordination" },
        { value: "3.2x", label: "faster resident status updates" },
        { value: "28%", label: "improvement in preventive maintenance coverage" },
      ],
    },
    whatYouGet: {
      title: "What you get",
      items: [
        {
          title: "Condition coverage + recency snapshot",
          description:
            "See where condition data is current and where coverage is stale. Milemend highlights what’s known, what’s missing, and what changed since the last update. Use this to plan collection and reduce guesswork when setting maintenance priorities.",
        },
        {
          title: "Prioritized maintenance candidates",
          description:
            "Turn condition signals into a short list of streets to review. Each candidate includes the reasoning and inputs behind the recommendation so your team can validate it quickly. Share the list internally to align on next steps before committing budget.",
        },
        {
          title: "Leadership-ready reporting pack",
          description:
            "Generate concise summaries that explain network condition and the case for the next maintenance set. Package outputs so they’re easy to forward to leadership and stakeholders without rewriting. Keep a consistent narrative across engineering, public works, and budget discussions.",
        },
      ],
    },
    coreCapabilities: {
      eyebrow: "CORE CAPABILITIES",
      title: "A focused toolkit for street condition decisions",
      description:
        "Start with the essentials: visibility, prioritization, and outputs you can share.",
      cards: [
        {
          title: "Condition Intelligence",
          description:
            "Coverage, recency, and trend signals to understand what’s happening across the network.",
        },
        {
          title: "Prioritization & Rationale",
          description:
            "Clear “why this road first?” documentation that holds up in internal review.",
        },
        {
          title: "Exports & Reporting",
          description: "Shareable outputs for leadership and partners, with integrations later.",
        },
      ],
      roadmapNote:
        "Integrations with existing systems are part of the roadmap — we start with lightweight exports.",
    },
    leadershipSection: {
      eyebrow: "LEADERSHIP",
      title: "Built for Public Works leadership",
      bullets: [
        "Public Works Director: prioritization + reporting",
        "City Engineer: condition trends + project justification",
        "Finance/Grants: budget narrative + defensible documentation",
      ],
    },
    modules: {
      eyebrow: "Capabilities",
      title: "Core capabilities for street condition decisions",
      description:
        "Start with condition visibility, prioritization rationale, and shareable outputs that work with existing processes.",
      cardLinkLabel: "View capability details",
      cards: [
        {
          title: "Condition Intelligence",
          description:
            "Coverage, recency, and trend signals to understand what’s happening across the network.",
          href: "/product#condition-intelligence",
        },
        {
          title: "Prioritization & Rationale",
          description:
            "Clear documentation for why a road is prioritized, with consistent internal review context.",
          href: "/product#prioritization-rationale",
        },
        {
          title: "Exports & Reporting",
          description: "Shareable outputs for leadership and partners, with integrations added over time.",
          href: "/product#exports-reporting",
        },
      ],
    },
    finalCTA: {
      headline: "Ready to modernize roadway operations?",
      supportingText:
        "Get a clearer view of road conditions and a defensible way to prioritize maintenance.",
      primaryCta: {
        label: "Request a Demo",
        href: "/contact",
      },
      secondaryCta: {
        label: "Download Capabilities Statement",
        href: "/capabilities-statement.pdf",
      },
    },
  },
  platformPage: {
    overview: {
      eyebrow: "Platform Overview",
      title: "A complete operating layer for street maintenance",
      description:
        "Milemend brings condition visibility, prioritization support, and shareable reporting into one practical workflow.",
    },
    modules: {
      title: "Core Capabilities",
      description: "A focused toolkit for street condition decisions.",
      cardLinkLabel: "View capability",
    },
    integrationsTeaser: {
      title: "Integrations",
      description:
        "Connect Milemend with systems already used by your city teams for mapping, service management, and reporting.",
      links: [
        { label: "GIS Layers", href: "#", description: "Map-based request visualization and routing." },
        { label: "CRM Systems", href: "#", description: "Bidirectional sync for service ticket updates." },
        { label: "Reporting Exports", href: "#", description: "Structured exports for leadership dashboards." },
      ],
    },
    securityTeaser: {
      title: "Security",
      description:
        "Built for municipal operations with practical controls, traceability, and role-based access.",
      bullets: [
        "Role-based permissions aligned to operational responsibilities.",
        "Audit logs for assignment, status, and closure changes.",
        "add compliance and hosting details after review.",
      ],
    },
  },
  solutionsPage: {
    byOrganization: {
      eyebrow: "By Organization",
      title: "Delivery patterns matched to organization type",
      description:
        "Milemend implementation paths adapt to staffing models, service territories, and governance requirements.",
      organizations: [
        {
          name: "Cities",
          summary: "Coordinate resident-facing service delivery across multiple districts.",
          focusAreas: [
            "Resident request integration and response transparency",
            "District-level service metrics",
            "Cross-department workflow alignment",
          ],
        },
        {
          name: "Counties",
          summary: "Manage larger geographies with mixed maintenance and contractor models.",
          focusAreas: [
            "Regional routing and prioritization",
            "Contractor oversight and QA",
            "Capital planning data readiness",
          ],
        },
        {
          name: "Transportation Agencies",
          summary: "Standardize lifecycle data for roadway assets and maintenance programs.",
          focusAreas: [
            "Treatment history by segment",
            "Performance trend analysis",
            "Grant and funding support documentation",
          ],
        },
      ],
    },
  },
  resourcesPage: {
    heading: {
      eyebrow: "Resources",
      title: "Playbooks, examples, and templates for street maintenance teams",
      description:
        "Browse practical resources by format and use-case. All content below is placeholder and ready for replacement.",
    },
    filterLabel: "Filter by category",
    allFilterLabel: "All",
    cardLinkLabel: "View resource",
    categories: ["Case Study", "Guide", "Blog", "Webinar", "Download"],
    items: [
      {
        slug: "backlog-reduction-case-study",
        title: "Backlog Reduction Case Study",
        summary: "Outcome snapshot for a public works team reducing request backlog.",
        category: "Case Study",
        href: "/resources/backlog-reduction-case-study",
        body: [
          "Insert approved case study narrative and context.",
          "Add baseline metrics, implementation scope, and outcomes.",
          "Include stakeholder quote and lessons learned.",
        ],
      },
      {
        slug: "district-operations-guide",
        title: "District Operations Guide",
        summary: "Framework for district-level request review, triage, and work coordination.",
        category: "Guide",
        href: "/resources/district-operations-guide",
        body: [
          "Define operating model and governance roles.",
          "Document SLA tiers and escalation logic.",
          "Add implementation checklist and review cadence.",
        ],
      },
      {
        slug: "public-works-data-hygiene-blog",
        title: "Public Works Data Hygiene",
        summary: "Best practices for clean service request and closure data.",
        category: "Blog",
        href: "/resources/public-works-data-hygiene-blog",
        body: [
          "Explain why data quality drives operational decisions.",
          "Add practical validation rules and examples.",
          "Provide recurring data review workflow.",
        ],
      },
      {
        slug: "work-order-routing-webinar",
        title: "Work Order Routing Webinar",
        summary: "Session recap on routing logic and workload balancing.",
        category: "Webinar",
        href: "/resources/work-order-routing-webinar",
        body: [
          "Add webinar summary and key takeaways.",
          "Link follow-up templates.",
          "Insert timestamped highlights.",
        ],
      },
      {
        slug: "sla-policy-template-download",
        title: "SLA Policy Template",
        summary: "Downloadable template for service-level definitions.",
        category: "Download",
        href: "/resources/sla-policy-template-download",
        body: [
          "Outline template structure and intended use.",
          "Add sample language by request severity.",
          "Include review and approval workflow.",
        ],
      },
      {
        slug: "resident-communications-case-study",
        title: "Resident Communications Case Study",
        summary: "Story on improving transparency and reducing repeat inquiries.",
        category: "Case Study",
        href: "/resources/resident-communications-case-study",
        body: [
          "Add communication workflow before/after launch.",
          "Include support center impact metrics.",
          "Capture operational takeaways for replication.",
        ],
      },
      {
        slug: "mobile-crew-adoption-guide",
        title: "Mobile Crew Adoption Guide",
        summary: "Rollout guidance for field workflows and training.",
        category: "Guide",
        href: "/resources/mobile-crew-adoption-guide",
        body: [
          "Add phased onboarding model for crews.",
          "Include supervisor coaching checklist.",
          "Define adoption milestones.",
        ],
      },
      {
        slug: "budget-season-planning-blog",
        title: "Budget Season Planning",
        summary: "Preparing maintenance data for planning and funding discussions.",
        category: "Blog",
        href: "/resources/budget-season-planning-blog",
        body: [
          "Describe reporting views for financial stakeholders.",
          "Map common data requests to standard reports.",
          "Add pre-budget prep timeline.",
        ],
      },
      {
        slug: "contractor-quality-webinar",
        title: "Contractor Quality Webinar",
        summary: "Teaser for inspection standards and vendor scorecards.",
        category: "Webinar",
        href: "/resources/contractor-quality-webinar",
        body: [
          "Summarize quality assurance framework.",
          "Add scorecard indicators and acceptance criteria.",
          "Include handoff and closeout best practices.",
        ],
      },
      {
        slug: "implementation-checklist-download",
        title: "90-Day Implementation Checklist",
        summary: "Downloadable launch checklist for process and reporting readiness.",
        category: "Download",
        href: "/resources/implementation-checklist-download",
        body: [
          "Add checklist by launch phase.",
          "Include team ownership matrix.",
          "Define go-live readiness indicators.",
        ],
      },
    ],
  },
  companyAboutPage: {
    hero: {
      eyebrow: "About Milemend",
      title: "Purpose-built software for responsive roadway services",
      description:
        "Milemend partners with public agencies to modernize service delivery and improve how road maintenance work gets planned, executed, and communicated.",
    },
    mission: {
      title: "Mission",
      body: "Help public works teams deliver safer, more transparent road maintenance through practical, data-informed workflows.",
    },
    values: {
      title: "Values",
      items: [
        {
          title: "Service First",
          description: "Design around resident outcomes and dependable response expectations.",
        },
        {
          title: "Operational Clarity",
          description: "Make status, responsibility, and performance clear at every stage.",
        },
        {
          title: "Practical Innovation",
          description: "Ship tools teams can adopt quickly without disrupting core operations.",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        {
          title: "Map Your Current Process",
          description: "Document request sources, routing logic, and closure requirements.",
        },
        {
          title: "Configure Workflows",
          description: "Set up categories, SLAs, coordination boards, and reporting views.",
        },
        {
          title: "Launch and Improve",
          description: "Train teams, monitor outcomes, and refine workflows continuously.",
        },
      ],
    },
    whyMileMend: {
      title: "Why Milemend",
      body: "Local governments need systems that bridge resident expectations and field execution. Milemend focuses on that operational gap with implementation support and configurable workflows designed for public infrastructure teams.",
    },
  },
  contactPage: {
    hero: {
      eyebrow: "Contact",
      title: "Talk with the Milemend team",
      description:
        "Share your current workflow and goals. We will help map the right starting point for your organization.",
    },
    form: {
      submitLabel: "Send Message",
      successTitle: "Thanks for reaching out",
      successBody: "Your message has been recorded. A Milemend specialist will follow up shortly.",
      fields: {
        name: "Name",
        email: "Email",
        org: "Organization",
        message: "Message",
      },
      errors: {
        required: "This field is required.",
        emailInvalid: "Enter a valid email address.",
      },
    },
  },
};
