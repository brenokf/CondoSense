
export enum RuleCategory {
  GENERAL = 'Geral',
  NOISE = 'Silêncio e Ruídos',
  PETS = 'Animais de Estimação',
  PARKING = 'Garagem e Tráfego',
  COMMON_AREAS = 'Áreas Comuns e Lazer',
  RENOVATIONS = 'Obras e Reformas',
  SECURITY = 'Segurança e Acesso',
  WASTE = 'Lixo e Sustentabilidade',
  FEES = 'Taxas e Multas',
  MEETINGS = 'Assembleias e Gestão'
}

export type UserRole = 'admin' | 'morador';

export interface RegulationItem {
  id: string;
  title: string;
  category: RuleCategory;
  content: string;
  summary: string;
  explanation: string;
  importance: string;
  tags: string[];
}

export interface AccessibilityConfig {
  fontSize: number;
  highContrast: boolean;
  darkMode: boolean;
}

export interface ProcessingState {
  isAnalyzing: boolean;
  progress: number;
  message: string;
}
