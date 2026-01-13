import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TripData {
  id: string;
  destination: string;
  budget: number;
  duration: number;
  people: number;
  month: string;
  createdAt: Date;
}

export interface TripResult extends TripData {
  breakdown: {
    travel: number;
    stay: number;
    food: number;
    activities: number;
    miscellaneous: number;
  };
  totalEstimated: number;
  isSufficient: boolean;
  extraRequired: number;
  aiRecommendation: string;
}

interface TripContextType {
  trips: TripResult[];
  currentTrip: TripResult | null;
  createTrip: (data: Omit<TripData, 'id' | 'createdAt'>) => TripResult;
  selectTrip: (id: string) => void;
  clearCurrentTrip: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

// AI Recommendations based on budget status
const getAIRecommendation = (isSufficient: boolean, destination: string, extraRequired: number): string => {
  if (isSufficient) {
    return `Great news! Your budget for ${destination} looks solid. Consider setting aside 10-15% for unexpected expenses or spontaneous experiences. Pro tip: Book activities in advance to secure better rates and availability. You might even have room for a special dining experience or a unique local tour!`;
  }
  return `Your ${destination} trip needs approximately $${extraRequired.toLocaleString()} more to be comfortable. Consider these options: 1) Extend your trip planning by 2-3 months to save more 2) Look for off-season travel dates for 20-30% savings 3) Consider alternative accommodations like Airbnb or hostels 4) Use travel reward points or credit card benefits.`;
};

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<TripResult[]>([]);
  const [currentTrip, setCurrentTrip] = useState<TripResult | null>(null);

  const createTrip = (data: Omit<TripData, 'id' | 'createdAt'>): TripResult => {
    // Generate realistic expense breakdown based on inputs
    const dailyTravelCost = 50 + Math.random() * 100;
    const dailyStayCost = 80 + Math.random() * 150;
    const dailyFoodCost = 40 + Math.random() * 60;
    const dailyActivitiesCost = 30 + Math.random() * 80;
    const dailyMiscCost = 20 + Math.random() * 40;

    const breakdown = {
      travel: Math.round(dailyTravelCost * data.duration * data.people),
      stay: Math.round(dailyStayCost * data.duration),
      food: Math.round(dailyFoodCost * data.duration * data.people),
      activities: Math.round(dailyActivitiesCost * data.duration * data.people),
      miscellaneous: Math.round(dailyMiscCost * data.duration * data.people),
    };

    const totalEstimated = Object.values(breakdown).reduce((a, b) => a + b, 0);
    const isSufficient = data.budget >= totalEstimated;
    const extraRequired = isSufficient ? 0 : totalEstimated - data.budget;

    const tripResult: TripResult = {
      ...data,
      id: `trip_${Date.now()}`,
      createdAt: new Date(),
      breakdown,
      totalEstimated,
      isSufficient,
      extraRequired,
      aiRecommendation: getAIRecommendation(isSufficient, data.destination, extraRequired),
    };

    setTrips(prev => [...prev, tripResult]);
    setCurrentTrip(tripResult);
    return tripResult;
  };

  const selectTrip = (id: string) => {
    const trip = trips.find(t => t.id === id);
    if (trip) {
      setCurrentTrip(trip);
    }
  };

  const clearCurrentTrip = () => {
    setCurrentTrip(null);
  };

  return (
    <TripContext.Provider value={{ trips, currentTrip, createTrip, selectTrip, clearCurrentTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
