// Mapeamento de cores para Soft Skills com cores HEX (similar ao GitHub para linguagens)
export const softSkillColorMap: Record<string, string> = {
  // Liderança
  "Liderança": "#2563EB",
  "Leadership": "#2563EB",

  // Comunicação
  "Comunicação": "#16A34A",
  "Communication": "#16A34A",

  // Resolução de Problemas
  "Resolução de Problemas": "#9333EA",
  "Problem Solving": "#9333EA",

  // Trabalho em Equipe
  "Trabalho em Equipe": "#EA580C",
  "Teamwork": "#EA580C",

  // Criatividade
  "Criatividade": "#EC4899",
  "Creativity": "#EC4899",

  // Adaptabilidade
  "Adaptabilidade": "#06B6D4",
  "Adaptability": "#06B6D4",

  // Pensamento Crítico
  "Pensamento Crítico": "#EAB308",
  "Critical Thinking": "#EAB308",

  // Organização
  "Organização": "#DC2626",
  "Organization": "#DC2626",

  // Paciência
  "Paciência": "#4F46E5",
  "Patience": "#4F46E5",

  // Empatia
  "Empatia": "#F43F5E",
  "Empathy": "#F43F5E",
}

export const getSoftSkillColor = (skill: string): string => {
  // Tenta encontro exato
  if (softSkillColorMap[skill]) {
    return softSkillColorMap[skill]
  }
  
  // Tenta encontro case-insensitive
  const skillLower = skill.toLowerCase()
  for (const [key, color] of Object.entries(softSkillColorMap)) {
    if (key.toLowerCase() === skillLower) {
      return color
    }
  }
  
  // Se não encontrar, gera uma cor baseada no hash da string
  const hash = skill.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)
  
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 70%, 50%)`
}
