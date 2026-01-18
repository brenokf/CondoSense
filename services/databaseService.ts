
import { RegulationItem, RegulationUpdate, Suggestion } from '../types';

const STORAGE_KEYS = {
  REGULATIONS: 'condosense_regulations',
  UPDATES: 'condosense_updates',
  SUGGESTIONS: 'condosense_suggestions',
  USER_ACK: 'condosense_user_acknowledged_version'
};

export const database = {
  // Simula o comportamento de busca do MongoDB
  async getRegulations(): Promise<RegulationItem[]> {
    const data = localStorage.getItem(STORAGE_KEYS.REGULATIONS);
    return data ? JSON.parse(data) : [];
  },

  async saveRegulations(items: RegulationItem[], updateInfo?: RegulationUpdate): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.REGULATIONS, JSON.stringify(items));
    if (updateInfo) {
      const updates = await this.getUpdates();
      updates.unshift(updateInfo);
      localStorage.setItem(STORAGE_KEYS.UPDATES, JSON.stringify(updates));
    }
  },

  async getUpdates(): Promise<RegulationUpdate[]> {
    const data = localStorage.getItem(STORAGE_KEYS.UPDATES);
    return data ? JSON.parse(data) : [];
  },

  async getLatestUpdate(): Promise<RegulationUpdate | null> {
    const updates = await this.getUpdates();
    return updates.length > 0 ? updates[0] : null;
  },

  async isVersionAcknowledged(versionId: string): Promise<boolean> {
    return localStorage.getItem(STORAGE_KEYS.USER_ACK) === versionId;
  },

  async acknowledgeVersion(versionId: string): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.USER_ACK, versionId);
  },

  // Operações de Sugestões
  async getSuggestions(): Promise<Suggestion[]> {
    const data = localStorage.getItem(STORAGE_KEYS.SUGGESTIONS);
    return data ? JSON.parse(data) : [];
  },

  async saveSuggestions(suggestions: Suggestion[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(suggestions));
  }
};
