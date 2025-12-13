// Team hierarchy data for the About Us page
export interface TeamMember {
  name: string;
  photo: string;
  role: string;
  bio?: string;
  techStack?: string[];
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Position {
  title: string;
  member: TeamMember;
}

export interface TeamGroup {
  group: string;
  positions: Position[];
  priority: number; // For ordering
  color?: string; // Theme color for the group
}

// Complete team data with all 40 members from TeamSection.tsx
export const teamData: TeamGroup[] = [
  {
    group: "Leadership",
    priority: 1,
    color: "#10b981",
    positions: [
      {
        title: "Campus Lead",
        member: {
          name: "Simanta",
          photo: "/simanta.jpg",
          role: "Campus Lead",
          bio: "Leading the GeeksForGeeks chapter with passion for technology and community building.",
        },
      },
      {
        title: "Technical Lead",
        member: {
          name: "Nitin",
          photo: "/nitin.jpg",
          role: "Technical Lead",
          bio: "Overseeing all technical initiatives and mentoring developers across teams.",
        },
      },
    ],
  },
  {
    group: "PR Team",
    priority: 2,
    color: "#8b5cf6",
    positions: [
      {
        title: "PR Lead",
        member: {
          name: "Priyam",
          photo: "/priyam.jpg",
          role: "PR Lead",
          bio: "Managing public relations and external communications.",
        },
      },
      {
        title: "PR Co-lead",
        member: {
          name: "Dawar",
          photo: "/Dawar.jpeg",
          role: "PR Co-lead",
          bio: "Supporting PR initiatives and community outreach programs.",
        },
      },
      {
        title: "PR Co-lead",
        member: {
          name: "Vrishank",
          photo: "/vrishank.jpg",
          role: "PR Co-lead",
          bio: "Supporting PR initiatives and community outreach programs.",
        },
      },
      {
        title: "PR Associate Lead",
        member: {
          name: "Sagarika",
          photo: "/Sagarika.jpeg",
          role: "PR Associate Lead",
          bio: "Assisting with PR campaigns and external partnerships.",
        },
      },
      {
        title: "PR Associate",
        member: {
          name: "Mandeep",
          photo: "/mandeep.jpg",
          role: "PR Associate",
          bio: "Contributing to public relations and outreach efforts.",
        },
      },
    ],
  },
  {
    group: "Event Team",
    priority: 3,
    color: "#f59e0b",
    positions: [
      {
        title: "Event Lead",
        member: {
          name: "Dhritee",
          photo: "/dhritee_.jpg",
          role: "Event Lead",
          bio: "Orchestrating technical events and workshops for the community.",
        },
      },
      {
        title: "Event Co-lead",
        member: {
          name: "Debakalpa",
          photo: "/Debakalpa.jpg",
          role: "Event Co-lead",
          bio: "Assisting in event planning and execution.",
        },
      },
      {
        title: "Event Co-lead",
        member: {
          name: "Jyotishman",
          photo: "/jyotishman.jpg",
          role: "Event Co-lead",
          bio: "Assisting in event planning and coordination.",
        },
      },
      {
        title: "Event Associate",
        member: {
          name: "Sarangapani",
          photo: "/Sarangapani.jpg",
          role: "Event Associate",
          bio: "Contributing to event organization and management.",
        },
      },
    ],
  },
  {
    group: "Graphics & Design Team",
    priority: 4,
    color: "#ec4899",
    positions: [
      {
        title: "Graphics & Design Lead",
        member: {
          name: "Nahid",
          photo: "/Nahid.jpg",
          role: "Graphics & Design Lead",
          bio: "Leading visual design and branding initiatives.",
        },
      },
      {
        title: "Graphics & Design Co-lead",
        member: {
          name: "Garima",
          photo: "/garima.jpg",
          role: "Graphics & Design Co-lead",
          bio: "Supporting design projects and creative direction.",
        },
      },
      {
        title: "Graphics & Design Co-lead",
        member: {
          name: "Shruti",
          photo: "/Shruti.jpg",
          role: "Graphics & Design Co-lead",
          bio: "Supporting design projects and creative direction.",
        },
      },
      {
        title: "Graphics & Design Associate",
        member: {
          name: "Neelim",
          photo: "/neelim.jpg",
          role: "Graphics & Design Associate",
          bio: "Creating visual content and supporting design tasks.",
        },
      },
      {
        title: "Graphics & Design Associate",
        member: {
          name: "Parisa",
          photo: "/parisa.jpg",
          role: "Graphics & Design Associate",
          bio: "Creating visual content and supporting design tasks.",
        },
      },
    ],
  },
  {
    group: "Social Media Team",
    priority: 5,
    color: "#84cc16",
    positions: [
      {
        title: "Social Media Lead",
        member: {
          name: "Prajnan",
          photo: "/prajnan.jpg",
          role: "Social Media Lead",
          bio: "Managing social media presence and digital marketing.",
        },
      },
      {
        title: "Social Media Co-lead",
        member: {
          name: "Dibyajyoti",
          photo: "/Dibyajyoti.jpg",
          role: "Social Media Co-lead",
          bio: "Supporting social media campaigns and content creation.",
        },
      },
    ],
  },
  {
    group: "DSA Team",
    priority: 6,
    color: "#6366f1",
    positions: [
      {
        title: "DSA Lead",
        member: {
          name: "Diya",
          photo: "/Diya.jpg",
          role: "DSA Lead",
          bio: "Teaching data structures and algorithms to the community.",
        },
      },
    ],
  },
  {
    group: "DevOps Team",
    priority: 7,
    color: "#ef4444",
    positions: [
      {
        title: "DevOps Lead",
        member: {
          name: "Ankita",
          photo: "/ankita.jpg",
          role: "DevOps Lead",
          bio: "Managing infrastructure and deployment pipelines.",
        },
      },
      {
        title: "DevOps Lead",
        member: {
          name: "Pragyan",
          photo: "/pragyan.jpg",
          role: "DevOps Lead",
          bio: "Managing infrastructure and automation.",
        },
      },
      {
        title: "DevOps Co-lead",
        member: {
          name: "Jyotirmoy",
          photo: "/jyotirmoy.jpeg",
          role: "DevOps Co-lead",
          bio: "Supporting cloud infrastructure and CI/CD pipelines.",
        },
      },
    ],
  },
  {
    group: "Developer Team",
    priority: 8,
    color: "#0ea5e9",
    positions: [
      {
        title: "Developer Lead",
        member: {
          name: "Gaurab",
          photo: "/gaurav.jpg",
          role: "Developer Lead",
          bio: "Leading web development projects and mentoring developers.",
        },
      },
      {
        title: "Developer Co-lead",
        member: {
          name: "Muskan",
          photo: "/Muskan.jpg",
          role: "Developer Co-lead",
          bio: "Supporting full-stack development and code reviews.",
        },
      },
      {
        title: "Developer Co-lead",
        member: {
          name: "Sahid",
          photo: "/sahid.jpg",
          role: "Developer Co-lead",
          bio: "Supporting web development projects and team coordination.",
        },
      },
    ],
  },
  {
    group: "Robotics & IoT Team",
    priority: 9,
    color: "#f97316",
    positions: [
      {
        title: "Robotics & IoT Lead",
        member: {
          name: "Denim",
          photo: "/denim_d.jpg",
          role: "Robotics & IoT Lead",
          bio: "Leading IoT and robotics initiatives.",
        },
      },
      {
        title: "Robotics & IoT Lead",
        member: {
          name: "Mriganga",
          photo: "/Mriganga_.jpg",
          role: "Robotics & IoT Lead",
          bio: "Leading robotics and embedded systems projects.",
        },
      },
      {
        title: "Robotics & IoT Co-lead",
        member: {
          name: "Bitopan",
          photo: "/bitopan.jpg",
          role: "Robotics & IoT Co-lead",
          bio: "Supporting IoT projects and hardware integration.",
        },
      },
      {
        title: "Robotics & IoT Co-lead",
        member: {
          name: "Diya",
          photo: "/Diya-3rd-sem.jpg",
          role: "Robotics & IoT Co-lead",
          bio: "Working on IoT projects and automation.",
        },
      },
    ],
  },
  {
    group: "AI/ML Team",
    priority: 10,
    color: "#8b5cf6",
    positions: [
      {
        title: "AI/ML Lead",
        member: {
          name: "Bhargab",
          photo: "/bhargav.jpg",
          role: "AI/ML Lead",
          bio: "Leading artificial intelligence and machine learning initiatives.",
        },
      },
      {
        title: "AI/ML Lead",
        member: {
          name: "Sampurna",
          photo: "/Sampurna.jpg",
          role: "AI/ML Lead",
          bio: "Leading machine learning projects and research.",
        },
      },
      {
        title: "AI/ML Co-lead",
        member: {
          name: "Tanmoy",
          photo: "/tanmoy_.jpg",
          role: "AI/ML Co-lead",
          bio: "Working on ML models and data analysis projects.",
        },
      },
    ],
  },
  {
    group: "Game Dev Team",
    priority: 11,
    color: "#10b981",
    positions: [
      {
        title: "Game Dev Lead",
        member: {
          name: "Uddipta",
          photo: "/uddipta.jpg",
          role: "Game Dev Lead",
          bio: "Creating engaging games and interactive experiences.",
        },
      },
      {
        title: "Game Dev Co-lead",
        member: {
          name: "Bhairab",
          photo: "/bhairab.jpg",
          role: "Game Dev Co-lead",
          bio: "Supporting game development and design.",
        },
      },
    ],
  },
  {
    group: "Reels & Content Team",
    priority: 12,
    color: "#ec4899",
    positions: [
      {
        title: "Reels & Content Associate Lead",
        member: {
          name: "Jupitora",
          photo: "/jupitora.jpg",
          role: "Reels & Content Associate Lead",
          bio: "Creating engaging video content and creative campaigns.",
        },
      },
      {
        title: "Reels & Content Associate Lead",
        member: {
          name: "Nishita",
          photo: "/Nishita.jpg",
          role: "Reels & Content Associate Lead",
          bio: "Supporting video content creation.",
        },
      },
      {
        title: "Reels & Content Associate Lead",
        member: {
          name: "Prachi",
          photo: "/prachi.jpg",
          role: "Reels & Content Associate Lead",
          bio: "Creating creative content and campaigns.",
        },
      },
      {
        title: "Reels & Content Associate Lead",
        member: {
          name: "Pritom",
          photo: "/pritom.jpg",
          role: "Reels & Content Associate Lead",
          bio: "Supporting content creation and editing.",
        },
      },
      {
        title: "Reels & Content Associate Lead",
        member: {
          name: "Tanbir",
          photo: "/tanbir.jpg",
          role: "Reels & Content Associate Lead",
          bio: "Creating engaging reels and content.",
        },
      },
      {
        title: "Reels & Content Associate Lead",
        member: {
          name: "Taniya",
          photo: "/taniya.jpg",
          role: "Reels & Content Associate Lead",
          bio: "Supporting video production and storytelling.",
        },
      },
    ],
  },
];

// Helper function to get all team members
export const getAllMembers = (): TeamMember[] => {
  return teamData.flatMap((group) =>
    group.positions.map((position) => position.member)
  );
};

// Helper function to get team by priority
export const getTeamsByPriority = (): TeamGroup[] => {
  return teamData.sort((a, b) => a.priority - b.priority);
};

// Get total member count
export const getTotalMemberCount = (): number => {
  return teamData.reduce((acc, group) => acc + group.positions.length, 0);
};
