"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Filter,
  Moon,
  Sun,
  X,
  Briefcase,
  MapPin,
  Award,
  Globe,
  Heart,
  MessageCircle,
  ThumbsUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SkillBadge } from "@/components/SkillBadge"
import profilesData from "@/data/profiles.json"
import { useTheme } from "next-themes"
import { SoftSkillBadge } from "@/components/SoftSkillBadge"

interface Profile {
  id: number
  nome: string
  foto: string
  cargo: string
  area: string
  cidade: string
  habilidadesTecnicas: string[]
  softSkills: string[]
  experiencias: Array<{
    empresa: string
    cargo: string
    inicio: string
    fim: string
    descricao: string
  }>
  formacao: Array<{
    curso: string
    instituicao: string
    ano: number
  }>
  projetos: Array<{
    titulo: string
    link: string
    descricao: string
  }>
  certificacoes: string[]
  idiomas: Array<{
    idioma: string
    nivel: string
  }>
  areaInteresses: string[]
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArea, setSelectedArea] = useState<string>("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedTech, setSelectedTech] = useState<string>("all")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const { theme, setTheme } = useTheme()

  const profiles: Profile[] = profilesData

  // Extrair valores únicos para filtros
  const areas = useMemo(() => {
    const uniqueAreas = Array.from(new Set(profiles.map((p) => p.area)))
    return ["all", ...uniqueAreas]
  }, [profiles])

  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(profiles.map((p) => p.cidade)))
    return ["all", ...uniqueCities]
  }, [profiles])

  const technologies = useMemo(() => {
    const allTechs = profiles.flatMap((p) => p.habilidadesTecnicas)
    const uniqueTechs = Array.from(new Set(allTechs))
    return ["all", ...uniqueTechs.sort()]
  }, [profiles])

  // Filtrar perfis
  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesSearch =
        profile.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.habilidadesTecnicas.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesArea = selectedArea === "all" || profile.area === selectedArea
      const matchesCity = selectedCity === "all" || profile.cidade === selectedCity
      const matchesTech = selectedTech === "all" || profile.habilidadesTecnicas.includes(selectedTech)

      return matchesSearch && matchesArea && matchesCity && matchesTech
    })
  }, [profiles, searchTerm, selectedArea, selectedCity, selectedTech])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedArea("all")
    setSelectedCity("all")
    setSelectedTech("all")
  }

  const hasActiveFilters = searchTerm || selectedArea !== "all" || selectedCity !== "all" || selectedTech !== "all"

  const handleRecommend = (profile: Profile) => {
    alert(`Você recomendou ${profile.nome}! ✨`)
  }

  const handleMessage = (profile: Profile) => {
    alert(`Enviando mensagem para ${profile.nome}... 💬`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">ProfissionalNet</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Seção de Busca e Filtros */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, cargo, área ou tecnologia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-6 text-base"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
            </div>

            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area === "all" ? "Todas as Áreas" : area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city === "all" ? "Todas as Cidades" : city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTech} onValueChange={setSelectedTech}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tecnologia" />
              </SelectTrigger>
              <SelectContent>
                {technologies.map((tech) => (
                  <SelectItem key={tech} value={tech}>
                    {tech === "all" ? "Todas as Tecnologias" : tech}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="h-4 w-4" />
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Contagem de resultados */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredProfiles.length}{" "}
            {filteredProfiles.length === 1 ? "profissional encontrado" : "profissionais encontrados"}
          </p>
        </div>

        {/* Grade de cartões de perfil */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProfiles.map((profile) => (
            <Card
              key={profile.id}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
              onClick={() => setSelectedProfile(profile)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/10">
                    <AvatarImage src={profile.foto || "/placeholder.svg"} alt={profile.nome} />
                    <AvatarFallback>{profile.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <h3 className="mt-4 text-lg font-semibold text-foreground">{profile.nome}</h3>
                  <p className="text-sm text-muted-foreground">{profile.cargo}</p>

                  <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {profile.cidade}
                  </div>

                  <Badge variant="secondary" className="mt-3">
                    {profile.area}
                  </Badge>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {profile.habilidadesTecnicas.slice(0, 3).map((skill, index) => (
                      <SkillBadge key={index} skill={skill} className="text-xs" />
                    ))}
                    {profile.habilidadesTecnicas.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.habilidadesTecnicas.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">Nenhum profissional encontrado com os filtros selecionados.</p>
            <Button onClick={clearFilters} variant="outline" className="mt-4 bg-transparent">
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Janela de Perfil */}
      <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {selectedProfile && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 border-4 border-primary/10">
                    <AvatarImage src={selectedProfile.foto || "/placeholder.svg"} alt={selectedProfile.nome} />
                    <AvatarFallback>{selectedProfile.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl">{selectedProfile.nome}</DialogTitle>
                    <p className="text-muted-foreground">{selectedProfile.cargo}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {selectedProfile.cidade}
                      <Badge variant="secondary" className="ml-2">
                        {selectedProfile.area}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 flex gap-3">
                <Button onClick={() => handleRecommend(selectedProfile)} className="flex-1 gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Recomendar
                </Button>
                <Button onClick={() => handleMessage(selectedProfile)} variant="outline" className="flex-1 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </div>

              <Tabs defaultValue="sobre" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="sobre">Sobre</TabsTrigger>
                  <TabsTrigger value="experiencia">Experiência</TabsTrigger>
                  <TabsTrigger value="formacao">Formação</TabsTrigger>
                  <TabsTrigger value="projetos">Projetos</TabsTrigger>
                </TabsList>

                <TabsContent value="sobre" className="space-y-6">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Award className="h-5 w-5 text-primary" />
                      Habilidades Técnicas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.habilidadesTecnicas.map((skill, index) => (
                        <SkillBadge key={index} skill={skill} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Heart className="h-5 w-5 text-primary" />
                      Soft Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.softSkills.map((skill, index) => (
                        <SoftSkillBadge key={index} skill={skill} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Globe className="h-5 w-5 text-primary" />
                      Idiomas
                    </h4>
                    <div className="space-y-2">
                      {selectedProfile.idiomas.map((idioma, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{idioma.idioma}</span>
                          <Badge variant="secondary">{idioma.nivel}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Heart className="h-5 w-5 text-primary" />
                      Áreas de Interesse
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.areaInteresses.map((interesse, index) => (
                        <Badge key={index} variant="outline">
                          {interesse}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedProfile.certificacoes.length > 0 && (
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 font-semibold">
                        <Award className="h-5 w-5 text-primary" />
                        Certificações
                      </h4>
                      <ul className="space-y-2">
                        {selectedProfile.certificacoes.map((cert, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="experiencia" className="space-y-4">
                  {selectedProfile.experiencias.map((exp, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{exp.cargo}</h4>
                            <p className="text-sm text-muted-foreground">{exp.empresa}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {exp.inicio} - {exp.fim}
                          </Badge>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">{exp.descricao}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="formacao" className="space-y-4">
                  {selectedProfile.formacao.map((form, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{form.curso}</h4>
                            <p className="text-sm text-muted-foreground">{form.instituicao}</p>
                          </div>
                          <Badge variant="outline">{form.ano}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="projetos" className="space-y-4">
                  {selectedProfile.projetos.map((proj, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{proj.titulo}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">{proj.descricao}</p>
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center text-sm text-primary hover:underline"
                        >
                          Ver projeto →
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
