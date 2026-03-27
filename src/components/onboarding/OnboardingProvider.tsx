'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type TourId =
  | 'general'
  | 'tracking'
  | 'crossTabs'
  | 'simulacoes'
  | 'sessoes'
  | 'sessaoIndividual'
  | 'clipes'
  | 'sentimentos'
  | 'alertas'
  | 'sintese'
  | 'causaEfeito';

interface ToursCompleted {
  [key: string]: boolean;
}

interface OnboardingContextType {
  isTourCompleted: (tourId: TourId) => boolean;
  completeTour: (tourId: TourId) => void;
  resetTour: (tourId: TourId) => void;
  resetAllTours: () => void;
  activeTour: TourId | null;
  startTour: (tourId: TourId) => void;
  stopTour: () => void;
  isRunning: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const STORAGE_KEY = 'horus-tours';

function loadCompleted(): ToursCompleted {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCompleted(data: ToursCompleted) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<ToursCompleted>({});
  const [activeTour, setActiveTour] = useState<TourId | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  const isTourCompleted = useCallback((tourId: TourId) => !!completed[tourId], [completed]);

  const completeTour = useCallback((tourId: TourId) => {
    setCompleted((prev) => {
      const next = { ...prev, [tourId]: true };
      saveCompleted(next);
      return next;
    });
    setActiveTour(null);
    setIsRunning(false);
  }, []);

  const resetTour = useCallback((tourId: TourId) => {
    setCompleted((prev) => {
      const next = { ...prev, [tourId]: false };
      saveCompleted(next);
      return next;
    });
  }, []);

  const resetAllTours = useCallback(() => {
    setCompleted({});
    saveCompleted({});
  }, []);

  const startTour = useCallback((tourId: TourId) => {
    setActiveTour(tourId);
    setIsRunning(true);
  }, []);

  const stopTour = useCallback(() => {
    setActiveTour(null);
    setIsRunning(false);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        isTourCompleted,
        completeTour,
        resetTour,
        resetAllTours,
        activeTour,
        startTour,
        stopTour,
        isRunning
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
