
import { RuleCategory, RegulationItem } from './types';

export const INITIAL_REGULATIONS: RegulationItem[] = [
  {
    id: '1',
    title: 'Horário de Silêncio',
    category: RuleCategory.NOISE,
    content: 'O horário de silêncio deve ser rigorosamente respeitado entre 22:00 e 08:00 nos dias úteis, e das 23:00 às 09:00 nos fins de semana. Durante este período, qualquer ruído que possa ser ouvido fora da unidade privada é proibido.',
    summary: 'Sem barulho excessivo após as 22h (úteis) ou 23h (finais de semana).',
    explanation: 'Esta regra garante que todos os moradores possam desfrutar de um ambiente de descanso, especialmente aqueles com horários matutinos ou famílias com crianças pequenas.',
    importance: 'Fundamental para a harmonia comunitária e bem-estar mental.',
    tags: ['silêncio', 'noite', 'fim de semana', 'multas']
  },
  {
    id: '2',
    title: 'Conduta na Área da Piscina',
    category: RuleCategory.COMMON_AREAS,
    content: 'A piscina funciona das 08:00 às 21:00. Recipientes de vidro são estritamente proibidos na área. Crianças menores de 12 anos devem estar acompanhadas por um adulto responsável em tempo integral.',
    summary: 'Piscina: 8h às 21h. Proibido vidro. Supervisione crianças.',
    explanation: 'O vidro cria riscos significativos de segurança se quebrado em áreas molhadas. A supervisão evita acidentes e garante o uso correto dos equipamentos.',
    importance: 'Essencial para a segurança e higiene dos espaços de lazer compartilhados.',
    tags: ['piscina', 'lazer', 'segurança', 'crianças']
  },
  {
    id: '3',
    title: 'Registro de Animais e Uso de Guia',
    category: RuleCategory.PETS,
    content: 'Todos os animais de estimação devem ser registrados na administração. Os pets devem estar na guia em todas as áreas comuns. Os proprietários são responsáveis pela limpeza imediata de quaisquer dejetos.',
    summary: 'Registre seu pet, use guia e limpe a sujeira.',
    explanation: 'O registro ajuda em emergências. O uso de guias evita interações indesejadas com moradores que podem ter medo ou alergias.',
    importance: 'Promove a higiene e evita conflitos entre donos e não-donos de pets.',
    tags: ['cães', 'gatos', 'higiene', 'registro']
  }
];

export const CATEGORY_ICONS: Record<RuleCategory, string> = {
  [RuleCategory.GENERAL]: '📋',
  [RuleCategory.NOISE]: '🔇',
  [RuleCategory.PETS]: '🐾',
  [RuleCategory.PARKING]: '🚗',
  [RuleCategory.COMMON_AREAS]: '🏢',
  [RuleCategory.RENOVATIONS]: '🛠️',
  [RuleCategory.SECURITY]: '🛡️',
  [RuleCategory.WASTE]: '♻️',
  [RuleCategory.FEES]: '💰',
  [RuleCategory.MEETINGS]: '🤝'
};
