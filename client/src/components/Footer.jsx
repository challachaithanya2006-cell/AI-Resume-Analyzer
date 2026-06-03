import { Code2, Mail, Network, Sparkles } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3 font-black text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <Sparkles size={19} />
            </span>
            ResumeIQ
          </div>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            AI Resume Analyzer | React, Node.js, Gemini AI, PDF Processing,
            ATS Scoring, Job Matching.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          {[
            [Code2, 'GitHub'],
            [Network, 'LinkedIn'],
            [Mail, 'Contact'],
          ].map(([Icon, label]) => (
            <a
              key={label}
              href="#home"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/50"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
