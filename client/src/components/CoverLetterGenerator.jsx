import { useMemo, useState } from 'react'
import { Building2, Copy, Mail, Sparkles } from 'lucide-react'

function CoverLetterGenerator({ targetRole }) {
  const [company, setCompany] = useState('TechNova Labs')

  const letter = useMemo(
    () =>
      `Dear Hiring Team at ${company},\n\nI am excited to apply for the ${targetRole} role. My recent work includes building an AI Resume Analyzer with React, Node.js, Gemini API, MongoDB, JWT authentication, PDF/DOCX parsing, and ATS scoring. The project strengthened my ability to design full-stack systems, convert AI output into product workflows, and ship polished dashboard experiences.\n\nI would bring strong ownership, curiosity, and practical engineering execution to your team. Thank you for considering my application.\n\nSincerely,\nChaitanya Sai`,
    [company, targetRole]
  )

  return (
    <div className="glass-panel p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-cyan-400/15 p-3 text-cyan-200">
          <Mail />
        </div>
        <div>
          <p className="text-sm text-slate-400">Cover letter generator</p>
          <h3 className="text-2xl font-bold text-white">Personalized draft</h3>
        </div>
      </div>
      <label htmlFor="company" className="mb-2 block text-sm font-semibold text-slate-200">
        Company name
      </label>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Building2 className="pointer-events-none absolute left-3 top-3 text-slate-500" size={18} />
          <input
            id="company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-950/70 py-3 pl-10 pr-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          <Sparkles size={18} />
          Generate
        </button>
      </div>
      <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-300">
        {letter}
      </pre>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-300/50"
      >
        <Copy size={17} />
        Copy Draft
      </button>
    </div>
  )
}

export default CoverLetterGenerator
