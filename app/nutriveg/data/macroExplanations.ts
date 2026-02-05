export interface MacroExplanation {
  brief: string;
  detailed: string;
}

export interface MacroExplanations {
  protein: MacroExplanation;
  carbs: MacroExplanation;
  fats: MacroExplanation;
  calories: MacroExplanation;
}

export const macroExplanations: MacroExplanations = {
  protein: {
    brief: "Essencial para músculos, recuperação e saciedade",
    detailed: `As proteínas são os blocos construtores do corpo, fundamentais para construção e reparação muscular, produção de enzimas e hormônios. Em dietas vegetarianas e veganas, é importante combinar diferentes fontes proteicas ao longo do dia (leguminosas, grãos integrais, oleaginosas) para garantir todos os aminoácidos essenciais. Uma ingestão adequada ajuda na recuperação pós-treino, mantém a massa muscular e promove maior sensação de saciedade entre as refeições.`,
  },
  carbs: {
    brief: "Principal fonte de energia para o corpo e cérebro",
    detailed: `Os carboidratos são a fonte primária de energia do organismo, especialmente importante para atividades físicas e função cerebral. Em dietas plant-based, priorize carboidratos complexos de grãos integrais, frutas e vegetais, que fornecem energia sustentada e são ricos em fibras, vitaminas e minerais. Evite os refinados em excesso. A quantidade ideal varia conforme seu nível de atividade física: mais ativos precisam de mais carboidratos para energia e recuperação muscular.`,
  },
  fats: {
    brief: "Importantes para hormônios, absorção de vitaminas e saciedade",
    detailed: `Os lipídios (gorduras) são essenciais para produção hormonal, absorção de vitaminas lipossolúveis (A, D, E, K) e saúde cerebral. Em dietas vegetarianas e veganas, foque em gorduras insaturadas de abacate, oleaginosas, sementes e azeite de oliva. Inclua fontes de ômega-3 (linhaça, chia, nozes) que são frequentemente deficientes em dietas plant-based. As gorduras também aumentam a saciedade e ajudam a controlar picos de glicemia quando consumidas junto com carboidratos.`,
  },
  calories: {
    brief: "Energia total consumida para manutenção e atividades diárias",
    detailed: `As calorias representam a energia total que você consome através dos alimentos. Seus três macronutrientes contribuem: proteínas e carboidratos fornecem 4 kcal por grama, enquanto lipídios fornecem 9 kcal por grama. Sua meta calórica deve ser baseada em seu metabolismo basal, nível de atividade física e objetivos (manutenção, ganho de massa ou perda de peso). Em dietas vegetarianas e veganas, é comum consumir menos calorias naturalmente devido ao alto teor de fibras, então monitore para garantir energia suficiente.`,
  },
};
