
import React from 'react';
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

export const CATEGORY_ICONS: Record<RuleCategory, React.ReactNode> = {
  [RuleCategory.GENERAL]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  [RuleCategory.NOISE]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>,
  [RuleCategory.PETS]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0zM12 13v2" /></svg>,
  [RuleCategory.PARKING]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l.5-1.5a2 2 0 011.9-1.5h9.2a2 2 0 011.9 1.5l.5 1.5m-14 0v5a2 2 0 002 2h14a2 2 0 002-2v-5m-18 0h18M7 15h.01M17 15h.01" /></svg>,
  [RuleCategory.COMMON_AREAS]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  [RuleCategory.RENOVATIONS]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
  [RuleCategory.SECURITY]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  [RuleCategory.WASTE]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  [RuleCategory.FEES]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  [RuleCategory.MEETINGS]: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
};
