# Global_Solution-Front_End

# ProfissionalNet - Rede Profissional do Futuro

Uma aplicação web interativa desenvolvida com **React**, **Next.js** e **Tailwind CSS** que simula uma rede profissional voltada ao futuro do trabalho. A plataforma permite exibir e explorar perfis de profissionais cadastrados com informações completas sobre experiências, formação, projetos e habilidades.

## 📋 Resumo do Projeto

**ProfissionalNet** é uma Single Page Application (SPA) moderna que apresenta uma listagem de profissionais fictícios com dados simulados em JSON. Os usuários podem visualizar cards com informações básicas e abrir modais interativos com detalhes completos de cada perfil profissional.

## ✨ Funcionalidades

### Interface Principal
- **Cards de Profissionais**: Exibição em grid responsivo com foto, nome, cargo, cidade e principais habilidades
- **Modal Interativo**: Ao clicar em um card, abre-se um modal com informações detalhadas do profissional
- **Sistema de Busca**: Campo de busca que filtra por nome, cargo, área ou tecnologia em tempo real
- **Filtros Avançados**: 
  - Filtro por área profissional (Desenvolvimento, Design, Dados, etc.)
  - Filtro por cidade
  - Filtro por tecnologia específica
- **Dark Mode**: Alternância entre tema claro e escuro
- **Design Responsivo**: Interface adaptativa para desktop, tablet e mobile

### Informações do Perfil
O modal de detalhes exibe informações organizadas em abas:
- **Sobre**: Habilidades técnicas, soft skills, idiomas, áreas de interesse e certificações
- **Experiência**: Histórico profissional completo com empresas, cargos, períodos e descrições
- **Formação**: Educação acadêmica com cursos, instituições e anos de conclusão
- **Projetos**: Portfolio de projetos com títulos, links e descrições

### Botões de Ação
- **Recomendar Profissional**: Botão para recomendar o perfil
- **Enviar Mensagem**: Botão para iniciar contato

## 🗂️ Estrutura de Dados

O arquivo `data/profiles.json` contém **60 perfis simulados** com a seguinte estrutura:

\`\`\`json
{
  "id": 1,
  "nome": "Nome Completo",
  "foto": "/placeholder.svg?...",
  "cargo": "Cargo Atual / Título Profissional",
  "area": "Área de Atuação",
  "cidade": "Cidade",
  "habilidadesTecnicas": ["Python", "SQL", "React"],
  "softSkills": ["Comunicação", "Resiliência"],
  "experiencias": [{
    "empresa": "Empresa X",
    "cargo": "Analista",
    "inicio": "2022-01",
    "fim": "2
