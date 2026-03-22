"use client";
import React, { useState, useMemo } from "react";
import { useWorkouts, calcCaloriesFromHR, calcCaloriesFromMET } from "../../hooks/useWorkouts";
import { Profile } from "../../types/profile.types";
import { ACTIVITY_TYPES, ActivityType, StrengthExercise } from "../../types/workouts.types";
import { tokens } from "../../styles/tokens";
import { motion } from "framer-motion";

interface Props {
  onBack: () => void;
  profile: Profile;
}

type Tab = "atividades" | "corrida" | "musculacao";

// ─── HR Pacing Panel ────────────────────────────────────────────────────────
interface HRPanelProps {
  profile: Profile;
  hrResting: string;
  hrActive: string;
  duration: string;
  onHrRestingChange: (v: string) => void;
  onHrActiveChange: (v: string) => void;
}

const HRPanel: React.FC<HRPanelProps> = ({
  profile, hrResting, hrActive, duration,
  onHrRestingChange, onHrActiveChange,
}) => {
  const age = parseInt(profile.age) || 25;
  const weight = parseFloat(profile.weight) || 70;
  const gender = profile.gender === "female" ? "female" : "male";

  const hrMax = 220 - age;
  const hrReserve = hrResting ? hrMax - parseInt(hrResting) : null;

  // Zone boundaries (Karvonen)
  const zones = hrResting
    ? [
        { label: "Z1 – Recuperação", pct: "50–60%", min: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.5), max: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.6), color: "#60a5fa" },
        { label: "Z2 – Aeróbico leve", pct: "60–70%", min: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.6), max: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.7), color: "#34d399" },
        { label: "Z3 – Aeróbico", pct: "70–80%", min: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.7), max: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.8), color: "#fbbf24" },
        { label: "Z4 – Limiar", pct: "80–90%", min: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.8), max: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.9), color: "#f97316" },
        { label: "Z5 – Máximo", pct: "90–100%", min: Math.round(parseInt(hrResting) + (hrMax - parseInt(hrResting)) * 0.9), max: hrMax, color: "#ef4444" },
      ]
    : [];

  const caloriesPreview = useMemo(() => {
    if (hrActive && duration) {
      return calcCaloriesFromHR(gender, age, weight, parseInt(hrActive), parseFloat(duration));
    }
    return null;
  }, [hrActive, duration, gender, age, weight]);

  const activeZone = zones.find(
    (z) => hrActive && parseInt(hrActive) >= z.min && parseInt(hrActive) <= z.max
  );

  return (
    <div style={{ background: "#0f172a", borderRadius: tokens.radii.xl, padding: tokens.space.xl, marginBottom: tokens.space.lg, color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.lg }}>
        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
          <span style={{ fontSize: 24 }}>❤️</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Monitor de Frequência Cardíaca</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>FCmáx estimada: {hrMax} bpm · Gasto calórico preciso via HR</div>
          </div>
        </div>
        {caloriesPreview !== null && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#f97316" }}>{caloriesPreview}</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>kcal estimadas</div>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md, marginBottom: tokens.space.lg }}>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 8 }}>
            FC Repouso (bpm) <span style={{ color: "#64748b" }}>— em repouso, de manhã</span>
          </label>
          <input
            type="number"
            placeholder="Ex: 62"
            value={hrResting}
            onChange={(e) => onHrRestingChange(e.target.value)}
            style={{ ...darkInputStyle }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 8 }}>
            FC Ativa média (bpm) <span style={{ color: "#64748b" }}>— durante o treino</span>
          </label>
          <input
            type="number"
            placeholder="Ex: 145"
            value={hrActive}
            onChange={(e) => onHrActiveChange(e.target.value)}
            style={{ ...darkInputStyle, borderColor: activeZone?.color ?? "#334155" }}
          />
        </div>
      </div>

      {activeZone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: activeZone.color + "22",
            border: `2px solid ${activeZone.color}`,
            borderRadius: tokens.radii.lg,
            padding: `${tokens.space.sm}px ${tokens.space.md}px`,
            marginBottom: tokens.space.md,
            display: "flex",
            alignItems: "center",
            gap: tokens.space.sm,
          }}
        >
          <span style={{ fontSize: 18 }}>⚡</span>
          <div>
            <strong style={{ color: activeZone.color }}>{activeZone.label}</strong>
            <span style={{ color: "#94a3b8", fontSize: 13, marginLeft: 8 }}>{activeZone.min}–{activeZone.max} bpm</span>
          </div>
        </motion.div>
      )}

      {zones.length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: tokens.space.sm, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Zonas de treino (FC reserva)
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {zones.map((z) => {
              const isActive = hrActive && parseInt(hrActive) >= z.min && parseInt(hrActive) <= z.max;
              return (
                <div
                  key={z.label}
                  title={`${z.label}: ${z.min}–${z.max} bpm`}
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    background: z.color,
                    opacity: isActive ? 1 : 0.3,
                    transition: "opacity 0.3s",
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {zones.map((z) => (
              <div key={z.label} style={{ fontSize: 10, color: "#64748b", textAlign: "center", flex: 1 }}>{z.min}</div>
            ))}
          </div>
        </div>
      )}

      {!hrResting && (
        <div style={{ fontSize: 12, color: "#64748b", marginTop: tokens.space.sm, textAlign: "center" }}>
          💡 Insira sua FC repouso para ver as zonas de treino personalizadas
        </div>
      )}
    </div>
  );
};

// ─── Activity autocomplete ───────────────────────────────────────────────────
const ActivityPicker: React.FC<{
  value: string;
  onChange: (id: string, label: string) => void;
}> = ({ value, onChange }) => {
  const [query, setQuery] = useState(
    ACTIVITY_TYPES.find((a) => a.id === value)?.label ?? ""
  );
  const [open, setOpen] = useState(false);

  const filtered = query.length >= 1
    ? ACTIVITY_TYPES.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.category.includes(query.toLowerCase())
      )
    : ACTIVITY_TYPES;

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Ex: Boxe, Futebol, Muay Thai..."
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        style={inputStyle}
      />
      {open && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
          background: "white", border: `2px solid ${tokens.colors.border}`,
          borderRadius: tokens.radii.md, maxHeight: 220, overflowY: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}>
          {filtered.map((a) => (
            <div
              key={a.id}
              onMouseDown={() => {
                onChange(a.id, a.label);
                setQuery(a.label);
                setOpen(false);
              }}
              style={{
                padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: value === a.id ? tokens.colors.primaryLight : "white",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = tokens.colors.bg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = value === a.id ? tokens.colors.primaryLight : "white")}
            >
              <span>{a.emoji} {a.label}</span>
              <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>MET {a.met}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────
export const WorkoutsSection: React.FC<Props> = ({ onBack, profile }) => {
  const {
    cardioLogs, addCardioLog, removeCardioLog,
    strengthLogs, addStrengthLog, removeStrengthLog,
    activityLogs, addActivityLog, removeActivityLog,
  } = useWorkouts();

  const [tab, setTab] = useState<Tab>("atividades");
  const [showForm, setShowForm] = useState(false);

  // ── Shared HR state ──
  const [hrResting, setHrResting] = useState("");
  const [hrActive, setHrActive] = useState("");

  // ── Atividades form ──
  const [actDate, setActDate] = useState(new Date().toISOString().split("T")[0]);
  const [activityId, setActivityId] = useState("");
  const [activityLabel, setActivityLabel] = useState("");
  const [actDuration, setActDuration] = useState("");
  const [actNotes, setActNotes] = useState("");

  // ── Cardio form ──
  const [cardioDate, setCardioDate] = useState(new Date().toISOString().split("T")[0]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [cardioNotes, setCardioNotes] = useState("");

  // ── Strength form ──
  const [strengthDate, setStrengthDate] = useState(new Date().toISOString().split("T")[0]);
  const [strengthNotes, setStrengthNotes] = useState("");
  const [exercises, setExercises] = useState<Omit<StrengthExercise, "id">[]>([
    { name: "", muscleGroup: "", sets: [{ id: "s0", reps: 0, weight: 0 }], notes: "" },
  ]);

  const profileForCalc = useMemo(() => ({
    gender: profile.gender === "female" ? "female" as const : "male" as const,
    age: parseInt(profile.age) || 25,
    weight: parseFloat(profile.weight) || 70,
  }), [profile]);

  // ── Handlers ──
  const handleSaveActivity = () => {
    if (!activityId || !actDuration) return;
    addActivityLog({
      date: actDate,
      activityId,
      activityLabel,
      durationMinutes: parseFloat(actDuration),
      heartRateResting: hrResting ? parseInt(hrResting) : undefined,
      heartRateActive: hrActive ? parseInt(hrActive) : undefined,
      notes: actNotes,
    }, profileForCalc);
    setShowForm(false);
    setActivityId(""); setActivityLabel(""); setActDuration(""); setActNotes("");
    setHrActive("");
  };

  const handleSaveCardio = () => {
    if (!distance || !duration) return;
    addCardioLog({
      date: cardioDate,
      distanceKm: parseFloat(distance),
      durationMinutes: parseFloat(duration),
      heartRateResting: hrResting ? parseInt(hrResting) : undefined,
      heartRateActive: hrActive ? parseInt(hrActive) : undefined,
    }, profileForCalc);
    setShowForm(false);
    setDistance(""); setDuration(""); setCardioNotes("");
    setHrActive("");
  };

  const handleSaveStrength = () => {
    const withIds: StrengthExercise[] = exercises.map((ex, i) => ({
      ...ex,
      id: `ex_${Date.now()}_${i}`,
      sets: ex.sets.map((s, j) => ({ ...s, id: `set_${Date.now()}_${i}_${j}` })),
    }));
    addStrengthLog({ date: strengthDate, exercises: withIds, notes: strengthNotes });
    setShowForm(false);
    setStrengthNotes("");
    setExercises([{ name: "", muscleGroup: "", sets: [{ id: "s0", reps: 0, weight: 0 }], notes: "" }]);
  };

  const addExercise = () => {
    setExercises((prev) => [...prev, { name: "", muscleGroup: "", sets: [{ id: "s0", reps: 0, weight: 0 }], notes: "" }]);
  };

  const updateExercise = (idx: number, field: "name" | "muscleGroup" | "notes", value: string) => {
    setExercises((prev) => prev.map((ex, i) => i === idx ? { ...ex, [field]: value } : ex));
  };

  const addSet = (exIdx: number) => {
    setExercises((prev) => prev.map((ex, i) =>
      i === exIdx ? { ...ex, sets: [...ex.sets, { id: `s${ex.sets.length}`, reps: 0, weight: 0 }] } : ex
    ));
  };

  const updateSet = (exIdx: number, setIdx: number, field: "reps" | "weight", value: string) => {
    setExercises((prev) => prev.map((ex, i) =>
      i === exIdx
        ? { ...ex, sets: ex.sets.map((s, j) => j === setIdx ? { ...s, [field]: parseFloat(value) || 0 } : s) }
        : ex
    ));
  };

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: "atividades", label: "Esportes & Atividades", emoji: "🏅" },
    { id: "corrida", label: "Corrida / Cardio", emoji: "🏃" },
    { id: "musculacao", label: "Musculação", emoji: "🏋️" },
  ];

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: tokens.space.xl }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.xl }}>
        <button onClick={onBack} style={{ ...btnStyle, background: "white", color: tokens.colors.text, border: `1px solid ${tokens.colors.border}` }}>
          ← Voltar
        </button>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>Registro de Treinos</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ ...btnStyle, background: showForm ? tokens.colors.textMuted : tokens.colors.primary, color: "white" }}>
          {showForm ? "Cancelar" : "+ Novo Treino"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: tokens.space.sm, marginBottom: tokens.space.lg, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setShowForm(false); }}
            style={{
              ...btnStyle,
              background: tab === t.id ? tokens.colors.primary : "white",
              color: tab === t.id ? "white" : tokens.colors.text,
              border: `1px solid ${tab === t.id ? tokens.colors.primary : tokens.colors.border}`,
            }}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* ─── Form panels ─── */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          {/* HR Panel — shared across tabs */}
          <HRPanel
            profile={profile}
            hrResting={hrResting}
            hrActive={hrActive}
            duration={tab === "corrida" ? duration : actDuration}
            onHrRestingChange={setHrResting}
            onHrActiveChange={setHrActive}
          />

          {/* Atividades form */}
          {tab === "atividades" && (
            <div style={{ ...cardStyle, marginBottom: tokens.space.xl }}>
              <h3 style={{ marginBottom: tokens.space.md, fontSize: 18, fontWeight: 800 }}>Registrar Atividade</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md }}>
                <div>
                  <label style={labelStyle}>Data</label>
                  <input type="date" value={actDate} onChange={e => setActDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Duração (minutos)</label>
                  <input type="number" step="1" placeholder="Ex: 60" value={actDuration} onChange={e => setActDuration(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Atividade</label>
                  <ActivityPicker value={activityId} onChange={(id, label) => { setActivityId(id); setActivityLabel(label); }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Notas</label>
                  <input type="text" placeholder="Como foi..." value={actNotes} onChange={e => setActNotes(e.target.value)} style={inputStyle} />
                </div>
              </div>
              {activityId && actDuration && (
                <CaloriePreview
                  activityId={activityId}
                  durationMinutes={parseFloat(actDuration) || 0}
                  hrActive={hrActive ? parseInt(hrActive) : undefined}
                  hrResting={hrResting ? parseInt(hrResting) : undefined}
                  profile={profileForCalc}
                />
              )}
              <button onClick={handleSaveActivity} disabled={!activityId || !actDuration} style={{ ...btnStyle, background: tokens.colors.primary, color: "white", width: "100%", marginTop: tokens.space.lg, height: 48, opacity: (!activityId || !actDuration) ? 0.5 : 1 }}>
                Salvar Atividade
              </button>
            </div>
          )}

          {/* Cardio/Corrida form */}
          {tab === "corrida" && (
            <div style={{ ...cardStyle, marginBottom: tokens.space.xl }}>
              <h3 style={{ marginBottom: tokens.space.md, fontSize: 18, fontWeight: 800 }}>Registrar Corrida</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md }}>
                <div>
                  <label style={labelStyle}>Data</label>
                  <input type="date" value={cardioDate} onChange={e => setCardioDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Distância (km)</label>
                  <input type="number" step="0.1" placeholder="Ex: 5.5" value={distance} onChange={e => setDistance(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Duração (minutos)</label>
                  <input type="number" step="1" placeholder="Ex: 30" value={duration} onChange={e => setDuration(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Notas</label>
                  <input type="text" placeholder="Como foi o treino..." value={cardioNotes} onChange={e => setCardioNotes(e.target.value)} style={inputStyle} />
                </div>
              </div>
              {distance && duration && (
                <div style={{ marginTop: tokens.space.md, padding: tokens.space.md, background: tokens.colors.primaryLight, borderRadius: tokens.radii.md }}>
                  <strong style={{ color: tokens.colors.primary }}>
                    Pace: {(() => { const p = parseFloat(duration) / parseFloat(distance); const m = Math.floor(p); const s = Math.round((p - m) * 60); return `${m}:${s.toString().padStart(2, "0")} /km`; })()}
                  </strong>
                  {hrActive && (
                    <span style={{ marginLeft: 16, color: tokens.colors.primary }}>
                      · ~{calcCaloriesFromHR(profileForCalc.gender, profileForCalc.age, profileForCalc.weight, parseInt(hrActive), parseFloat(duration))} kcal (via FC)
                    </span>
                  )}
                </div>
              )}
              <button onClick={handleSaveCardio} disabled={!distance || !duration} style={{ ...btnStyle, background: tokens.colors.primary, color: "white", width: "100%", marginTop: tokens.space.lg, height: 48, opacity: (!distance || !duration) ? 0.5 : 1 }}>
                Salvar Corrida
              </button>
            </div>
          )}

          {/* Musculação form */}
          {tab === "musculacao" && (
            <div style={{ ...cardStyle, marginBottom: tokens.space.xl }}>
              <h3 style={{ marginBottom: tokens.space.md, fontSize: 18, fontWeight: 800 }}>Registrar Musculação</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md, marginBottom: tokens.space.md }}>
                <div>
                  <label style={labelStyle}>Data</label>
                  <input type="date" value={strengthDate} onChange={e => setStrengthDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Notas gerais</label>
                  <input type="text" placeholder="Como foi..." value={strengthNotes} onChange={e => setStrengthNotes(e.target.value)} style={inputStyle} />
                </div>
              </div>
              {exercises.map((ex, exIdx) => (
                <div key={exIdx} style={{ background: tokens.colors.bg, borderRadius: tokens.radii.md, padding: tokens.space.md, marginBottom: tokens.space.md }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.sm, marginBottom: tokens.space.sm }}>
                    <div>
                      <label style={labelStyle}>Exercício</label>
                      <input type="text" placeholder="Ex: Supino Reto" value={ex.name} onChange={e => updateExercise(exIdx, "name", e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Grupo Muscular</label>
                      <input type="text" placeholder="Ex: Peito" value={ex.muscleGroup} onChange={e => updateExercise(exIdx, "muscleGroup", e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  {ex.sets.map((s, setIdx) => (
                    <div key={setIdx} style={{ display: "flex", gap: tokens.space.sm, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: tokens.colors.textMuted, minWidth: 54 }}>Série {setIdx + 1}</span>
                      <input type="number" placeholder="Reps" value={s.reps || ""} onChange={e => updateSet(exIdx, setIdx, "reps", e.target.value)} style={{ ...inputStyle, width: 80 }} />
                      <input type="number" placeholder="Kg" step="0.5" value={s.weight || ""} onChange={e => updateSet(exIdx, setIdx, "weight", e.target.value)} style={{ ...inputStyle, width: 80 }} />
                    </div>
                  ))}
                  <button onClick={() => addSet(exIdx)} style={{ ...btnStyle, background: "white", color: tokens.colors.primary, border: `1px solid ${tokens.colors.primary}`, fontSize: 13 }}>
                    + Série
                  </button>
                </div>
              ))}
              <button onClick={addExercise} style={{ ...btnStyle, background: "white", color: tokens.colors.text, border: `1px solid ${tokens.colors.border}`, marginRight: tokens.space.sm }}>
                + Exercício
              </button>
              <button onClick={handleSaveStrength} style={{ ...btnStyle, background: tokens.colors.primary, color: "white", width: "100%", marginTop: tokens.space.lg, height: 48 }}>
                Salvar Treino
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── Logs ─── */}
      <div>
        {tab === "atividades" && (
          <>
            <h3 style={sectionTitle}>Histórico de Atividades</h3>
            {activityLogs.length === 0 ? <EmptyState text="Nenhuma atividade registrada ainda." /> :
              activityLogs.map(log => {
                const def = ACTIVITY_TYPES.find(a => a.id === log.activityId);
                return (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={log.id} style={{ ...cardStyle, marginBottom: tokens.space.md, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
                        <span style={{ fontSize: 22 }}>{def?.emoji ?? "🏅"}</span>
                        <strong style={{ fontSize: 17 }}>{log.activityLabel}</strong>
                        <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>{new Date(log.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</span>
                      </div>
                      <div style={{ display: "flex", gap: tokens.space.lg, marginTop: tokens.space.sm, flexWrap: "wrap" }}>
                        <span style={metricStyle}>⏱ {log.durationMinutes} min</span>
                        <span style={{ ...metricStyle, color: "#f97316", fontWeight: 700 }}>🔥 {log.caloriesBurned} kcal</span>
                        {log.heartRateActive && <span style={metricStyle}>❤️ {log.heartRateActive} bpm</span>}
                        {def && <span style={metricStyle}>MET {def.met}</span>}
                      </div>
                      {log.notes && <div style={{ fontSize: 13, color: tokens.colors.textMuted, marginTop: 4, fontStyle: "italic" }}>"{log.notes}"</div>}
                    </div>
                    <button onClick={() => removeActivityLog(log.id)} style={deleteBtnStyle}>Excluir</button>
                  </motion.div>
                );
              })}
          </>
        )}

        {tab === "corrida" && (
          <>
            <h3 style={sectionTitle}>Histórico de Corridas</h3>
            {cardioLogs.length === 0 ? <EmptyState text="Nenhuma corrida registrada ainda." /> :
              cardioLogs.map(log => (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={log.id} style={{ ...cardStyle, marginBottom: tokens.space.md, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: 17 }}>🏃 {new Date(log.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</strong>
                    <div style={{ display: "flex", gap: tokens.space.lg, marginTop: tokens.space.sm, flexWrap: "wrap" }}>
                      <span style={metricStyle}><strong>{log.distanceKm}</strong> km</span>
                      <span style={metricStyle}><strong>{log.durationMinutes}</strong> min</span>
                      <span style={metricStyle}>⚡ {log.pace}</span>
                      {log.caloriesBurned && <span style={{ ...metricStyle, color: "#f97316", fontWeight: 700 }}>🔥 {log.caloriesBurned} kcal</span>}
                      {log.heartRateActive && <span style={metricStyle}>❤️ {log.heartRateActive} bpm</span>}
                    </div>
                    {log.notes && <div style={{ fontSize: 13, color: tokens.colors.textMuted, marginTop: 4, fontStyle: "italic" }}>"{log.notes}"</div>}
                  </div>
                  <button onClick={() => removeCardioLog(log.id)} style={deleteBtnStyle}>Excluir</button>
                </motion.div>
              ))}
          </>
        )}

        {tab === "musculacao" && (
          <>
            <h3 style={sectionTitle}>Histórico de Musculação</h3>
            {strengthLogs.length === 0 ? <EmptyState text="Nenhum treino de musculação registrado." /> :
              strengthLogs.map(log => (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={log.id} style={{ ...cardStyle, marginBottom: tokens.space.md }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.md }}>
                    <strong style={{ fontSize: 17 }}>🏋️ {new Date(log.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</strong>
                    <button onClick={() => removeStrengthLog(log.id)} style={deleteBtnStyle}>Excluir</button>
                  </div>
                  {log.exercises.map(ex => (
                    <div key={ex.id} style={{ marginBottom: tokens.space.sm }}>
                      <span style={{ fontWeight: 700 }}>{ex.name}</span>
                      {ex.muscleGroup && <span style={{ fontSize: 12, color: tokens.colors.textMuted, marginLeft: 8 }}>{ex.muscleGroup}</span>}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                        {ex.sets.map((s, i) => (
                          <span key={s.id} style={{ fontSize: 13, color: tokens.colors.textMuted, background: tokens.colors.bg, padding: "2px 8px", borderRadius: 8 }}>
                            S{i + 1}: {s.reps}×{s.weight}kg
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {log.notes && <div style={{ fontSize: 13, color: tokens.colors.textMuted, marginTop: 4, fontStyle: "italic" }}>"{log.notes}"</div>}
                </motion.div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

// ─── Calorie preview ─────────────────────────────────────────────────────────
const CaloriePreview: React.FC<{
  activityId: string;
  durationMinutes: number;
  hrActive?: number;
  hrResting?: number;
  profile: { gender: "male" | "female"; age: number; weight: number };
}> = ({ activityId, durationMinutes, hrActive, profile }) => {
  const def = ACTIVITY_TYPES.find((a) => a.id === activityId);
  if (!def || !durationMinutes) return null;

  const metCalories = calcCaloriesFromMET(def.met, profile.weight, durationMinutes);
  const hrCalories = hrActive
    ? calcCaloriesFromHR(profile.gender, profile.age, profile.weight, hrActive, durationMinutes)
    : null;

  return (
    <div style={{ marginTop: tokens.space.md, padding: tokens.space.md, background: tokens.colors.primaryLight, borderRadius: tokens.radii.md, display: "flex", gap: tokens.space.xl, alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 12, color: tokens.colors.primary, fontWeight: 700 }}>Via MET ({def.met})</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: tokens.colors.primary }}>~{metCalories} kcal</div>
      </div>
      {hrCalories !== null && (
        <>
          <div style={{ color: tokens.colors.primary, fontSize: 20 }}>→</div>
          <div>
            <div style={{ fontSize: 12, color: "#f97316", fontWeight: 700 }}>Via FC (mais preciso)</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f97316" }}>~{hrCalories} kcal</div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const EmptyState: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ textAlign: "center", padding: tokens.space.xxl, background: "white", borderRadius: tokens.radii.xl, border: `1px solid ${tokens.colors.border}`, color: tokens.colors.textMuted }}>
    {text}
  </div>
);

const cardStyle: React.CSSProperties = {
  background: "white", padding: tokens.space.xl, borderRadius: tokens.radii.xl, border: `1px solid ${tokens.colors.border}`,
};
const btnStyle: React.CSSProperties = {
  padding: `${tokens.space.sm}px ${tokens.space.lg}px`, borderRadius: tokens.radii.md, border: "none", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
};
const deleteBtnStyle: React.CSSProperties = {
  padding: tokens.space.sm, background: tokens.colors.red + "10", border: "none", color: tokens.colors.red, borderRadius: tokens.radii.sm, cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap",
};
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: 8 };
const inputStyle: React.CSSProperties = { width: "100%", padding: tokens.space.md, borderRadius: tokens.radii.md, border: `2px solid ${tokens.colors.border}`, fontSize: 15, outline: "none", boxSizing: "border-box" };
const darkInputStyle: React.CSSProperties = { width: "100%", padding: tokens.space.md, borderRadius: tokens.radii.md, border: `2px solid #334155`, fontSize: 15, outline: "none", background: "#1e293b", color: "white", boxSizing: "border-box" };
const metricStyle: React.CSSProperties = { fontSize: 14, color: tokens.colors.textMuted };
const sectionTitle: React.CSSProperties = { marginBottom: tokens.space.lg, fontSize: 20, fontWeight: 800 };
