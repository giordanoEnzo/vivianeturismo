import React from 'react';

export interface TravelPackage {
  id: number;
  destination: string;
  price: string;
  image: string;
  duration: string;
  description: string;
}

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ItineraryRequest {
  destination: string;
  days: number;
  budget: 'Baixo' | 'Médio' | 'Alto';
  interests: string;
}