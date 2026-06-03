import { Activity, Database, FileText, Users } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const adminData = [
  { name: 'Users', value: 128 },
  { name: 'Uploads', value: 412 },
  { name: 'Reports', value: 266 },
  { name: 'Letters', value: 94 },
]

const stats = [
  [Users, '1,284', 'Registered users'],
  [FileText, '4,812', 'Resume uploads'],
  [Activity, '91%', 'Avg ATS score'],
  [Database, '12GB', 'Stored reports'],
]

function AdminPanel() {
  return (
    <div className="glass-panel p-5">
      <div className="mb-5">
        <p className="text-sm text-slate-400">Admin panel</p>
        <h3 className="text-2xl font-bold text-white">Analytics overview</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map(([Icon, value, label]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
            <Icon className="mb-4 text-cyan-300" />
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 h-72 rounded-lg border border-white/10 bg-slate-950/50 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adminData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="name" stroke="#CBD5E1" tickLine={false} axisLine={false} />
            <YAxis stroke="#CBD5E1" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: '#0F172A',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
              }}
            />
            <Bar dataKey="value" fill="#06B6D4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminPanel
