import { motion } from 'framer-motion'

const tones = {
  cyan: '#06B6D4',
  indigo: '#4F46E5',
  emerald: '#10B981',
  amber: '#F59E0B',
  rose: '#F43F5E',
}

function MetricRing({ value, label, tone = 'cyan', size = 'md' }) {
  const radius = size === 'lg' ? 72 : 46
  const stroke = size === 'lg' ? 12 : 9
  const box = (radius + stroke) * 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} aria-label={`${label} ${value}%`}>
        <circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="transparent"
          stroke={tones[tone]}
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          transform={`rotate(-90 ${box / 2} ${box / 2})`}
        />
        <text
          x="50%"
          y="48%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#F8FAFC"
          fontSize={size === 'lg' ? '34' : '24'}
          fontWeight="900"
        >
          {value}
        </text>
        <text
          x="50%"
          y="63%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="12"
          fontWeight="700"
        >
          ATS
        </text>
      </svg>
      <p className="mt-2 text-sm font-semibold text-slate-300">{label}</p>
    </div>
  )
}

export default MetricRing
