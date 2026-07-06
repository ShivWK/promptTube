import {
    House,
    MailPlus,
    ThumbsUp,
    History,
    Clock,
    ShoppingBag,
    Music,
    Clapperboard,
    RadioTower,
    Gamepad2,
    Newspaper,
    Trophy,
    GraduationCap,
    Shirt,
    Podcast,
    Sparkles,
    Brain,
    Code2,
    Cpu,
    Bot,
    Briefcase,
    Dumbbell,
    Plane,
    UtensilsCrossed,
    Camera,
    Palette,
    Microscope,
    Landmark,
    Database,
    Shield,
    Smartphone,
    ChartNoAxesCombined,
    DollarSign,
    Globe,
} from "lucide-react";

export const FIRST = [
    {
        name: "Home",
        Icon: House,
        url: "/"
    },

    {
        name: "Subscription",
        Icon: MailPlus,
        url: "/account?section=subscription"
    },
]

export const YOUR = [
    {
        name: "Watch Later",
        Icon: Clock,
        url: "/account?section=watchLater"
    },

    {
        name: "Liked videos",
        Icon: ThumbsUp,
        url: "/account?section=likedVideo"
    },

    {
        name: "History",
        Icon: History,
        url: "/account?section=history"
    },
]

export const GENERAL_SUB_CATEGORY = [
    {
        name: "Trending",
        Icon: Sparkles,
        searchTerms: [
            "Trending",
            "Popular",
            "Most Viewed",
            "Viral",
            "Latest"
        ]
    },

    {
        name: "Artificial Intelligence",
        Icon: Brain,
        searchTerms: [
            "Artificial Intelligence",
            "ChatGPT",
            "Claude AI",
            "Gemini AI",
            "OpenAI",
            "Cursor AI",
            "AI Agents",
            "Generative AI",
            "Machine Learning"
        ]
    },

    {
        name: "Programming",
        Icon: Code2,
        searchTerms: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "Java",
            "C++",
            "Rust",
            "Web Development"
        ]
    },

    {
        name: "Software Engineering",
        Icon: Cpu,
        searchTerms: [
            "System Design",
            "Software Engineering",
            "Architecture",
            "Scalable Systems",
            "Microservices",
            "Clean Code",
            "Design Patterns"
        ]
    },

    {
        name: "Backend",
        Icon: Database,
        searchTerms: [
            "Node.js",
            "Express",
            "MongoDB",
            "PostgreSQL",
            "Redis",
            "Docker",
            "Kubernetes",
            "API Development"
        ]
    },

    {
        name: "Cyber Security",
        Icon: Shield,
        searchTerms: [
            "Cyber Security",
            "Ethical Hacking",
            "OWASP",
            "Network Security",
            "Penetration Testing",
            "Bug Bounty"
        ]
    },

    {
        name: "Mobile Development",
        Icon: Smartphone,
        searchTerms: [
            "Flutter",
            "React Native",
            "Android Development",
            "iOS Development",
            "Swift",
            "Kotlin"
        ]
    },

    {
        name: "Startups",
        Icon: Briefcase,
        searchTerms: [
            "Startup",
            "Entrepreneurship",
            "Business",
            "Founders",
            "YC",
            "Product Building"
        ]
    },

    {
        name: "Finance",
        Icon: DollarSign,
        searchTerms: [
            "Finance",
            "Investing",
            "Stock Market",
            "Personal Finance",
            "Mutual Funds",
            "Economy"
        ]
    },

    {
        name: "Career",
        Icon: ChartNoAxesCombined,
        searchTerms: [
            "Interview Preparation",
            "Resume",
            "Career Growth",
            "Coding Interview",
            "Remote Jobs",
            "Tech Career"
        ]
    },

    {
        name: "Courses",
        Icon: GraduationCap,
        searchTerms: [
            "Programming Course",
            "AI Course",
            "Data Structures",
            "Algorithms",
            "Tutorial",
            "Bootcamp"
        ]
    },

    {
        name: "Sports",
        Icon: Trophy,
        searchTerms: [
            "Football",
            "Cricket",
            "Formula 1",
            "Basketball",
            "Tennis",
            "Olympics"
        ]
    },

    {
        name: "Fitness",
        Icon: Dumbbell,
        searchTerms: [
            "Workout",
            "Bodybuilding",
            "Gym",
            "Fat Loss",
            "Nutrition",
            "Powerlifting"
        ]
    },

    {
        name: "Music",
        Icon: Music,
        categoryId: 10,
        searchTerms: [
            "Music",
            "Songs",
            "Albums",
            "Live Music",
            "Trending Songs"
        ]
    },

    {
        name: "Movies",
        Icon: Clapperboard,
        searchTerms: [
            "Movies",
            "Movie Review",
            "Movie Trailer",
            "TV Series",
            "Cinema"
        ]
    },

    {
        name: "Gaming",
        Icon: Gamepad2,
        categoryId: 20,
        searchTerms: [
            "Gaming",
            "Minecraft",
            "GTA 6",
            "Valorant",
            "CS2",
            "Esports"
        ]
    },

    {
        name: "News",
        Icon: Newspaper,
        searchTerms: [
            "World News",
            "Technology News",
            "India News",
            "Business News",
            "Breaking News"
        ]
    },

    {
        name: "Podcasts",
        Icon: Podcast,
        searchTerms: [
            "Podcast",
            "Long Form Podcast",
            "Tech Podcast",
            "Business Podcast",
            "AI Podcast"
        ]
    },

    {
        name: "Photography",
        Icon: Camera,
        searchTerms: [
            "Photography",
            "Camera Review",
            "Editing",
            "Lightroom",
            "Cinematography"
        ]
    },

    {
        name: "Design",
        Icon: Palette,
        searchTerms: [
            "UI Design",
            "UX Design",
            "Figma",
            "Graphic Design",
            "Product Design"
        ]
    },

    {
        name: "Science",
        Icon: Microscope,
        searchTerms: [
            "Science",
            "Space",
            "Physics",
            "Chemistry",
            "Biology",
            "Astronomy"
        ]
    },

    {
        name: "History",
        Icon: Landmark,
        searchTerms: [
            "History",
            "Ancient Civilizations",
            "World War",
            "Documentary",
            "Historical Events"
        ]
    },

    {
        name: "Travel",
        Icon: Plane,
        searchTerms: [
            "Travel",
            "Vlog",
            "Tourism",
            "Backpacking",
            "Adventure"
        ]
    },

    {
        name: "Food",
        Icon: UtensilsCrossed,
        searchTerms: [
            "Cooking",
            "Recipe",
            "Street Food",
            "Food Review",
            "Chef"
        ]
    },

    {
        name: "World",
        Icon: Globe,
        searchTerms: [
            "Culture",
            "Countries",
            "Languages",
            "Travel Documentary",
            "Geography"
        ]
    }
];

export const TABS = ["All", "Music", "Mixes", "JavaScript", "Data Structure", "Live", "Presentation", "Body-building", "New to your", "Music", "Mixes", "JavaScript", "Data Structure", "Live", "Presentation"]


