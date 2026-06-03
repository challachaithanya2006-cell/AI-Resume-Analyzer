import { Brain, FileText, Gauge, GitCompare, PenLine, UploadCloud } from 'lucide-react'
import { features } from '../data/mockData'

const icons = [UploadCloud, FileText, Gauge, Brain, GitCompare, PenLine]
const toneClasses = {
  cyan: 'bg-cyan-400/15 text-cyan-200',
  indigo: 'bg-indigo-500/15 text-indigo-200',
  emerald: 'bg-emerald-400/15 text-emerald-200',
  violet: 'bg-violet-500/15 text-violet-200',
  amber: 'bg-amber-400/15 text-amber-200',
  rose: 'bg-rose-500/15 text-rose-200',
}

function FeatureGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = icons[index]
        return (
          <article key={feature.title} className="glass-panel p-5 transition hover:border-cyan-300/40">
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${toneClasses[feature.accent]}`}>
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{feature.copy}</p>
          </article>
        )
      })}
    </div>
  )
}

export default FeatureGrid
