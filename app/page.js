"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Download, Mail, ChevronDown, Send, Code2 } from "lucide-react";
import Network from "@/components/Network";

const LINKS = {
  github: "https://github.com/PranavKasanagottu",
  linkedin: "https://www.linkedin.com/in/pranav-kasanagottu",
  leetcode: "https://leetcode.com/u/pranavk_01",
  email: "pranavkasanagottu@gmail.com",
};

function GithubMark({ size = 17 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.26c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .297" /></svg>;
}

function LinkedinMark({ size = 17 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45h3.56V8.99H3.54v11.46Z" /></svg>;
}

const PROJECTS = [
  {
    title: "Expression Analysis for Dyslexic Kids", date: "Aug 2024", tag: "Computer Vision",
    stack: ["ViT", "Deep Learning", "React", "MERN"], url: "https://github.com/PranavKasanagottu/Expression_Analysis",
    summary: "Reads facial expressions to classify how dyslexic children feel while playing educational games.",
    points: ["A ViT-based model reaches ~85% emotion classification accuracy across key expressions.", "React.js interface designed to be responsive and easy for children to use."],
  },
  {
    title: "CodeGenie", date: "Feb 2025", tag: "LLM",
    stack: ["VS Code Extension", "DeepSeek Coder", "RTX 4090"], url: "https://github.com/kmitofficial/CodeGenie-G335-PS25",
    summary: "A VS Code extension that writes context-aware code snippets from real-time prompts.",
    points: ["GPU-accelerated inference keeps average response time under 1.2s per prompt.", "Prompt structuring and request handling lifted snippet acceptance to ~70% in sample workflows."],
  },
  {
    title: "FusionCast", date: "Jul 2025", tag: "Time-Series",
    stack: ["Python", "CNN", "LSTM", "GRU", "XAI"], url: "https://github.com/PranavKasanagottu/FusionCast",
    summary: "Supply chain demand forecasting with a Multi-Channel Data Fusion Network.",
    points: ["Parallel CNN, LSTM and GRU branches give ~18% lower RMSE than single-model baselines.", "ShapTime and Permutation Feature Importance explain which drivers move each forecast."],
  },
];

const SKILLS = {
  Languages: ["Java", "Python", "C++", "C", "JavaScript"],
  "AI / ML": ["Machine Learning", "Deep Learning", "NLP", "GANs", "Explainable AI", "LLMs"],
  "Web & Data": ["React.js", "Node.js", "Express.js", "HTML", "CSS", "MySQL", "MongoDB"],
  "Tools & Cloud": ["Git", "GitHub", "Docker", "Jenkins", "Maven", "AWS"],
  "CS Core": ["DSA", "OOP", "Operating Systems", "Computer Networks", "System Design"],
};

const JOURNEY = [
  { when: "Expected May 2027", title: "B.Tech, Computer Science (AIML)", where: "Keshav Memorial Institute of Technology", note: "CGPA 9.425" },
  { when: "March 2023", title: "Intermediate (MPC)", where: "FIITJEE Junior College", note: "95.4%" },
];

const WINS = [
  ["Winner", "CoinQuest Hackathon", "Built a pharmaceutical management app in Python."],
  ["Runner-up", "Prakalp Project Expo", "Technical excellence award, Human Resources category."],
  ["Selected", "Centific Premier Hackathon 2.0", "Led to an internship offer."],
  ["Certified", "GDG Study Jams", "Hands-on Google Cloud labs."],
  ["Completed", "Udemy courses", "Full Stack Web Development and System Design."],
];

const fade = (i) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } });

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button className="icon-btn" aria-label="Toggle dark mode" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function Project({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article layout className="project" transition={{ layout: { duration: 0.4, ease: [0.2, 0.7, 0.2, 1] } }}>
      <button className="project-head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="project-date">{p.date}</span>
        <span className="project-title">{p.title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={22} /></motion.span>
      </button>
      <p className="muted">{p.summary}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
            <ul className="points">{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
            <a className="link" href={p.url} target="_blank" rel="noreferrer">View on GitHub</a>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="chips">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
    </motion.article>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <label>Name<input name="name" required autoComplete="name" maxLength={100} /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" maxLength={200} /></label>
      <label>Message<textarea name="message" rows={5} required maxLength={5000} /></label>
      {/* Honeypot field for bots */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} />
      <button className="btn" type="submit" disabled={status === "sending"}>
        <Send size={16} /> {status === "sending" ? "Sending..." : "Send message"}
      </button>
      <p role="status" className="muted">
        {status === "sent" && "Message sent. I'll reply by email soon."}
        {status === "error" && `${errorMsg} You can also email me at ${LINKS.email}.`}
      </p>
    </form>
  );
}
export default function Home() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...new Set(PROJECTS.map((p) => p.tag))];
  const shown = PROJECTS.filter((p) => filter === "All" || p.tag === filter);

  return (
    <main>
      <nav className="nav">
        <a href="#top" className="logo">PK</a>
        <div className="nav-links">
          {["About", "Skills", "Projects", "Journey", "Contact"].map((s) => <a key={s} href={`#${s.toLowerCase()}`}>{s}</a>)}
        </div>
        <div className="nav-actions"><a className="btn small" href="/Resume.pdf" download><Download size={15} /> Resume</a><ThemeToggle /></div>
      </nav>

      <header id="top" className="hero">
        <Network />
        <div className="hero-inner">
          <motion.p {...fade(0)} className="muted">AI/ML student | Cloud curious | Builder</motion.p>
          <motion.h1 {...fade(1)}>Curious by default. Practical by design.</motion.h1>
          <motion.p {...fade(2)} className="lead">I&apos;m Pranav Kasanagottu. I explore the space where intelligent software meets real-world constraints, turning ambitious questions into useful systems.</motion.p>
          <motion.div {...fade(3)} className="row">
            <a className="btn" href="#projects">See my projects</a>
            <a className="btn ghost" href={`mailto:${LINKS.email}`}><Mail size={16} /> Email me</a>
          </motion.div>
        </div>
      </header>

      <section id="about" className="section">
        <h2>About</h2>
        <div className="about">
          <p>I&apos;m a Computer Science student specializing in AI/ML, with a growing focus on cloud computing and the systems that take models from notebooks into useful products. I like the part where an idea has to work in the real world, so I learn by building, experimenting with emerging technologies, and turning concepts into practical solutions. My work spans the full ML lifecycle: developing models, connecting them to applications, and improving how they are deployed, optimized, and experienced.</p>
          <dl className="stats">
            <div><dt>CGPA</dt><dd>9.425</dd></div>
            <div><dt>LeetCode problems</dt><dd>900+</dd></div>
            <div><dt>Contest rating</dt><dd>1938</dd></div>
          </dl>
        </div>
      </section>

      <section id="skills" className="section">
        <h2>Skills</h2>
        <div className="skills">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group}><h3>{group}</h3><div className="chips">{items.map((s) => <span key={s} className="chip">{s}</span>)}</div></div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="chips filters" role="group" aria-label="Filter projects">
          {tags.map((t) => <button key={t} className={`chip pick ${filter === t ? "on" : ""}`} aria-pressed={filter === t} onClick={() => setFilter(t)}>{t}</button>)}
        </div>
        <div className="projects">{shown.map((p) => <Project key={p.title} p={p} />)}</div>
      </section>

      <section id="journey" className="section">
        <h2>Journey</h2>
        <div className="two">
          <ol className="timeline">
            {JOURNEY.map((j) => (
              <li key={j.title}><span className="muted">{j.when}</span><strong>{j.title}</strong><span>{j.where}</span><span className="muted">{j.note}</span></li>
            ))}
          </ol>
          <div>
            <h3>Achievements</h3>
            <ul className="wins">{WINS.map(([k, t, d]) => <li key={t}><b>{k}</b> {t}<br /><span className="muted">{d}</span></li>)}</ul>
            <p className="muted">Work experience will appear here once I have some to share. I&apos;m looking for internships.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Contact me</h2>
        <div className="two">
          <div className="contact-details">
            <p><a className="link" href={`mailto:${LINKS.email}`}>{LINKS.email}</a></p>
            <p className="social-links">
              <a className="social-link" href={LINKS.github} target="_blank" rel="noreferrer"><span className="social-icon github-icon"><GithubMark /></span><span>GitHub</span></a>
              <a className="social-link" href={LINKS.linkedin} target="_blank" rel="noreferrer"><span className="social-icon linkedin-icon"><LinkedinMark /></span><span>LinkedIn</span></a>
              <a className="social-link" href={LINKS.leetcode} target="_blank" rel="noreferrer"><span className="social-icon leetcode-icon"><Code2 size={18} aria-hidden="true" /></span><span>LeetCode</span></a>
            </p>
          </div>
          <Contact />
        </div>
      </section>
    </main>
  );
}
