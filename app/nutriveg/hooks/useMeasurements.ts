import { useState, useEffect, useCallback } from "react";
import { MeasurementEntry } from "../types";

const STORAGE_KEY = "nutriveg_measurements_v1";

export const useMeasurements = () => {
  const [measurements, setMeasurements] = useState<MeasurementEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMeasurements(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading measurements", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(measurements));
    }
  }, [measurements, isLoaded]);

  const addMeasurement = useCallback((entry: Omit<MeasurementEntry, "id">) => {
    const newEntry: MeasurementEntry = {
      ...entry,
      id: `measure_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setMeasurements((prev) => 
      [...prev, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  }, []);

  const removeMeasurement = useCallback((id: string) => {
    setMeasurements((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMeasurement = useCallback((id: string, updates: Partial<MeasurementEntry>) => {
    setMeasurements((prev) => 
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  }, []);

  return {
    measurements,
    addMeasurement,
    removeMeasurement,
    updateMeasurement,
    isLoaded,
  };
};
