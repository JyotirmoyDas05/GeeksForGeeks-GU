// Team hierarchy data for the About Us page
export interface TeamMember {
  name: string;
  photo: string;
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

// Dummy team data following the hierarchy structure
export const teamData: TeamGroup[] = [
  {
    group: "Leadership",
    priority: 1,
    color: "#10b981",
    positions: [
      {
        title: "GFG Lead",
        member: {
          name: "Priya Sharma",
          photo: "/team/priya.jpg",
          bio: "Leading the GeeksForGeeks chapter with passion for technology and community building.",
          techStack: ["Leadership", "Strategy", "Community Building"],
          social: {
            linkedin: "https://linkedin.com/in/priya",
            github: "https://github.com/priya",
          },
        },
      },
      {
        title: "Technical Lead",
        member: {
          name: "Arjun Patel",
          photo: "/team/arjun.jpg",
          bio: "Overseeing all technical initiatives and mentoring developers across teams.",
          techStack: ["Full Stack", "System Design", "Mentoring"],
          social: {
            linkedin: "https://linkedin.com/in/arjun",
            github: "https://github.com/arjun",
          },
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
          name: "Kavya Singh",
          photo: "/team/kavya.jpg",
          bio: "Managing public relations and external communications.",
          techStack: ["Communication", "Marketing", "Event Planning"],
          social: {
            linkedin: "https://linkedin.com/in/kavya",
          },
        },
      },
      {
        title: "PR Associate",
        member: {
          name: "Rohit Kumar",
          photo: "/team/rohit.jpg",
          bio: "Supporting PR initiatives and community outreach programs.",
          techStack: ["Content Writing", "Social Media", "Outreach"],
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
          name: "Sneha Reddy",
          photo: "/team/sneha.jpg",
          bio: "Orchestrating technical events and workshops for the community.",
          techStack: ["Event Management", "Logistics", "Coordination"],
        },
      },
      {
        title: "Event Associate",
        member: {
          name: "Vikram Joshi",
          photo: "/team/vikram.jpg",
          bio: "Assisting in event planning and execution.",
          techStack: ["Planning", "Execution", "Team Coordination"],
        },
      },
    ],
  },
  {
    group: "Sponsorship & Acquisition",
    priority: 4,
    color: "#06b6d4",
    positions: [
      {
        title: "Sponsorship & Acquisition Lead",
        member: {
          name: "Ananya Gupta",
          photo: "/team/ananya.jpg",
          bio: "Building partnerships and securing sponsorships for events.",
          techStack: ["Business Development", "Partnership", "Negotiation"],
        },
      },
    ],
  },
  {
    group: "Graphics & Design Team",
    priority: 5,
    color: "#ec4899",
    positions: [
      {
        title: "Graphics & Design Lead",
        member: {
          name: "Ravi Verma",
          photo: "/team/ravi.jpg",
          bio: "Leading visual design and branding initiatives.",
          techStack: ["Adobe Creative Suite", "UI/UX", "Branding"],
        },
      },
      {
        title: "Co-Lead",
        member: {
          name: "Meera Shah",
          photo: "/team/meera.jpg",
          bio: "Supporting design projects and creative direction.",
          techStack: ["Figma", "Illustrator", "Creative Direction"],
        },
      },
      {
        title: "Associate",
        member: {
          name: "Karthik Rao",
          photo: "/team/karthik.jpg",
          bio: "Creating visual content and supporting design tasks.",
          techStack: ["Photoshop", "Canva", "Visual Design"],
        },
      },
    ],
  },
  {
    group: "Social Media Team",
    priority: 6,
    color: "#84cc16",
    positions: [
      {
        title: "Social Media Lead",
        member: {
          name: "Pooja Agarwal",
          photo: "/team/pooja.jpg",
          bio: "Managing social media presence and digital marketing.",
          techStack: [
            "Social Media Marketing",
            "Content Strategy",
            "Analytics",
          ],
        },
      },
      {
        title: "Co-Lead",
        member: {
          name: "Amit Sharma",
          photo: "/team/amit.jpg",
          bio: "Supporting social media campaigns and content creation.",
          techStack: [
            "Content Creation",
            "Community Management",
            "Digital Marketing",
          ],
        },
      },
    ],
  },
  {
    group: "DSA",
    priority: 7,
    color: "#6366f1",
    positions: [
      {
        title: "DSA Lead",
        member: {
          name: "Nisha Malhotra",
          photo: "/team/nisha.jpg",
          bio: "Teaching data structures and algorithms to the community.",
          techStack: [
            "Data Structures",
            "Algorithms",
            "Competitive Programming",
            "Teaching",
          ],
        },
      },
    ],
  },
  {
    group: "DevOps Team",
    priority: 8,
    color: "#ef4444",
    positions: [
      {
        title: "DevOps Lead",
        member: {
          name: "Suresh Krishnan",
          photo: "/team/suresh.jpg",
          bio: "Managing infrastructure and deployment pipelines.",
          techStack: ["Docker", "Kubernetes", "AWS", "CI/CD"],
        },
      },
      {
        title: "Co-Lead",
        member: {
          name: "Deepika Nair",
          photo: "/team/deepika.jpg",
          bio: "Supporting cloud infrastructure and automation.",
          techStack: ["Azure", "Terraform", "Jenkins", "Monitoring"],
        },
      },
    ],
  },
  {
    group: "Web Dev Team",
    priority: 9,
    color: "#0ea5e9",
    positions: [
      {
        title: "Web Dev Lead",
        member: {
          name: "Rahul Mishra",
          photo: "/team/rahul.jpg",
          bio: "Leading web development projects and mentoring developers.",
          techStack: ["React", "Next.js", "Node.js", "TypeScript"],
        },
      },
      {
        title: "Co-Lead",
        member: {
          name: "Priyanka Das",
          photo: "/team/priyanka.jpg",
          bio: "Supporting full-stack development and code reviews.",
          techStack: ["Vue.js", "Express.js", "MongoDB", "GraphQL"],
        },
      },
    ],
  },
  {
    group: "IoT Team",
    priority: 10,
    color: "#f97316",
    positions: [
      {
        title: "IoT Lead",
        member: {
          name: "Sanjay Pillai",
          photo: "/team/sanjay.jpg",
          bio: "Exploring Internet of Things and embedded systems.",
          techStack: ["Arduino", "Raspberry Pi", "Sensors", "Embedded C"],
        },
      },
      {
        title: "Co-Lead",
        member: {
          name: "Lakshmi Iyer",
          photo: "/team/lakshmi.jpg",
          bio: "Working on IoT projects and hardware integration.",
          techStack: ["ESP32", "MQTT", "LoRa", "Circuit Design"],
        },
      },
    ],
  },
  {
    group: "AI/ML Team",
    priority: 11,
    color: "#8b5cf6",
    positions: [
      {
        title: "AI/ML Lead",
        member: {
          name: "Vivek Tiwari",
          photo: "/team/vivek.jpg",
          bio: "Leading artificial intelligence and machine learning initiatives.",
          techStack: ["Python", "TensorFlow", "PyTorch", "Data Science"],
        },
      },
      {
        title: "Co-Lead",
        member: {
          name: "Riya Bansal",
          photo: "/team/riya.jpg",
          bio: "Working on ML models and data analysis projects.",
          techStack: ["Scikit-learn", "Pandas", "NumPy", "Computer Vision"],
        },
      },
    ],
  },
  {
    group: "Game Dev Team",
    priority: 12,
    color: "#10b981",
    positions: [
      {
        title: "Game Dev Lead",
        member: {
          name: "Aditya Khanna",
          photo: "/team/aditya.jpg",
          bio: "Creating engaging games and interactive experiences.",
          techStack: ["Unity", "C#", "Game Design", "3D Modeling"],
        },
      },
      {
        title: "Co-Lead",
        member: {
          name: "Shweta Raj",
          photo: "/team/shweta.jpg",
          bio: "Supporting game development and level design.",
          techStack: ["Unreal Engine", "Blender", "Animation", "Level Design"],
        },
      },
    ],
  },
  {
    group: "Creative & Reel Team",
    priority: 13,
    color: "#ec4899",
    positions: [
      {
        title: "Creative & Reel Lead",
        member: {
          name: "Aryan Singh",
          photo: "/team/aryan.jpg",
          bio: "Creating engaging video content and creative campaigns.",
          techStack: [
            "Video Editing",
            "After Effects",
            "Creative Direction",
            "Storytelling",
          ],
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
