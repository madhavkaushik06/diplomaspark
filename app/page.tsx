"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  GraduationCap,
  HelpCircle,
  Layers3,
  Lightbulb,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";

type Course = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  accent: string;
  soft: string;
  units: string[];
};

type Question = {
  id: string;
  type: string;
  skill: string;
  question: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  xp: number;
};

type ProgressData = Record<string, Record<string, number>>;

const courses: Course[] = [
  {
    id: "math-30-1",
    name: "Math 30-1",
    category: "Math",
    emoji: "📐",
    accent: "from-blue-500 to-indigo-600",
    soft: "from-blue-50 to-indigo-50",
    units: [
      "Transformations & Functions",
      "Trigonometry",
      "Exponential & Logarithmic Functions",
      "Permutations, Combinations & Binomial Theorem",
      "Polynomial, Radical & Rational Functions",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "math-30-2",
    name: "Math 30-2",
    category: "Math",
    emoji: "📊",
    accent: "from-sky-500 to-cyan-600",
    soft: "from-sky-50 to-cyan-50",
    units: [
      "Set Theory & Logic",
      "Probability",
      "Relations & Functions",
      "Polynomial Functions",
      "Trigonometry",
      "Statistics & Data Analysis",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "chemistry-30",
    name: "Chemistry 30",
    category: "Science",
    emoji: "🧪",
    accent: "from-emerald-500 to-teal-600",
    soft: "from-emerald-50 to-teal-50",
    units: [
      "Thermochemical Changes",
      "Electrochemical Changes",
      "Chemical Equilibrium",
      "Acids & Bases",
      "Organic Chemistry",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "physics-30",
    name: "Physics 30",
    category: "Science",
    emoji: "⚡",
    accent: "from-violet-500 to-fuchsia-600",
    soft: "from-violet-50 to-fuchsia-50",
    units: [
      "Momentum & Impulse",
      "Forces & Fields",
      "Electromagnetic Radiation",
      "Atomic Physics",
      "Nuclear Physics",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "biology-30",
    name: "Biology 30",
    category: "Science",
    emoji: "🧬",
    accent: "from-lime-500 to-green-600",
    soft: "from-lime-50 to-green-50",
    units: [
      "Nervous System",
      "Endocrine System",
      "Reproduction & Development",
      "Genetics & Molecular Biology",
      "Population & Community Dynamics",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "science-30",
    name: "Science 30",
    category: "Science",
    emoji: "🔬",
    accent: "from-cyan-500 to-teal-600",
    soft: "from-cyan-50 to-teal-50",
    units: [
      "Living Systems Respond to Environment",
      "Chemistry & the Environment",
      "Electromagnetic Energy",
      "Energy & the Environment",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "ela-30-1",
    name: "ELA 30-1",
    category: "English",
    emoji: "📚",
    accent: "from-amber-500 to-orange-600",
    soft: "from-amber-50 to-orange-50",
    units: [
      "Personal Response",
      "Critical / Analytical Essay",
      "Reading Comprehension",
      "Poetry & Prose Analysis",
      "Thesis & Evidence Building",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "ela-30-2",
    name: "ELA 30-2",
    category: "English",
    emoji: "✍️",
    accent: "from-yellow-500 to-amber-600",
    soft: "from-yellow-50 to-amber-50",
    units: [
      "Visual Reflection",
      "Literary Exploration",
      "Reading Comprehension",
      "Functional Writing",
      "Response Development",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "social-30-1",
    name: "Social 30-1",
    category: "Social",
    emoji: "🌎",
    accent: "from-rose-500 to-pink-600",
    soft: "from-rose-50 to-pink-50",
    units: [
      "Origins of Liberalism",
      "Classical & Modern Liberalism",
      "Ideologies & Political Systems",
      "Source Analysis",
      "Essay / Position Writing",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "social-30-2",
    name: "Social 30-2",
    category: "Social",
    emoji: "🗳️",
    accent: "from-red-500 to-rose-600",
    soft: "from-red-50 to-rose-50",
    units: [
      "Ideology & Identity",
      "Citizenship & Participation",
      "Liberalism in Practice",
      "Source Response",
      "Position Paper",
      "Diploma Mixed Review",
    ],
  },
  {
    id: "french-language-arts-30-1",
    name: "French Language Arts 30-1",
    category: "French",
    emoji: "🇫🇷",
    accent: "from-purple-500 to-violet-600",
    soft: "from-purple-50 to-violet-50",
    units: [
      "Lecture / Reading",
      "Écriture / Writing",
      "Compréhension orale",
      "Analyse de texte",
      "Révision diplôme",
    ],
  },
  {
    id: "francais-30-1",
    name: "Français 30-1",
    category: "French",
    emoji: "📝",
    accent: "from-pink-500 to-violet-600",
    soft: "from-pink-50 to-violet-50",
    units: [
      "Compréhension écrite",
      "Production écrite",
      "Analyse littéraire",
      "Communication orale",
      "Révision diplôme",
    ],
  },
];

const questionBanks: Record<
  string,
  { skills: string[]; questions: [string, string[], number, string][] }
> = {
  "math-30-1": {
    skills: ["Functions", "Trigonometry", "Logs", "Polynomials", "Rational Functions"],
    questions: [
      [
        "Which transformation occurs in y = -2f(x - 3) + 5?",
        [
          "Right 3, vertical stretch by 2, reflection in x-axis, up 5",
          "Left 3, compression by 2, up 5",
          "Right 3 only",
          "Reflection in y-axis and down 5",
        ],
        0,
        "x - 3 moves the graph right, -2 reflects and stretches it, and +5 moves it up.",
      ],
      [
        "For f(x) = log₂(x - 4), what is the domain?",
        ["x > 4", "x ≥ 4", "x < 4", "all real numbers"],
        0,
        "The logarithm input must be positive, so x - 4 > 0.",
      ],
      [
        "If sin θ = 3/5 in Quadrant II, what is cos θ?",
        ["-4/5", "4/5", "-3/5", "5/4"],
        0,
        "Cosine is negative in Quadrant II. Use a 3-4-5 triangle.",
      ],
      [
        "What does a zero of multiplicity 2 usually do on a polynomial graph?",
        ["Touches and turns at the x-axis", "Crosses sharply", "Creates an asymptote", "Removes the y-intercept"],
        0,
        "Even multiplicity usually means the graph touches and turns instead of crossing.",
      ],
      [
        "Which expression is equivalent to log a + log b?",
        ["log(ab)", "log(a + b)", "log(a/b)", "ab log"],
        0,
        "Adding logarithms with the same base becomes the log of a product.",
      ],
    ],
  },
  "math-30-2": {
    skills: ["Probability", "Statistics", "Relations", "Polynomial Models", "Logic"],
    questions: [
      [
        "If two events are mutually exclusive, what is P(A and B)?",
        ["0", "1", "P(A) + P(B)", "P(A)P(B)"],
        0,
        "Mutually exclusive events cannot happen at the same time.",
      ],
      [
        "A correlation coefficient close to -1 means...",
        ["strong negative correlation", "strong positive correlation", "no relationship", "the mean is negative"],
        0,
        "A value close to -1 means a strong negative linear relationship.",
      ],
      [
        "Which measure is most affected by extreme outliers?",
        ["Mean", "Median", "Mode", "Interquartile range"],
        0,
        "The mean uses every data value, so extreme numbers can pull it up or down.",
      ],
      [
        "If an event has probability 0.25, the odds in favour are...",
        ["1:3", "3:1", "1:4", "4:1"],
        0,
        "Odds in favour compare success to failure: 0.25 to 0.75 = 1:3.",
      ],
      [
        "In set notation, A ∩ B means...",
        ["elements in both A and B", "elements in A or B", "elements not in A", "all possible elements"],
        0,
        "The intersection means the overlap between two sets.",
      ],
    ],
  },
  "chemistry-30": {
    skills: ["Enthalpy", "Redox", "Equilibrium", "pH", "Organic Chemistry"],
    questions: [
      [
        "For an exothermic reaction, ΔH is usually...",
        ["negative", "positive", "zero", "equal to activation energy"],
        0,
        "Exothermic reactions release energy, so the enthalpy change is negative.",
      ],
      [
        "Which change would shift N₂(g) + 3H₂(g) ⇌ 2NH₃(g) to the right?",
        ["Adding H₂", "Removing N₂", "Adding NH₃", "Decreasing pressure"],
        0,
        "Adding a reactant pushes equilibrium toward the products.",
      ],
      [
        "A solution with pH = 3 is...",
        ["acidic", "basic", "neutral", "impossible"],
        0,
        "A pH below 7 is acidic.",
      ],
      [
        "Oxidation means...",
        ["loss of electrons", "gain of electrons", "loss of protons", "gain of neutrons"],
        0,
        "OIL RIG: Oxidation Is Loss, Reduction Is Gain.",
      ],
      [
        "Which organic family contains the -OH functional group?",
        ["Alcohols", "Alkanes", "Carboxylic acids", "Esters"],
        0,
        "Alcohols contain the hydroxyl group, -OH.",
      ],
    ],
  },
  "physics-30": {
    skills: ["Momentum", "Fields", "EM Radiation", "Atomic Physics", "Nuclear Physics"],
    questions: [
      [
        "Momentum is calculated using...",
        ["p = mv", "F = ma", "E = hf", "V = IR"],
        0,
        "Momentum equals mass times velocity.",
      ],
      [
        "An electric field points in the direction a ___ charge would move.",
        ["positive", "negative", "neutral", "magnetic"],
        0,
        "Electric field direction is defined using a positive test charge.",
      ],
      [
        "Increasing frequency of light in the photoelectric effect increases the emitted electron's...",
        ["maximum kinetic energy", "mass", "charge", "rest energy"],
        0,
        "Higher frequency means higher photon energy.",
      ],
      [
        "A charged particle moving perpendicular to a magnetic field experiences...",
        ["maximum magnetic force", "zero force", "gravitational force only", "no acceleration"],
        0,
        "Magnetic force is strongest when velocity is perpendicular to the magnetic field.",
      ],
      [
        "In a nuclear equation, which quantity must be conserved?",
        ["mass number and charge", "temperature only", "speed only", "colour"],
        0,
        "Nuclear equations conserve mass number and charge.",
      ],
    ],
  },
  default: {
    skills: ["Reading", "Analysis", "Application", "Review", "Exam Strategy"],
    questions: [
      [
        "What is the best first step when preparing for a diploma-style question?",
        ["Identify the topic and what is being asked", "Guess quickly", "Skip instructions", "Only read the answer choices"],
        0,
        "Understanding the task first helps you choose the correct strategy.",
      ],
      [
        "What makes practice most effective?",
        ["Doing questions and checking explanations", "Only reading notes", "Avoiding all mistakes", "Studying without breaks"],
        0,
        "Practice works best when you review feedback and fix weak spots.",
      ],
      [
        "A good study plan should be...",
        ["realistic and organized", "random", "done only the night before", "based only on easy topics"],
        0,
        "A realistic plan is easier to follow consistently.",
      ],
      [
        "When you get a question wrong, you should first...",
        ["review why the correct answer works", "ignore it", "memorize only the letter", "quit the quiz"],
        0,
        "Mistakes are useful when you understand what caused them.",
      ],
      [
        "A strong review session should include...",
        ["practice, feedback, and correction", "only highlighting", "only scrolling notes", "no breaks ever"],
        0,
        "The best learning comes from active practice and correction.",
      ],
    ],
  },
};

function generateQuestions(course: Course, unit: string): Question[] {
  const bank = questionBanks[course.id] || questionBanks.default;

  return Array.from({ length: 20 }, (_, index) => {
    const base = bank.questions[index % bank.questions.length];
    const skill = bank.skills[index % bank.skills.length];

    return {
      id: `${course.id}-${unit}-${index}`,
      type: index % 3 === 0 ? "Diploma-style" : index % 3 === 1 ? "Concept Check" : "Application",
      skill,
      question:
        index < bank.questions.length
          ? base[0]
          : `${base[0]} (${unit} review ${Math.floor(index / bank.questions.length) + 1})`,
      options: base[1],
      answer: base[2],
      hint: `Focus on ${skill}. Eliminate answers that do not match the main idea.`,
      explanation: base[3],
      xp: index % 3 === 0 ? 20 : 15,
    };
  });
}

function Button({
  children,
  onClick,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "bg-slate-950 text-white hover:bg-slate-800"
      : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50";

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-black transition ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [view, setView] = useState<"home" | "courses" | "course" | "quiz">("home");
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[2]);
  const [selectedUnit, setSelectedUnit] = useState<string>(courses[2].units[0]);
  const [difficulty, setDifficulty] = useState("Diploma-style");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [search, setSearch] = useState("");
  const [progressData, setProgressData] = useState<ProgressData>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem("diplomaspark-progress");
    const savedXp = localStorage.getItem("diplomaspark-xp");
    const savedStreak = localStorage.getItem("diplomaspark-streak");

    if (savedProgress) setProgressData(JSON.parse(savedProgress));
    if (savedXp) setXp(Number(savedXp));
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  useEffect(() => {
    localStorage.setItem("diplomaspark-progress", JSON.stringify(progressData));
    localStorage.setItem("diplomaspark-xp", String(xp));
    localStorage.setItem("diplomaspark-streak", String(streak));
  }, [progressData, xp, streak]);

  const questions = useMemo(
    () => generateQuestions(selectedCourse, selectedUnit),
    [selectedCourse, selectedUnit]
  );

  const currentQuestion = questions[current];
  const score = answers.filter((answer, index) => answer === questions[index]?.answer).length;
  const finished = current >= questions.length;

  const filteredCourses = courses.filter((course) =>
    `${course.name} ${course.category}`.toLowerCase().includes(search.toLowerCase())
  );

  function getUnitMastery(courseId: string, unit: string) {
    return progressData[courseId]?.[unit] || 0;
  }

  function getCourseMastery(course: Course) {
    const total = course.units.reduce((sum, unit) => sum + getUnitMastery(course.id, unit), 0);
    return Math.round(total / course.units.length);
  }

  function saveQuizMastery() {
    const percent = Math.round((score / questions.length) * 100);

    setProgressData((old) => {
      const currentBest = old[selectedCourse.id]?.[selectedUnit] || 0;
      const updatedBest = Math.max(currentBest, percent);

      return {
        ...old,
        [selectedCourse.id]: {
          ...(old[selectedCourse.id] || {}),
          [selectedUnit]: updatedBest,
        },
      };
    });
  }

  function chooseCourse(course: Course) {
    setSelectedCourse(course);
    setSelectedUnit(course.units[0]);
    setCurrent(0);
    setAnswers([]);
    setShowHint(false);
    setShowResult(false);
    setView("course");
  }

  function startQuiz(unit = selectedUnit) {
    setSelectedUnit(unit);
    setCurrent(0);
    setAnswers([]);
    setShowHint(false);
    setShowResult(false);
    setView("quiz");
  }

  function selectAnswer(index: number) {
    if (answers[current] !== undefined) return;

    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
    setShowResult(true);

    if (index === currentQuestion.answer) {
      setXp((old) => old + currentQuestion.xp);
      setStreak((old) => old + 1);
    } else {
      setStreak(0);
    }
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      saveQuizMastery();
    }

    setShowHint(false);
    setShowResult(false);
    setCurrent((old) => old + 1);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f3] text-slate-950">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-slate-200/60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-stone-200/50 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8f3]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <button onClick={() => setView("home")} className="flex items-center gap-3 text-left">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">DiplomaSpark</h1>
              <p className="text-xs font-semibold text-slate-500">
                Alberta diploma practice that feels organized.
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-2 rounded-full bg-white p-1 shadow-sm md:flex">
            {["home", "courses", "course"].map((item) => (
              <button
                key={item}
                onClick={() => setView(item as "home" | "courses" | "course")}
                className={`rounded-full px-4 py-2 text-sm font-bold capitalize ${
                  view === item ? "bg-slate-950 text-white" : "text-slate-600"
                }`}
              >
                {item === "course" ? "Path" : item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-black shadow-sm sm:flex sm:items-center sm:gap-2">
              <Flame className="h-4 w-4 text-orange-500" /> {streak} streak
            </div>
            <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">
              {xp} XP
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-8"
            >
              <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
                  <div className="mb-5 inline-flex rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-200">
                    Guided practice • instant feedback • unit progress
                  </div>

                  <h2 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
                    A cleaner way to prepare for Alberta diploma exams.
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                    Work through course units, answer focused practice sets, get hints when you
                    need them, and track what still needs review.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={() => setView("courses")}
                      className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-50"
                    >
                      Start learning <ArrowRight className="ml-2 h-5 w-5" />
                    </button>

                    <button
                      onClick={() => startQuiz()}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/15"
                    >
                      Quick practice <Play className="ml-2 h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
                    {[
                      ["12", "diploma courses"],
                      ["20", "questions per quiz"],
                      ["Fast", "feedback"],
                    ].map(([big, small]) => (
                      <div key={small} className="rounded-3xl bg-white/10 p-4">
                        <p className="text-2xl font-black">{big}</p>
                        <p className="text-xs font-semibold text-slate-300">{small}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[2rem] bg-white p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-500">Today&apos;s challenge</p>
                        <h3 className="text-2xl font-black">Keep your streak going</h3>
                      </div>
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600">
                        <Flame className="h-7 w-7" />
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                      Complete one 20-question quiz to earn XP and raise your mastery.
                    </p>
                    <Button onClick={() => startQuiz()} className="mt-5 w-full">
                      Start challenge
                    </Button>
                  </div>

                  <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-xl">
                    <Award className="mb-3 h-9 w-9" />
                    <h3 className="text-xl font-black">Level {Math.floor(xp / 300) + 1} Scholar</h3>
                    <p className="text-sm font-semibold text-emerald-50">
                      {300 - (xp % 300)} XP until next level
                    </p>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/25">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${(xp % 300) / 3}%` }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] bg-white p-6 shadow-lg">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-emerald-600">Featured courses</p>
                    <h3 className="text-2xl font-black">Choose your next practice path</h3>
                  </div>
                  <Button onClick={() => setView("courses")} variant="outline">
                    View all
                  </Button>
                </div>

                <CourseGrid
                  courses={courses.slice(0, 6)}
                  chooseCourse={chooseCourse}
                  getCourseMastery={getCourseMastery}
                />
              </section>
            </motion.section>
          )}

          {view === "courses" && (
            <motion.section
              key="courses"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-6"
            >
              <div className="flex flex-col justify-between gap-4 rounded-[2rem] bg-white p-6 shadow-lg md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-black text-emerald-600">All Alberta diploma courses</p>
                  <h2 className="text-4xl font-black tracking-tight">
                    Pick a course. Build mastery.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Each course has unit paths, 20-question practice sets, hints, instant marking,
                    and explanations.
                  </p>
                </div>

                <div className="relative min-w-full md:min-w-[320px]">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <CourseGrid
                courses={filteredCourses}
                chooseCourse={chooseCourse}
                getCourseMastery={getCourseMastery}
              />
            </motion.section>
          )}

          {view === "course" && (
            <motion.section
              key="course"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-6"
            >
              <div
                className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${selectedCourse.accent} p-8 text-white shadow-2xl`}
              >
                <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black">
                  {selectedCourse.emoji} {selectedCourse.category} pathway
                </div>
                <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                  {selectedCourse.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">
                  Follow a clear mastery path with unit quizzes, instant feedback, guided hints,
                  and skill-based explanations.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => startQuiz(selectedCourse.units[0])}
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-white/90"
                  >
                    Start first unit <Play className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div className="rounded-[2rem] bg-white p-6 shadow-lg">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-emerald-600">Mastery path</p>
                      <h3 className="text-2xl font-black">Units in {selectedCourse.name}</h3>
                    </div>
                    <Layers3 className="h-6 w-6 text-emerald-600" />
                  </div>

                  <div className="space-y-4">
                    {selectedCourse.units.map((unit, index) => {
                      const unitProgress = getUnitMastery(selectedCourse.id, unit);

                      return (
                        <button
                          key={unit}
                          onClick={() => startQuiz(unit)}
                          className="group grid w-full gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:bg-white hover:shadow-lg md:grid-cols-[56px_1fr_130px] md:items-center"
                        >
                          <div
                            className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${selectedCourse.accent} text-xl font-black text-white`}
                          >
                            {index + 1}
                          </div>

                          <div>
                            <h4 className="text-lg font-black">{unit}</h4>
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                              20 questions • hints • explanations
                            </p>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${selectedCourse.accent}`}
                                style={{ width: `${unitProgress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
                            <div>
                              <p className="text-xs font-black text-slate-400">MASTERY</p>
                              <p className="text-xl font-black">{unitProgress}%</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <aside className="space-y-5">
                  <div className="rounded-[2rem] bg-white p-6 shadow-lg">
                    <BookOpen className="mb-3 h-7 w-7 text-emerald-600" />
                    <h3 className="text-xl font-black">Practice settings</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Choose how intense the practice should feel.
                    </p>

                    <div className="mt-4 grid gap-2">
                      {["Easy", "Diploma-style", "Hard"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`rounded-2xl px-4 py-3 text-left text-sm font-black ${
                            difficulty === level
                              ? "bg-slate-950 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
                    <ShieldCheck className="mb-4 h-8 w-8 text-emerald-300" />
                    <h3 className="text-xl font-black">Platform rule</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Use original practice questions. Do not copy secured diploma exam material.
                    </p>
                  </div>
                </aside>
              </div>
            </motion.section>
          )}

          {view === "quiz" && (
            <motion.section
              key="quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {finished ? (
                <Results
                  score={score}
                  total={questions.length}
                  course={selectedCourse}
                  unit={selectedUnit}
                  setView={setView}
                  retry={() => startQuiz(selectedUnit)}
                />
              ) : (
                <Quiz
                  course={selectedCourse}
                  unit={selectedUnit}
                  difficulty={difficulty}
                  question={currentQuestion}
                  current={current}
                  total={questions.length}
                  answers={answers}
                  score={score}
                  showHint={showHint}
                  showResult={showResult}
                  selectAnswer={selectAnswer}
                  setShowHint={setShowHint}
                  nextQuestion={nextQuestion}
                  setView={setView}
                />
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function CourseGrid({
  courses,
  chooseCourse,
  getCourseMastery,
}: {
  courses: Course[];
  chooseCourse: (course: Course) => void;
  getCourseMastery: (course: Course) => number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const mastery = getCourseMastery(course);

        return (
          <motion.button
            key={course.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => chooseCourse(course)}
            className={`overflow-hidden rounded-[1.8rem] border border-white bg-gradient-to-br ${course.soft} p-5 text-left shadow-md transition hover:shadow-xl`}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${course.accent} text-2xl text-white shadow-lg`}
              >
                {course.emoji}
              </div>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-slate-600">
                {course.category}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-black">{course.name}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              {course.units.length} units • 20-question sets
            </p>

            <div className="mt-5">
              <div className="flex justify-between text-xs font-black text-slate-500">
                <span>Mastery</span>
                <span>{mastery}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${course.accent}`}
                  style={{ width: `${mastery}%` }}
                />
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function Quiz({
  course,
  unit,
  difficulty,
  question,
  current,
  total,
  answers,
  score,
  showHint,
  showResult,
  selectAnswer,
  setShowHint,
  nextQuestion,
  setView,
}: {
  course: Course;
  unit: string;
  difficulty: string;
  question: Question;
  current: number;
  total: number;
  answers: number[];
  score: number;
  showHint: boolean;
  showResult: boolean;
  selectAnswer: (index: number) => void;
  setShowHint: (value: boolean) => void;
  nextQuestion: () => void;
  setView: (view: "course") => void;
}) {
  const answered = answers[current] !== undefined;
  const progress = Math.round(((current + 1) / total) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setView("course")}
              className="mb-2 text-sm font-black text-emerald-600"
            >
              ← Back to {course.name}
            </button>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{unit}</h2>
            <p className="text-sm font-bold text-slate-500">
              {difficulty} • {question.type} • Skill: {question.skill}
            </p>
          </div>

          <div className={`rounded-3xl bg-gradient-to-br ${course.accent} px-5 py-4 text-white`}>
            <p className="text-xs font-black text-white/75">QUESTION</p>
            <p className="text-2xl font-black">
              {current + 1}/{total}
            </p>
          </div>
        </div>

        <div className="mb-8 h-4 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${course.accent}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="rounded-[1.7rem] bg-slate-950 p-6 text-white shadow-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
            <BookOpen className="h-3.5 w-3.5" /> Practice question
          </div>
          <h3 className="text-xl font-black leading-8 sm:text-2xl">{question.question}</h3>
        </div>

        <div className="mt-5 grid gap-3">
          {question.options.map((option, index) => {
            const selected = answers[current] === index;
            const correct = question.answer === index;

            return (
              <button
                key={option}
                onClick={() => selectAnswer(index)}
                className={`flex items-center justify-between rounded-3xl border p-5 text-left text-sm font-black transition ${
                  answered && correct
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : answered && selected && !correct
                    ? "border-red-300 bg-red-50 text-red-800"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                <span>
                  <span className="mr-3 inline-grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-xs text-slate-700">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>

                {answered && correct && <CheckCircle2 className="h-6 w-6" />}
                {answered && selected && !correct && <XCircle className="h-6 w-6" />}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setShowHint(!showHint)}>
            <Lightbulb className="mr-2 h-5 w-5" /> {showHint ? "Hide hint" : "Use hint"}
          </Button>

          {answered && (
            <Button onClick={nextQuestion}>
              {current === total - 1 ? "Finish quiz" : "Next question"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>

        {showHint && (
          <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-6 text-amber-900">
            <div className="mb-1 flex items-center gap-2 font-black">
              <HelpCircle className="h-5 w-5" /> Hint
            </div>
            {question.hint}
          </div>
        )}

        {showResult && (
          <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
            <div className="mb-1 flex items-center gap-2 font-black">
              <BookOpen className="h-5 w-5" /> Explanation
            </div>
            {question.explanation}
          </div>
        )}
      </div>

      <aside className="space-y-5">
        <div className="rounded-[2rem] bg-white p-6 shadow-lg">
          <h3 className="text-xl font-black">Quiz stats</h3>

          <div className="mt-5 grid gap-3">
            <Stat icon={<Target />} label="Progress" value={`${progress}%`} />
            <Stat icon={<CheckCircle2 />} label="Correct" value={`${score}`} />
            <Stat icon={<Star />} label="Question XP" value={`+${question.xp}`} />
          </div>
        </div>

        <div className={`rounded-[2rem] bg-gradient-to-br ${course.soft} p-6 shadow-lg`}>
          <Trophy className="mb-4 h-8 w-8 text-slate-800" />
          <h3 className="text-xl font-black">Mastery goal</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Score 16/20 or higher to mark this unit as strong.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Results({
  score,
  total,
  course,
  unit,
  setView,
  retry,
}: {
  score: number;
  total: number;
  course: Course;
  unit: string;
  setView: (view: "course") => void;
  retry: () => void;
}) {
  const percent = Math.round((score / total) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="flex min-h-[560px] flex-col items-center justify-center rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <div className="mb-6 text-7xl">{percent >= 80 ? "🏆" : percent >= 60 ? "🔥" : "💪"}</div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
          Quiz complete
        </p>
        <h2 className="mt-2 text-5xl font-black tracking-tight">{percent}%</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
          You scored <span className="font-black text-slate-950">{score}/{total}</span> in{" "}
          {course.name} • {unit}. This score is now saved as your unit mastery if it is your best
          attempt.
        </p>

        <div className="mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-3">
          <Stat icon={<Trophy />} label="Score" value={`${score}/${total}`} />
          <Stat icon={<Award />} label="XP earned" value={`+${score * 15}`} />
          <Stat icon={<Target />} label="Unit mastery" value={`${percent}%`} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={retry}>
            <RotateCcw className="mr-2 h-5 w-5" /> Retry quiz
          </Button>
          <Button onClick={() => setView("course")} variant="outline">
            Back to path
          </Button>
        </div>
      </div>

      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
        <h3 className="text-2xl font-black">Study coach</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Review the questions you missed, then try a similar set to improve your score.
        </p>

        <div className="mt-6 space-y-3">
          {["Review incorrect answers", "Try similar questions", "Complete another unit", "Build a study plan"].map(
            (item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <span className="text-sm font-bold">{item}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl bg-slate-50 p-4 text-left">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-800 shadow-sm">
        <div className="h-5 w-5">{icon}</div>
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-lg font-black text-slate-950">{value}</p>
      </div>
    </div>
  );
}