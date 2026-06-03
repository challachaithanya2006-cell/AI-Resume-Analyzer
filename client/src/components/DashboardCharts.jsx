import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Award, ChartPie, Gauge, TrendingUp } from 'lucide-react'
import MetricRing from './MetricRing'

const tooltipStyle = {
  background: '#0F172A',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8,
  color: '#F8FAFC',
}

function DashboardCharts({
  atsBreakdown,
  history,
  keywordData,
  skillRadar,
}) {
  const overallScore = Math.round(
    atsBreakdown.reduce((sum, item) => sum + item.value, 0) /
      atsBreakdown.length
  )
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className="glass-panel p-5 lg:col-span-4">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Overall quality</p>
            <h3 className="text-2xl font-bold text-white">ATS Score</h3>
          </div>
          <Gauge className="text-cyan-300" />
        </div>
       <MetricRing
  value={overallScore}
  label="Resume health"
  tone="cyan"
  size="lg"
/>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {atsBreakdown.map((item) => (
            <div key={item.name} className="rounded-lg border border-white/10 bg-white/[0.06] p-3">
              <p className="text-xs text-slate-500">{item.name}</p>
              <p className="mt-1 text-2xl font-black text-white">{item.value}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-5 lg:col-span-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Progress over time</p>
            <h3 className="text-2xl font-bold text-white">Score History</h3>
          </div>
          <TrendingUp className="text-emerald-300" />
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="matchGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.42} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="score" stroke="#06B6D4" fill="url(#scoreGradient)" strokeWidth={3} />
              <Area type="monotone" dataKey="match" stroke="#4F46E5" fill="url(#matchGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-5 lg:col-span-4">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">ATS categories</p>
            <h3 className="text-2xl font-bold text-white">Breakdown</h3>
          </div>
          <Award className="text-amber-300" />
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={atsBreakdown} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis type="category" dataKey="name" stroke="#CBD5E1" width={120} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-5 lg:col-span-4">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Keyword coverage</p>
            <h3 className="text-2xl font-bold text-white">Match Pie</h3>
          </div>
          <ChartPie className="text-cyan-300" />
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip contentStyle={tooltipStyle} />
              <Pie data={keywordData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                {keywordData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {keywordData.map((item) => (
            <div key={item.name} className="rounded-lg border border-white/10 bg-white/[0.06] p-2 text-center">
              <p className="text-lg font-black text-white">{item.value}</p>
              <p className="text-xs text-slate-400">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-5 lg:col-span-4">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Skill coverage</p>
            <h3 className="text-2xl font-bold text-white">Radar</h3>
          </div>
          <TrendingUp className="text-indigo-300" />
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillRadar}>
              <PolarGrid stroke="rgba(255,255,255,0.12)" />
              <PolarAngleAxis dataKey="skill" stroke="#CBD5E1" />
              <Tooltip contentStyle={tooltipStyle} />
              <Radar dataKey="score" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.28} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashboardCharts
