"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Search,
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
  image: string;
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
    accent: "from-blue-600 to-indigo-700",
    soft: "from-blue-50 to-indigo-50",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-sky-600 to-cyan-700",
    soft: "from-sky-50 to-cyan-50",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-emerald-600 to-teal-700",
    soft: "from-emerald-50 to-teal-50",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-violet-600 to-fuchsia-700",
    soft: "from-violet-50 to-fuchsia-50",
    image:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-lime-600 to-green-700",
    soft: "from-lime-50 to-green-50",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-cyan-600 to-teal-700",
    soft: "from-cyan-50 to-teal-50",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-amber-600 to-orange-700",
    soft: "from-amber-50 to-orange-50",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-yellow-600 to-amber-700",
    soft: "from-yellow-50 to-amber-50",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-rose-600 to-pink-700",
    soft: "from-rose-50 to-pink-50",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-red-600 to-rose-700",
    soft: "from-red-50 to-rose-50",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-purple-600 to-violet-700",
    soft: "from-purple-50 to-violet-50",
    image:
      "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=900&q=80",
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
    accent: "from-pink-600 to-violet-700",
    soft: "from-pink-50 to-violet-50",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
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
  { skills: string[]; questions: [string, string[], number, string, string][] }
> = {
  "chemistry-30": {
    skills: ["Equilibrium", "pH", "Redox", "Thermochemistry", "Organic Chemistry"],
    questions: [
      [
        "A student adds more H₂(g) to the system N₂(g) + 3H₂(g) ⇌ 2NH₃(g). What happens immediately after the stress is applied?",
        ["The system shifts right to use up H₂", "The system shifts left to produce H₂", "The value of K changes", "The reaction stops"],
        0,
        "Adding a reactant causes the system to shift toward the products to reduce the stress.",
        "K does not change when concentration changes. Only temperature changes K.",
      ],
      [
        "A 0.010 mol/L HCl solution is diluted 100 times. What is the new pH?",
        ["4.00", "2.00", "1.00", "12.00"],
        0,
        "Diluting 0.010 mol/L by 100 gives 0.00010 mol/L H⁺, so pH = 4.00.",
        "Watch the powers of ten. A 100× dilution increases pH by 2 for a strong acid.",
      ],
      [
        "In the reaction Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), which species is oxidized?",
        ["Zn(s)", "Cu²⁺(aq)", "Zn²⁺(aq)", "Cu(s)"],
        0,
        "Zinc loses electrons and becomes Zn²⁺, so zinc is oxidized.",
        "Oxidation is loss of electrons. Check which charge increases.",
      ],
      [
        "A reaction has ΔH = -84 kJ. Which statement is correct?",
        ["The reaction is exothermic", "The reaction absorbs heat", "Products have more enthalpy than reactants", "The activation energy is -84 kJ"],
        0,
        "A negative enthalpy change means energy is released to the surroundings.",
        "ΔH describes overall energy change, not activation energy.",
      ],
      [
        "Which compound is most likely an ester?",
        ["CH₃COOCH₂CH₃", "CH₃CH₂OH", "CH₃COOH", "CH₄"],
        0,
        "Esters contain the -COO- linkage between carbon groups.",
        "Look for the carbonyl attached to an oxygen bonded to another carbon.",
      ],
      [
        "At equilibrium, a closed system has...",
        ["equal forward and reverse reaction rates", "equal reactant and product amounts", "no particle collisions", "a reaction that has stopped"],
        0,
        "Equilibrium is dynamic: both reactions continue at equal rates.",
        "Equal rates does not always mean equal concentrations.",
      ],
    ],
  },
  "physics-30": {
    skills: ["Momentum", "Fields", "Photoelectric Effect", "Magnetic Force", "Nuclear Physics"],
    questions: [
      [
        "A 0.145 kg baseball moving at 38.0 m/s is brought to rest in 0.0120 s. What is the magnitude of the average force?",
        ["459 N", "5.51 N", "31.4 N", "0.0458 N"],
        0,
        "Impulse equals change in momentum: FΔt = mΔv. F = (0.145 × 38.0) / 0.0120 = 459 N.",
        "This is a multi-step momentum question. Use change in velocity, not just velocity.",
      ],
      [
        "Two parallel plates create a uniform electric field. A positive test charge released between the plates moves...",
        ["in the direction of the electric field", "opposite the electric field", "in a circle", "only if it is neutral"],
        0,
        "Electric field direction is defined by the direction a positive test charge would move.",
        "Negative charges move opposite the field, but positive test charges define the field.",
      ],
      [
        "Light of frequency 7.50 × 10¹⁴ Hz strikes a metal with work function 2.10 eV. What happens if the frequency is increased?",
        ["The maximum kinetic energy of emitted electrons increases", "The electron charge increases", "The work function increases", "No electrons can be emitted"],
        0,
        "Higher frequency means higher photon energy, so leftover kinetic energy increases.",
        "The work function is a property of the metal and does not change with light frequency.",
      ],
      [
        "A charged particle enters a magnetic field perpendicular to its velocity. The magnetic force is...",
        ["perpendicular to both velocity and field", "parallel to velocity", "opposite gravity only", "zero"],
        0,
        "Magnetic force is perpendicular to both the velocity and magnetic field directions.",
        "Use the right-hand rule for the direction, but the key idea is perpendicular force.",
      ],
      [
        "In a nuclear equation, the total mass number and atomic number must be...",
        ["conserved", "converted into temperature", "ignored", "equal to zero"],
        0,
        "Nuclear equations conserve nucleon number and charge.",
        "Balance the top numbers and bottom numbers separately.",
      ],
      [
        "A cart doubles its velocity while mass stays constant. Its momentum...",
        ["doubles", "quadruples", "halves", "stays the same"],
        0,
        "Momentum is p = mv, so if velocity doubles, momentum doubles.",
        "Kinetic energy would quadruple, but momentum only doubles.",
      ],
    ],
  },
  "math-30-1": {
    skills: ["Transformations", "Logarithms", "Trigonometry", "Polynomials", "Rational Functions"],
    questions: [
      [
        "For y = -3f(2(x - 4)) + 7, which transformation is correct?",
        ["Right 4, horizontal compression by 1/2, reflection in x-axis, vertical stretch by 3, up 7", "Left 4, horizontal stretch by 2, up 7", "Right 4 only", "Reflection in y-axis only"],
        0,
        "Inside transformations affect x oppositely. The 2 causes horizontal compression by 1/2, and -3 reflects/stretches vertically.",
        "Work from inside the function outward.",
      ],
      [
        "Solve log₂(x - 1) + log₂(x + 3) = 3.",
        ["x = 3", "x = -5", "x = 1", "x = 8"],
        0,
        "Combine logs: log₂((x - 1)(x + 3)) = 3, so (x - 1)(x + 3) = 8. This gives x = 3 or -5, but -5 is extraneous.",
        "Always check log restrictions.",
      ],
      [
        "If sin θ = 5/13 and θ is in Quadrant II, what is tan θ?",
        ["-5/12", "5/12", "-12/5", "12/5"],
        0,
        "In Quadrant II, sine is positive and cosine is negative. Using a 5-12-13 triangle, tan = -5/12.",
        "Check quadrant signs before choosing.",
      ],
      [
        "A polynomial has zeros x = -2, x = 1, and x = 1. What is the minimum possible degree?",
        ["3", "2", "1", "4"],
        0,
        "The repeated zero x = 1 counts twice, so the minimum degree is 3.",
        "Multiplicity counts toward degree.",
      ],
      [
        "What restriction applies to f(x) = (x + 4)/(x² - 9)?",
        ["x ≠ 3, -3", "x ≠ 4", "x ≠ 0", "x ≥ 3"],
        0,
        "The denominator cannot be zero. x² - 9 = 0 gives x = ±3.",
        "Restrictions come from the denominator, not the numerator.",
      ],
      [
        "Which expression is equivalent to 2log(x) - log(y)?",
        ["log(x²/y)", "log(2x - y)", "log(x²y)", "log(2x/y)"],
        0,
        "Use the power rule first: 2log(x) = log(x²), then subtracting logs divides.",
        "Log rules are not the same as normal algebra.",
      ],
    ],
  },
  "biology-30": {
    skills: ["Neurons", "Hormones", "Genetics", "Reproduction", "Population Change"],
    questions: [
      [
        "A neuron is stimulated, but the stimulus is below threshold. What happens?",
        ["No action potential occurs", "A smaller action potential occurs", "The neuron fires twice", "The neuron releases insulin"],
        0,
        "Action potentials follow an all-or-none response. Below threshold means no action potential.",
        "There is no such thing as a half-strength action potential.",
      ],
      [
        "If blood glucose rises after a meal, which hormone is most directly released to lower it?",
        ["Insulin", "Glucagon", "Adrenaline", "FSH"],
        0,
        "Insulin helps cells take up glucose and lowers blood glucose.",
        "Glucagon raises blood glucose.",
      ],
      [
        "A heterozygous tall pea plant is crossed with a short pea plant. If tall is dominant, what is the expected phenotype ratio?",
        ["1 tall : 1 short", "3 tall : 1 short", "all tall", "all short"],
        0,
        "Tt × tt produces 50% Tt and 50% tt.",
        "This is a test cross.",
      ],
      [
        "During transcription, the cell produces...",
        ["mRNA from DNA", "DNA from protein", "protein from mRNA", "glucose from oxygen"],
        0,
        "Transcription copies DNA information into mRNA.",
        "Translation makes protein from mRNA.",
      ],
      [
        "A population growing with unlimited resources would show...",
        ["exponential growth", "zero growth", "carrying capacity immediately", "only negative growth"],
        0,
        "Unlimited resources can cause exponential growth.",
        "Logistic growth happens when resources become limiting.",
      ],
    ],
  },
  "ela-30-1": {
    skills: ["Theme", "Thesis", "Tone", "Evidence", "Analysis"],
    questions: [
      [
        "Which thesis is strongest for a critical essay about ambition?",
        ["Literature often shows that unchecked ambition can damage relationships and identity.", "Ambition is in many stories.", "This essay is about ambition.", "The character wanted things."],
        0,
        "The strongest thesis makes a clear, arguable claim with depth.",
        "A thesis should not just name the topic.",
      ],
      [
        "A writer describes a room as 'silent, untouched, and waiting.' What is most likely being created?",
        ["A tense or expectant mood", "A comedic tone", "A scientific explanation", "A direct argument"],
        0,
        "The diction creates a feeling of stillness and tension.",
        "Mood is the feeling created for the reader.",
      ],
      [
        "Which evidence integration is strongest?",
        ["The image of the locked door suggests emotional isolation because the character avoids connection.", "There is a locked door.", "The author uses stuff.", "This proves my point."],
        0,
        "Strong evidence is connected to interpretation and the argument.",
        "Never drop evidence without explaining why it matters.",
      ],
      [
        "In a personal response, the most important connection to the prompt should be...",
        ["clear and reflective", "hidden until the last sentence", "unrelated but emotional", "only a plot summary"],
        0,
        "A strong personal response connects experience to the prompt with reflection.",
        "Personal writing still needs focus.",
      ],
      [
        "A symbol differs from a regular object because it...",
        ["carries a deeper meaning beyond itself", "must appear only once", "has no connection to theme", "is always obvious"],
        0,
        "Symbols represent larger ideas, emotions, or conflicts.",
        "A symbol can be subtle.",
      ],
    ],
  },
  "social-30-1": {
    skills: ["Liberalism", "Ideology", "Source Analysis", "Individualism", "Collectivism"],
    questions: [
      [
        "A source argues that government should protect individual freedoms and limit interference in the economy. This most closely reflects...",
        ["classical liberalism", "communism", "fascism", "ultranationalism"],
        0,
        "Classical liberalism emphasizes individual rights, private property, and limited government.",
        "Look for ideas about individual freedom and limited state control.",
      ],
      [
        "A policy that increases taxes to fund universal healthcare is most connected to...",
        ["modern liberalism", "laissez-faire capitalism", "absolute monarchy", "anarchism"],
        0,
        "Modern liberalism accepts more government involvement to promote equality of opportunity.",
        "Modern liberalism is not the same as classical liberalism.",
      ],
      [
        "When analyzing a political cartoon, the first thing you should identify is...",
        ["the perspective or message", "the number of colours", "the artist's handwriting", "the size of the image"],
        0,
        "Source analysis starts by figuring out the message or viewpoint.",
        "Details matter, but only after you understand the main message.",
      ],
      [
        "Collectivism places more emphasis on...",
        ["the common good", "absolute individual self-interest", "no government ever", "private profit only"],
        0,
        "Collectivism prioritizes group welfare and shared responsibility.",
        "This does not always mean total government control.",
      ],
      [
        "A strong Social 30-1 position response should...",
        ["take a clear position and support it with evidence", "avoid taking a side", "only define terms", "repeat the source without analysis"],
        0,
        "Diploma writing requires a clear argument with relevant support.",
        "Do not just summarize the source.",
      ],
    ],
  },
  default: {
    skills: ["Reading", "Analysis", "Application", "Review", "Exam Strategy"],
    questions: [
      [
        "A student keeps getting questions wrong even after reading notes. What should they do next?",
        ["Review mistakes and practise similar questions", "Only reread the same page", "Avoid difficult topics", "Stop checking answers"],
        0,
        "Improvement usually comes from active correction and targeted practice.",
        "Passive studying feels easier but often does less.",
      ],
      [
        "Which study method is strongest before a diploma-style exam?",
        ["Timed practice with review", "Highlighting every page", "Only watching videos", "Studying one topic once"],
        0,
        "Timed practice builds both content knowledge and exam stamina.",
        "You need to practise recall, not just recognition.",
      ],
      [
        "A good explanation should include...",
        ["why the correct answer works and why the mistake happened", "only the answer letter", "no reasoning", "a longer question"],
        0,
        "Useful feedback teaches the reasoning behind the answer.",
        "The goal is understanding, not just marking.",
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
      type:
        index % 4 === 0
          ? "Exam-style"
          : index % 4 === 1
          ? "Application"
          : index % 4 === 2
          ? "Concept Check"
          : "Challenge",
      skill,
      question:
        index < bank.questions.length
          ? base[0]
          : `${base[0]} (${unit} review set ${Math.floor(index / bank.questions.length) + 1})`,
      options: base[1],
      answer: base[2],
      explanation: base[3],
      hint: base[4],
      xp: index % 4 === 3 ? 25 : 15,
    };
  });
}

function AppButton({
  children,
  onClick,
  variant = "dark",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "dark" | "light" | "outline";
  className?: string;
}) {
  const styles =
    variant === "light"
      ? "bg-white text-slate-950 hover:bg-stone-100"
      : variant === "outline"
      ? "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
      : "bg-slate-950 text-white hover:bg-slate-800";

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition active:scale-[0.98] ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [view, setView] = useState<"home" | "courses" | "course" | "quiz">("home");
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[2]);
  const [selectedUnit, setSelectedUnit] = useState<string>(courses[2].units[0]);
  const [difficulty, setDifficulty] = useState("Exam-style");
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
      return {
        ...old,
        [selectedCourse.id]: {
          ...(old[selectedCourse.id] || {}),
          [selectedUnit]: Math.max(currentBest, percent),
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
    if (current === questions.length - 1) saveQuizMastery();
    setShowHint(false);
    setShowResult(false);
    setCurrent((old) => old + 1);
  }

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#f6f3ec]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <button onClick={() => setView("home")} className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-black tracking-tight">DiplomaSpark</h1>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {[
              ["home", "Home"],
              ["courses", "Courses"],
              ["course", "My path"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setView(id as "home" | "courses" | "course")}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  view === id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm sm:flex sm:items-center sm:gap-2">
              <Flame className="h-4 w-4 text-orange-500" /> {streak}
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              className="space-y-10"
            >
              <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="rounded-[2.25rem] bg-slate-950 p-7 text-white shadow-2xl sm:p-10">
                  <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-stone-200">
                    Built around Alberta diploma courses
                  </div>

                  <h2 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl">
                    Practice that feels closer to the real exam.
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
                    Choose a diploma course, work through units, answer tougher practice questions,
                    and track your best score by topic.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <AppButton onClick={() => setView("courses")} variant="light">
                      Start learning <ArrowRight className="ml-2 h-5 w-5" />
                    </AppButton>

                    <AppButton onClick={() => startQuiz()} className="border border-white/20 bg-white/10">
                      Quick practice <Play className="ml-2 h-5 w-5" />
                    </AppButton>
                  </div>

                  <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
                    {[
                      ["12", "courses"],
                      ["20", "questions"],
                      ["Unit", "mastery"],
                    ].map(([big, small]) => (
                      <div key={small} className="rounded-3xl bg-white/10 p-4">
                        <p className="text-2xl font-black">{big}</p>
                        <p className="text-xs font-semibold text-stone-300">{small}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[500px]">
                  <img
                    src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1000&q=80"
                    alt="Student studying with notes and laptop"
                    className="h-[500px] w-full rounded-[2.25rem] object-cover shadow-2xl"
                  />

                  <div className="absolute left-5 top-5 rounded-3xl bg-white/95 p-4 shadow-xl backdrop-blur">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                      Today
                    </p>
                    <p className="mt-1 text-lg font-black">Finish 20 questions</p>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Chem 30", "Acids & bases"],
                      ["Physics 30", "Momentum"],
                      ["ELA 30-1", "Essay thesis"],
                    ].map(([title, subtitle]) => (
                      <div key={title} className="rounded-3xl bg-white/95 p-4 shadow-xl backdrop-blur">
                        <p className="text-sm font-black">{title}</p>
                        <p className="text-xs font-semibold text-slate-500">{subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold text-slate-500">Continue</p>
                  <h3 className="mt-1 text-2xl font-black">Your study path</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Mastery starts at zero and only moves when you complete practice. Your best score
                    for each unit is saved on this device.
                  </p>

                  <div className="mt-6 space-y-3">
                    {courses.slice(2, 5).map((course) => (
                      <button
                        key={course.id}
                        onClick={() => chooseCourse(course)}
                        className="flex w-full items-center gap-3 rounded-3xl border border-stone-100 bg-stone-50 p-3 text-left transition hover:bg-white hover:shadow-md"
                      >
                        <img src={course.image} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                        <div className="flex-1">
                          <p className="font-black">{course.name}</p>
                          <p className="text-sm font-semibold text-slate-500">
                            {getCourseMastery(course)}% mastery
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-emerald-700">Featured courses</p>
                      <h3 className="text-2xl font-black">Choose your next practice path</h3>
                    </div>
                    <AppButton onClick={() => setView("courses")} variant="outline">
                      View all
                    </AppButton>
                  </div>

                  <CourseGrid
                    courses={courses.slice(0, 6)}
                    chooseCourse={chooseCourse}
                    getCourseMastery={getCourseMastery}
                  />
                </div>
              </section>
            </motion.section>
          )}

          {view === "courses" && (
            <motion.section
              key="courses"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-black text-emerald-700">All diploma courses</p>
                    <h2 className="text-4xl font-black tracking-tight">Pick a course.</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      Practice is grouped by unit so progress actually means something.
                    </p>
                  </div>

                  <div className="relative min-w-full md:min-w-[320px]">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search courses..."
                      className="w-full rounded-full border border-stone-200 bg-stone-50 py-4 pl-12 pr-4 text-sm font-semibold outline-none focus:border-emerald-500"
                    />
                  </div>
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
                <img src={selectedCourse.image} alt="" className="h-72 w-full object-cover lg:h-full" />

                <div className={`bg-gradient-to-br ${selectedCourse.accent} p-8 text-white`}>
                  <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black">
                    {selectedCourse.emoji} {selectedCourse.category}
                  </div>
                  <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                    {selectedCourse.name}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">
                    Choose a unit, complete a 20-question set, and raise your best score for that
                    topic.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <AppButton onClick={() => startQuiz(selectedCourse.units[0])} variant="light">
                      Start first unit <Play className="ml-2 h-5 w-5" />
                    </AppButton>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                  <p className="text-sm font-black text-emerald-700">Unit path</p>
                  <h3 className="mt-1 text-2xl font-black">Work through the course</h3>

                  <div className="mt-5 space-y-4">
                    {selectedCourse.units.map((unit, index) => {
                      const unitProgress = getUnitMastery(selectedCourse.id, unit);

                      return (
                        <button
                          key={unit}
                          onClick={() => startQuiz(unit)}
                          className="grid w-full gap-4 rounded-3xl border border-stone-100 bg-stone-50 p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md md:grid-cols-[52px_1fr_120px] md:items-center"
                        >
                          <div
                            className={`grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br ${selectedCourse.accent} text-lg font-black text-white`}
                          >
                            {index + 1}
                          </div>

                          <div>
                            <h4 className="text-lg font-black">{unit}</h4>
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                              20 questions • exam-style feedback
                            </p>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${selectedCourse.accent}`}
                                style={{ width: `${unitProgress}%` }}
                              />
                            </div>
                          </div>

                          <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
                            <p className="text-xs font-black text-slate-400">BEST</p>
                            <p className="text-xl font-black">{unitProgress}%</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <aside className="space-y-5">
                  <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                    <BookOpen className="mb-3 h-7 w-7 text-emerald-700" />
                    <h3 className="text-xl font-black">Practice level</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      This changes the label and future generation style. Current built-in sets are
                      designed to be harder than the first version.
                    </p>

                    <div className="mt-4 grid gap-2">
                      {["Warm-up", "Exam-style", "Challenge"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                            difficulty === level
                              ? "bg-slate-950 text-white"
                              : "bg-stone-100 text-slate-700 hover:bg-stone-200"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm">
                    <Clock className="mb-4 h-8 w-8 text-emerald-300" />
                    <h3 className="text-xl font-black">Study tip</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Aim for 16/20 or higher before moving on. Below that, retry the same unit and
                      read the explanations carefully.
                    </p>
                  </div>
                </aside>
              </div>
            </motion.section>
          )}

          {view === "quiz" && (
            <motion.section
              key="quiz"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
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

      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-2 text-xs font-medium text-slate-500">
        DiplomaSpark is an independent study tool. Official exam information should be checked
        through Alberta Education.
      </footer>
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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => {
        const mastery = getCourseMastery(course);

        return (
          <motion.button
            key={course.id}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => chooseCourse(course)}
            className="overflow-hidden rounded-[1.8rem] bg-white text-left shadow-sm ring-1 ring-stone-200 transition hover:shadow-lg"
          >
            <div className="relative h-36 overflow-hidden">
              <img src={course.image} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-4 left-4 text-3xl">{course.emoji}</div>
              <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-700">
                {course.category}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-black">{course.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {course.units.length} units • 20-question sets
              </p>

              <div className="mt-5">
                <div className="flex justify-between text-xs font-black text-slate-500">
                  <span>Mastery</span>
                  <span>{mastery}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${course.accent}`}
                    style={{ width: `${mastery}%` }}
                  />
                </div>
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
    <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button onClick={() => setView("course")} className="mb-2 text-sm font-black text-emerald-700">
              ← Back to {course.name}
            </button>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{unit}</h2>
            <p className="text-sm font-bold text-slate-500">
              {difficulty} • {question.type} • {question.skill}
            </p>
          </div>

          <div className={`rounded-3xl bg-gradient-to-br ${course.accent} px-5 py-4 text-white`}>
            <p className="text-xs font-black text-white/75">QUESTION</p>
            <p className="text-2xl font-black">
              {current + 1}/{total}
            </p>
          </div>
        </div>

        <div className="mb-8 h-3 overflow-hidden rounded-full bg-stone-200">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${course.accent} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.18 }}
          >
            <div className="rounded-[1.7rem] bg-slate-950 p-6 text-white shadow-sm">
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
                        : "border-stone-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <span>
                      <span className="mr-3 inline-grid h-8 w-8 place-items-center rounded-full bg-stone-100 text-xs text-slate-700">
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
              <AppButton variant="outline" onClick={() => setShowHint(!showHint)}>
                <Lightbulb className="mr-2 h-5 w-5" /> {showHint ? "Hide hint" : "Use hint"}
              </AppButton>

              {answered && (
                <AppButton onClick={nextQuestion}>
                  {current === total - 1 ? "Finish quiz" : "Next question"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </AppButton>
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
          </motion.div>
        </AnimatePresence>
      </div>

      <aside className="space-y-5">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black">Quiz stats</h3>

          <div className="mt-5 grid gap-3">
            <Stat icon={<Target />} label="Progress" value={`${progress}%`} />
            <Stat icon={<CheckCircle2 />} label="Correct" value={`${score}`} />
            <Stat icon={<Star />} label="Question XP" value={`+${question.xp}`} />
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm">
          <Trophy className="mb-4 h-8 w-8 text-emerald-300" />
          <h3 className="text-xl font-black">Goal</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Try to score at least 16/20 before moving to the next unit.
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
      <div className="flex min-h-[560px] flex-col items-center justify-center rounded-[2rem] bg-white p-8 text-center shadow-sm">
        <div className="mb-6 text-7xl">{percent >= 80 ? "🏆" : percent >= 60 ? "🔥" : "💪"}</div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
          Practice complete
        </p>
        <h2 className="mt-2 text-5xl font-black tracking-tight">{percent}%</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
          You scored <span className="font-black text-slate-950">{score}/{total}</span> in{" "}
          {course.name} • {unit}. Your best attempt for this unit is saved.
        </p>

        <div className="mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-3">
          <Stat icon={<Trophy />} label="Score" value={`${score}/${total}`} />
          <Stat icon={<Award />} label="XP earned" value={`+${score * 15}`} />
          <Stat icon={<Target />} label="Unit mastery" value={`${percent}%`} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <AppButton onClick={retry}>
            <RotateCcw className="mr-2 h-5 w-5" /> Retry
          </AppButton>
          <AppButton onClick={() => setView("course")} variant="outline">
            Back to unit path
          </AppButton>
        </div>
      </div>

      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm">
        <h3 className="text-2xl font-black">What to do next</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Review the explanation for missed questions, then retry the same unit or move to the next
          topic once you are above 80%.
        </p>

        <div className="mt-6 space-y-3">
          {["Review missed concepts", "Retry the unit", "Try a different course", "Come back tomorrow"].map(
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
    <div className="flex items-center gap-3 rounded-3xl bg-stone-50 p-4 text-left">
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