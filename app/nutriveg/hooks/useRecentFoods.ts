import { useState, useEffect } from "react";
import { saveRecentFoods, loadRecentFoods } from "../utils/localStorage";

const MAX_RECENT_FOODS = 5;

/**
 * Hook para gerenciar alimentos recentes
 * Mantém os últimos 5 alimentos adicionados pelo usuário
 */
export function useRecentFoods() {
  const [recentFoods, setRecentFoods] = useState<string[]>([]);

  // Carregar do localStorage no mount
  useEffect(() => {
    const saved = loadRecentFoods();
    if (saved.length > 0) {
      setRecentFoods(saved);
    }
  }, []);

  /**
   * Adiciona um novo alimento à lista de recentes
   * - Adiciona no topo da lista
   * - Remove duplicatas (mantém apenas a adição mais recente)
   * - Mantém apenas os últimos 5 alimentos
   * - Salva no localStorage automaticamente
   */
  const addRecentFood = (foodName: string) => {
    setRecentFoods((prev) => {
      // Remove duplicatas (se o alimento já existe)
      const filtered = prev.filter((name) => name !== foodName);

      // Adiciona no topo
      const updated = [foodName, ...filtered];

      // Mantém apenas os últimos 5
      const trimmed = updated.slice(0, MAX_RECENT_FOODS);

      // Salva no localStorage
      saveRecentFoods(trimmed);

      return trimmed;
    });
  };

  return { recentFoods, addRecentFood };
}
