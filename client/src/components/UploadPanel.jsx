import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, FileText, UploadCloud, XCircle } from 'lucide-react'
import axios from 'axios'

const acceptedTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

function UploadPanel({ uploadedFile, onUpload, onAnalysis }) {
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const helper = useMemo(() => {
    if (uploadedFile) return `${uploadedFile.name} is ready for analysis`
    return 'PDF or DOCX up to 8MB'
  }, [uploadedFile])

  const handleFile = useCallback(
    async (file) => {
      if (!file) return

      if (!acceptedTypes.includes(file.type)) {
        setError('Upload a PDF or DOCX resume.')
        return
      }

      if (file.size > 8 * 1024 * 1024) {
        setError('Keep the resume under 8MB.')
        return
      }

      setError('')
      onUpload(file)

      try {
        const formData = new FormData()
        formData.append('resume', file)

        await axios.post(
  'https://ai-resume-analyzer-api-egyw.onrender.com/api/resumes/analyze',
  formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

      console.log('Analysis Result:', JSON.stringify(response.data, null, 2))

if (onAnalysis) {
  onAnalysis(response.data)
}
      } catch (err) {
  console.error('UPLOAD ERROR:', err)

  if (err.response) {
    console.log('Status:', err.response.status)
    console.log('Data:', err.response.data)
  }

  setError(
    err.response?.data?.message ||
    err.message ||
    'Resume analysis failed'
  )
}

      setProgress(0)

      const timer = window.setInterval(() => {
        setProgress((value) => {
          if (value >= 100) {
            window.clearInterval(timer)
            return 100
          }
          return value + 20
        })
      }, 120)
    },
    [onUpload, onAnalysis]
  )

  return (
    <div className="glass-panel p-5">
      <label
        className={`flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition ${
          isDragging
            ? 'border-cyan-300 bg-cyan-300/10'
            : 'border-white/15 bg-slate-950/40 hover:border-indigo-300/60'
        }`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          handleFile(event.dataTransfer.files?.[0])
        }}
      >
        <input
          type="file"
          accept=".pdf,.docx"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-200">
          <UploadCloud size={30} />
        </span>

        <span className="text-xl font-bold text-white">
          Drop resume or browse file
        </span>

        <span className="mt-2 text-sm text-slate-400">{helper}</span>
      </label>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 flex items-center gap-2 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100"
          >
            <XCircle size={17} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {uploadedFile && (
        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-cyan-300" />

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">
                {uploadedFile.name}
              </p>

              <p className="text-sm text-slate-400">
                {Math.round(uploadedFile.size / 1024)} KB
              </p>
            </div>

            {progress === 100 && (
              <CheckCircle2 className="text-emerald-300" />
            )}
          </div>

          <div className="mt-4 h-2 rounded-md bg-white/10">
            <motion.div
              className="h-full rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400"
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadPanel