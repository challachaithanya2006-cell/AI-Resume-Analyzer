import { motion } from 'framer-motion'
import { BriefcaseBusiness, CircleAlert, Target } from 'lucide-react'

function RoleMatcher({ matches, selectedRole, onSelectRole, selectedMatch }) {
  return (
    <div className="glass-panel p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Role ranking</p>
          <h3 className="text-2xl font-bold text-white">Job Role Match</h3>
        </div>
        <Target className="text-cyan-300" />
      </div>

      <div className="space-y-3">
        {matches.map((role) => (
          <button
            key={role.title}
            type="button"
            onClick={() => onSelectRole(role.title)}
            className={`w-full rounded-lg border p-4 text-left transition ${
              selectedRole === role.title
                ? 'border-cyan-300/60 bg-cyan-300/10'
                : 'border-white/10 bg-white/[0.05] hover:border-indigo-300/50'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-bold text-white">
                <BriefcaseBusiness size={18} className="text-cyan-300" />
                {role.title}
              </span>
              <span className="text-xl font-black text-white">{role.match}%</span>
            </div>
            <div className="mt-3 h-2 rounded-md bg-white/10">
              <motion.div
                className="h-full rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${role.match}%` }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-slate-950/60 p-4">
        <p className="text-sm text-slate-400">Match explanation</p>
        <p className="mt-2 leading-7 text-slate-200">{selectedMatch.reason}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedMatch.missing.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-2 rounded-md bg-amber-400/12 px-3 py-2 text-sm text-amber-100">
              <CircleAlert size={15} />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoleMatcher
