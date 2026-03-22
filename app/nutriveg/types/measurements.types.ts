export interface MeasurementEntry {
  id: string;
  date: string; // Formato YYYY-MM-DD
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  waist?: number;
  chest?: number;
  hips?: number;
  arms?: number;
  legs?: number;
  dietPhase?: string; // e.g., "Bulking", "Cutting", "Manutenção"
  notes?: string;
}
