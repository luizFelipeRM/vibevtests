import React, { useState } from "react";
import { MeasurementEntry } from "../../types";
import { useMeasurements } from "../../hooks/useMeasurements";
import { tokens } from "../../styles/tokens";
import { motion } from "framer-motion";

interface Props {
  onBack: () => void;
  currentDate: Date;
}

export const MeasurementsSection: React.FC<Props> = ({ onBack, currentDate }) => {
  const { measurements, addMeasurement, removeMeasurement } = useMeasurements();
  const [showForm, setShowForm] = useState(false);
  
  // Form states
  const [date, setDate] = useState(currentDate.toISOString().split('T')[0]);
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [waist, setWaist] = useState("");
  const [arms, setArms] = useState("");
  const [legs, setLegs] = useState("");
  const [dietPhase, setDietPhase] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    addMeasurement({
      date,
      weight: weight ? parseFloat(weight) : undefined,
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      arms: arms ? parseFloat(arms) : undefined,
      legs: legs ? parseFloat(legs) : undefined,
      dietPhase,
      notes
    });
    setShowForm(false);
    // reset
    setWeight(""); setBodyFat(""); setWaist(""); setArms(""); setLegs(""); setDietPhase(""); setNotes("");
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: tokens.space.xl }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.xl }}>
         <button onClick={onBack} style={{ ...btnStyle, background: "white", color: tokens.colors.text, border: `1px solid ${tokens.colors.border}` }}>
           ← Voltar ao Dashboard
         </button>
         <h2 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>Evolução Corporal</h2>
         <button onClick={() => setShowForm(!showForm)} style={{ ...btnStyle, background: showForm ? tokens.colors.textMuted : tokens.colors.primary, color: "white" }}>
            {showForm ? "Cancelar" : "+ Nova Avaliação"}
         </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ ...cardStyle, marginBottom: tokens.space.xl }}>
          <h3 style={{ marginBottom: tokens.space.md, fontSize: 18, fontWeight: 800 }}>Registrar Medidas</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md }}>
             <div>
               <label style={labelStyle}>Data da Avaliação</label>
               <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
             </div>
             <div>
               <label style={labelStyle}>Fase / Dieta Atual (Ex: Pré-Competição, Bulking)</label>
               <input type="text" placeholder="Contexto da dieta ou treino..." value={dietPhase} onChange={e => setDietPhase(e.target.value)} style={inputStyle} />
             </div>
             <div>
               <label style={labelStyle}>Peso (kg)</label>
               <input type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} style={inputStyle} />
             </div>
             <div>
               <label style={labelStyle}>Gordura Corporal (%)</label>
               <input type="number" step="0.1" value={bodyFat} onChange={e => setBodyFat(e.target.value)} style={inputStyle} />
             </div>
             <div>
               <label style={labelStyle}>Cintura (cm)</label>
               <input type="number" step="0.1" value={waist} onChange={e => setWaist(e.target.value)} style={inputStyle} />
             </div>
             <div>
               <label style={labelStyle}>Braços (cm)</label>
               <input type="number" step="0.1" value={arms} onChange={e => setArms(e.target.value)} style={inputStyle} />
             </div>
             <div>
               <label style={labelStyle}>Pernas (cm)</label>
               <input type="number" step="0.1" value={legs} onChange={e => setLegs(e.target.value)} style={inputStyle} />
             </div>
             <div>
               <label style={labelStyle}>Notas</label>
               <input type="text" placeholder="Detalhes, como se sentiu..." value={notes} onChange={e => setNotes(e.target.value)} style={inputStyle} />
             </div>
          </div>
          <button onClick={handleSave} style={{ ...btnStyle, background: tokens.colors.primary, color: "white", width: "100%", marginTop: tokens.space.lg, height: 48 }}>
             Salvar Registro
          </button>
        </motion.div>
      )}

      <div>
        <h3 style={{ marginBottom: tokens.space.lg, fontSize: 20, fontWeight: 800 }}>Histórico de Avaliações</h3>
        {measurements.length === 0 ? (
          <div style={{ textAlign: "center", padding: tokens.space.xxl, background: "white", borderRadius: tokens.radii.xl, border: `1px solid ${tokens.colors.border}`, color: tokens.colors.textMuted }}>
             Nenhuma avaliação registrada ainda. Adicione a sua primeira!
          </div>
        ) : (
          measurements.map(m => (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={m.id} style={{ ...cardStyle, marginBottom: tokens.space.md, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
                  <strong style={{ fontSize: 18, color: tokens.colors.text }}>
                    {new Date(m.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                  </strong>
                  {m.dietPhase && (
                    <span style={{ padding: "4px 10px", background: tokens.colors.primaryLight, color: tokens.colors.primary, borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                      {m.dietPhase}
                    </span>
                  )}
                </div>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.space.lg, marginTop: tokens.space.md }}>
                  {m.weight && <span style={metricStyle}>⚖️ <strong style={{ color: tokens.colors.text }}>{m.weight}</strong> kg</span>}
                  {m.bodyFat && <span style={metricStyle}>🔥 <strong style={{ color: tokens.colors.text }}>{m.bodyFat}</strong> % Fat</span>}
                  {m.waist && <span style={metricStyle}>📏 Cintura: <strong>{m.waist}</strong> cm</span>}
                  {m.arms && <span style={metricStyle}>💪 Braços: <strong>{m.arms}</strong> cm</span>}
                  {m.legs && <span style={metricStyle}>🦵 Pernas: <strong>{m.legs}</strong> cm</span>}
                </div>
                {m.notes && <div style={{ fontSize: 13, color: tokens.colors.textMuted, marginTop: tokens.space.sm, fontStyle: "italic" }}>"{m.notes}"</div>}
              </div>
              <button onClick={() => removeMeasurement(m.id)} style={{ padding: tokens.space.sm, background: tokens.colors.red + "10", border: "none", color: tokens.colors.red, borderRadius: tokens.radii.sm, cursor: "pointer", fontWeight: 700 }}>
                Excluir
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const cardStyle = {
  background: "white", padding: tokens.space.xl, borderRadius: tokens.radii.xl, border: `1px solid ${tokens.colors.border}`,
};
const btnStyle = {
  padding: `${tokens.space.sm}px ${tokens.space.lg}px`, borderRadius: tokens.radii.md, border: "none", fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
};
const labelStyle = { display: "block", fontSize: 13, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: 8 };
const inputStyle = { width: "100%", padding: tokens.space.md, borderRadius: tokens.radii.md, border: `2px solid ${tokens.colors.border}`, fontSize: 15, outline: "none" };
const metricStyle = { fontSize: 14, color: tokens.colors.textMuted };
