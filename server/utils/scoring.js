const roleKeywords = {
  'Frontend Developer': ['react', 'javascript', 'typescript', 'tailwind', 'accessibility', 'vite', 'redux'],
  'Backend Developer': ['node', 'express', 'mongodb', 'jwt', 'api', 'database', 'security'],
  'Full Stack Developer': ['react', 'node', 'express', 'mongodb', 'api', 'auth', 'deployment'],
  'Software Engineer': ['data structures', 'algorithms', 'testing', 'system design', 'git', 'api'],
  'Data Analyst': ['sql', 'python', 'excel', 'dashboard', 'statistics', 'visualization'],
}

export function scoreResume(extracted) {
  const text = extracted.rawText.toLowerCase()
  const skillsScore = clamp(extracted.skills.length * 8, 35, 96)
  const formattingScore = scoreFormatting(text)
  const experienceScore = clamp((extracted.experience.length * 16) + countImpactWords(text) * 3, 38, 94)
  const educationScore = extracted.education.length > 0 ? 88 : 55
  const overall = Math.round((skillsScore * 0.33) + (formattingScore * 0.22) + (experienceScore * 0.3) + (educationScore * 0.15))

  return {
    overall,
    skillsScore,
    formattingScore,
    experienceScore,
    educationScore,
    interviewReadiness: clamp(overall - 5 + extracted.projects.length * 2, 45, 96),
  }
}

export function matchRoles(text) {
  const lower = text.toLowerCase()
  return Object.entries(roleKeywords)
    .map(([title, keywords]) => {
      const matched = keywords.filter((keyword) => lower.includes(keyword))
      const missing = keywords.filter((keyword) => !lower.includes(keyword))
      const match = Math.round((matched.length / keywords.length) * 100)
      return {
        title,
        match,
        matched,
        missing,
        explanation: `${matched.length} of ${keywords.length} core keywords found for ${title}.`,
      }
    })
    .sort((a, b) => b.match - a.match)
}

export function compareJobDescription(resumeText, jobDescription) {
  const resumeKeywords = new Set(extractKeywords(resumeText))
  const jobKeywords = extractKeywords(jobDescription)
  const matched = jobKeywords.filter((keyword) => resumeKeywords.has(keyword))
  const missing = jobKeywords.filter((keyword) => !resumeKeywords.has(keyword))
  const keywordMatch = jobKeywords.length ? Math.round((matched.length / jobKeywords.length) * 100) : 0

  return {
    keywordMatch,
    matchedKeywords: matched,
    missingKeywords: missing.slice(0, 20),
    suggestions: missing.slice(0, 8).map((keyword) => `Add credible evidence for ${keyword} if you have real experience.`),
  }
}

function scoreFormatting(text) {
  let score = 52
  if (text.includes('experience')) score += 10
  if (text.includes('education')) score += 10
  if (text.includes('projects')) score += 10
  if (text.includes('skills')) score += 10
  if (text.length > 1600 && text.length < 6500) score += 8
  return clamp(score, 35, 96)
}

function countImpactWords(text) {
  return ['built', 'improved', 'launched', 'optimized', 'implemented', 'reduced', 'increased', 'designed'].filter((word) =>
    text.includes(word)
  ).length
}

function extractKeywords(value) {
  return [...new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s-]/g, ' ')
      .split(/\s+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 2 && !stopWords.has(word))
  )]
}

const stopWords = new Set([
  'and',
  'the',
  'for',
  'with',
  'you',
  'are',
  'our',
  'will',
  'that',
  'this',
  'have',
  'from',
  'into',
  'your',
  'can',
  'all',
])

function clamp(value, min, max) {
  return Math.min(Math.max(Math.round(value), min), max)
}
