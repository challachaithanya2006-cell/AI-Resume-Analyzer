import fs from 'node:fs/promises'
import path from 'node:path'
import mammoth from 'mammoth'
import { PDFParse } from 'pdf-parse'

const skillBank = [
  'javascript',
  'typescript',
  'react',
  'vite',
  'node.js',
  'express',
  'mongodb',
  'mongoose',
  'jwt',
  'tailwind',
  'python',
  'java',
  'sql',
  'git',
  'docker',
  'aws',
  'vercel',
  'render',
  'api',
  'rest',
  'graphql',
  'testing',
  'data analysis',
  'machine learning',
  'gemini',
]

export async function parseResumeFile(file) {
  const extension = path.extname(file.originalname).toLowerCase()
  const buffer = await fs.readFile(file.path)

  if (extension === '.pdf') {
    const parser = new PDFParse({ data: buffer })
    const result = await parser.getText()
    await parser.destroy()
    return normalizeText(result.text)
  }

  if (extension === '.docx') {
    const result = await mammoth.extractRawText({ buffer })
    return normalizeText(result.value)
  }

  const error = new Error('Unsupported resume format')
  error.statusCode = 400
  throw error
}

export function extractResumeFields(text) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || ''
  const phone =
    text.match(/(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{4}/)?.[0] ||
    ''
  const name =
    lines.find((line) => !line.includes('@') && !/\d{3,}/.test(line) && line.length <= 60) ||
    'Candidate'

  return {
    name,
    email,
    phone,
    skills: extractSkills(text),
    education: extractSection(lines, ['education', 'academic']),
    projects: extractSection(lines, ['projects', 'project work']),
    experience: extractSection(lines, ['experience', 'work history', 'internship']),
    certifications: extractSection(lines, ['certifications', 'certificates']),
    rawText: text,
  }
}

function extractSkills(text) {
  const lower = text.toLowerCase()
  return skillBank.filter((skill) => lower.includes(skill)).map((skill) => titleCase(skill))
}

function extractSection(lines, headings) {
  const startIndex = lines.findIndex((line) => headings.some((heading) => line.toLowerCase().includes(heading)))
  if (startIndex === -1) return []

  const collected = []
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]
    const lower = line.toLowerCase()
    if (
      collected.length > 0 &&
      ['skills', 'education', 'projects', 'experience', 'certifications', 'summary'].some(
        (heading) => lower === heading || lower.startsWith(`${heading}:`)
      )
    ) {
      break
    }
    if (line.length > 4) collected.push(line.replace(/^[-*]\s*/, ''))
    if (collected.length >= 5) break
  }
  return collected
}

function normalizeText(text) {
  return text.replace(/\r/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
}

function titleCase(value) {
  return value
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
