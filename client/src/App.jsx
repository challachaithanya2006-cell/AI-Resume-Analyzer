import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  FileText,
  Gauge,
  Lock,
  PenLine,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Wand2,
} from 'lucide-react'
import {
  atsBreakdown,
  faqs,
  history,
  jobMatches,
  keywordData,
  rewriteBullets,
  skillRadar,
  testimonials,
} from './data/mockData'
import AdminPanel from './components/AdminPanel'
import CoverLetterGenerator from './components/CoverLetterGenerator'
import DashboardCharts from './components/DashboardCharts'
import FeatureGrid from './components/FeatureGrid'
import Footer from './components/Footer'
import MetricRing from './components/MetricRing'
import Navbar from './components/Navbar'
import RoleMatcher from './components/RoleMatcher'
import ThreeHero from './components/ThreeHero'
import UploadPanel from './components/UploadPanel'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

function App() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [analysis, setAnalysis] = useState(null)
const dynamicATS = analysis
  ? [
      {
        name: 'Skills Score',
        value: Math.min(
          (analysis.extracted.skills?.length || 0) * 10,
          100
        ),
      },
      {
        name: 'Education Score',
        value: analysis.extracted.education?.length ? 90 : 40,
      },
      {
        name: 'Experience Score',
        value: analysis.extracted.experience?.length ? 85 : 30,
      },
      {
        name: 'Project Score',
        value: analysis.extracted.projects?.length ? 88 : 20,
      },
    ]
  : atsBreakdown
  
  console.log("APP ANALYSIS:", analysis)
  console.log("ANALYSIS:", analysis)
console.log("DYNAMIC ATS:", dynamicATS)
  const [targetRole, setTargetRole] = useState('Full Stack Developer')
  const [jobDescription, setJobDescription] = useState(
    'We need a React and Node.js developer with REST APIs, MongoDB, authentication, cloud deployment, testing, and strong communication skills.'
  )
  const selectedMatch = useMemo(
  () => jobMatches.find((role) => role.title === targetRole) ?? jobMatches[0],
  [targetRole]
)

console.log("DYNAMIC ATS:", dynamicATS)

const overallScore = Math.round(
  dynamicATS.reduce((sum, item) => sum + item.value, 0) /
  dynamicATS.length
)


  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-50">
      <Navbar />
      <section
        id="home"
        className="relative isolate overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.25),transparent_28%),linear-gradient(135deg,#0A0F1F_0%,#0F172A_45%,#08111F_100%)]"
      >
        <ThreeHero />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
              <Sparkles size={16} />
              Gemini powered ATS intelligence
            </div>
            <h1 className="text-5xl font-black leading-[1.03] text-white sm:text-6xl lg:text-7xl">
              AI Resume Analyzer for internship-ready resumes
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Upload a resume, extract the content, score it for ATS systems,
              match it against job roles, rewrite weak sections, and generate a
              cover letter from one premium dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#upload"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500"
              >
                <UploadCloud size={18} />
                Analyze Resume
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
              >
                <BarChart3 size={18} />
                View Dashboard
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 text-left">
              {[
  [overallScore, 'ATS Score'],
  [analysis?.extracted?.skills?.length || 0, 'Skills Detected'],
  ['5', 'Role Matches'],
].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md"
                >
                  <p className="text-3xl font-black text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="glass-panel relative overflow-hidden p-5"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">Live ATS preview</p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  Candidate Signal
                </h2>
              </div>
              <div className="rounded-lg bg-emerald-400/15 p-3 text-emerald-200">
                <ShieldCheck />
              </div>
            </div>
            <div className="grid gap-5 py-6 sm:grid-cols-[0.9fr_1.1fr]">
           <MetricRing
  value={overallScore}
  label="Overall"
  tone="cyan"
  size="lg"
/>
              <div className="space-y-3">
                {dynamicATS.map((item) => (
                  <div key={item.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="font-semibold text-white">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 rounded-md bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="h-full rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['PDF parsing', 'Gemini review', 'ATS report'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-200"
                >
                  <CheckCircle2 className="text-cyan-300" size={17} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="section-shell">
        <SectionHeader
          eyebrow="Product suite"
          title="Everything a serious resume platform needs"
          copy="The interface is built as a premium SaaS workflow: upload, parse, score, compare, rewrite, export, and track improvement."
        />
        <FeatureGrid />
      </section>

      <section id="upload" className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Resume intake"
              title="Upload PDF or DOCX and get a structured profile"
              copy="The backend accepts resumes through Multer, extracts text with pdf-parse or mammoth, then prepares the data for scoring and AI analysis."
            />
           <UploadPanel
  uploadedFile={uploadedFile}
  onUpload={setUploadedFile}
  onAnalysis={setAnalysis}
/>
          </div>
          <div className="glass-panel p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Extracted fields</p>
                <h3 className="text-2xl font-bold text-white">
                  Resume Profile
                </h3>
              </div>
              <FileText className="text-cyan-300" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
  ['Name', analysis?.extracted?.name || 'Not Found'],
  ['Email', analysis?.extracted?.email || 'Not Found'],
  ['Phone', analysis?.extracted?.phone || 'Not Found'],
  ['Education', analysis?.extracted?.education || 'Not Found'],
  [
    'Skills',
    Array.isArray(analysis?.extracted?.skills)
      ? analysis.extracted.skills.join(', ')
      : 'Not Found',
  ],
  [
    'Projects',
    Array.isArray(analysis?.extracted?.projects)
      ? analysis.extracted.projects.join(', ')
      : 'Not Found',
  ],
  ['Experience', analysis?.extracted?.experience || 'Not Found'],
  [
    'Certifications',
    Array.isArray(analysis?.extracted?.certifications)
      ? analysis.extracted.certifications.join(', ')
      : 'Not Found',
  ],
].map(([label, value]) => (
  
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs uppercase text-slate-500">{label}</p>
                  <p className="mt-1 font-semibold text-slate-100">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="section-shell">
        <SectionHeader
          eyebrow="ATS analytics"
          title="Animated gauges, ranking cards, bars, pies, and score history"
          copy="The dashboard gives recruiters and candidates a quick read on resume quality, keyword fit, formatting, and interview readiness."
        />
        <DashboardCharts
  atsBreakdown={dynamicATS}
  history={history}
  keywordData={keywordData}
  skillRadar={skillRadar}
/>
      </section>

      <section id="matching" className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="JD matcher"
              title="Compare your resume against a live job description"
              copy="Paste a job description and see role fit, missing keywords, and targeted improvement suggestions."
            />
            <div className="glass-panel p-5">
              <label htmlFor="jd" className="mb-2 block text-sm font-semibold text-slate-200">
                Job description
              </label>
              <textarea
                id="jd"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                className="min-h-44 w-full resize-none rounded-lg border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {['86% keyword fit', '7 missing skills', '12 suggestions'].map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] p-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <RoleMatcher
            matches={jobMatches}
            selectedRole={targetRole}
            onSelectRole={setTargetRole}
            selectedMatch={selectedMatch}
          />
        </div>
      </section>

      <section id="rewrite" className="section-shell">
        <SectionHeader
          eyebrow="AI writing studio"
          title="Rewrite resume bullets and generate cover letters"
          copy="Gemini prompts are structured to create ATS-friendly content with stronger action verbs, measurable impact, and role-specific language."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-panel p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500/15 p-3 text-indigo-200">
                <Wand2 />
              </div>
              <div>
                <p className="text-sm text-slate-400">Resume rewriter</p>
                <h3 className="text-2xl font-bold text-white">
                  Better bullets
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {rewriteBullets.map((item) => (
                <div key={item.after} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-sm text-slate-500">Before</p>
                  <p className="mt-1 text-slate-300">{item.before}</p>
                  <p className="mt-4 text-sm text-cyan-300">AI improved</p>
                  <p className="mt-1 font-semibold text-white">{item.after}</p>
                </div>
              ))}
            </div>
          </div>
          <CoverLetterGenerator targetRole={targetRole} />
        </div>
      </section>

      <section id="auth" className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Secure workspace"
              title="JWT auth, saved resumes, and score history"
              copy="The backend includes user registration, login, protected routes, MongoDB models, and previous analysis storage."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [Lock, 'JWT authentication', 'Register, login, protected user data.'],
                [AreaChart, 'Score history', 'Track every resume version over time.'],
                [PenLine, 'Saved reports', 'Keep analyses and export summaries.'],
                [Brain, 'Gemini prompts', 'Structured AI review and rewriting.'],
              ].map(([Icon, title, copy]) => (
                <div key={title} className="glass-panel p-4">
                  <Icon className="mb-4 text-cyan-300" />
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <AdminPanel />
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="How it works"
          title="From upload to interview readiness in one flow"
          copy="Each step maps directly to the MVP roadmap: extraction, scoring, job matching, rewriting, cover letters, and interview prep."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['1', 'Upload', 'PDF or DOCX resume intake with validation.'],
            ['2', 'Parse', 'Extract contact, skills, projects, education, and experience.'],
            ['3', 'Analyze', 'Calculate ATS scores and Gemini feedback.'],
            ['4', 'Improve', 'Rewrite bullets, match JDs, and generate reports.'],
          ].map(([step, title, copy]) => (
            <div key={title} className="glass-panel p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/15 font-black text-cyan-200">
                {step}
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Social proof"
              title="Designed to look like a real commercial platform"
              copy="The UI borrows product patterns from serious resume tools: dense dashboards, animated insights, and clean conversion sections."
            />
            <div className="space-y-3">
              {testimonials.map((item) => (
                <div key={item.name} className="glass-panel p-5">
                  <p className="text-slate-300">"{item.quote}"</p>
                  <p className="mt-4 font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-cyan-300">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-cyan-400/15 p-3 text-cyan-200">
                <Gauge />
              </div>
              <h3 className="text-2xl font-bold text-white">FAQ</h3>
            </div>
            <div className="divide-y divide-white/10">
              {faqs.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                    {item.question}
                    <ChevronRight className="shrink-0 transition group-open:rotate-90" size={18} />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function SectionHeader({ eyebrow, title, copy, align = 'center' }) {
  return (
    <div className={align === 'left' ? 'mb-8 max-w-2xl' : 'mx-auto mb-10 max-w-3xl text-center'}>
      <p className="mb-3 text-sm font-bold uppercase text-cyan-300">{eyebrow}</p>
      <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-400">{copy}</p>
    </div>
  )
}

export default App
