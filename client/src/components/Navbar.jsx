import { Code2, FileText, Menu, Sparkles } from 'lucide-react'

const links = [
  ['Features', '#features'],
  ['Upload', '#upload'],
  ['Dashboard', '#dashboard'],
  ['JD Match', '#matching'],
  ['Rewrite', '#rewrite'],
]

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#home" className="flex items-center gap-3 font-black text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-950/30">
            <FileText size={20} />
          </span>
          <span>ResumeIQ</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-cyan-200">
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="https://github.com/challachaithanya2006-cell/ai-resume-analyzer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/50"
          >
            <Code2 size={16} />
            GitHub
          </a>
          <a
            href="#upload"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            <Sparkles size={16} />
            Start
          </a>
        </div>
        <button
          type="button"
          aria-label="Open navigation"
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-white sm:hidden"
        >
          <Menu size={20} />
        </button>
      </nav>
    </header>
  )
}

export default Navbar
