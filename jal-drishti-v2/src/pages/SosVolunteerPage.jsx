import React from 'react';
import { RegionSelector } from '../components/detection/RegionSelector';
import { VolunteerMatcher } from '../components/volunteer/VolunteerMatcher';

export function SosVolunteerPage() {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <RegionSelector />
      <VolunteerMatcher />
    </div>
  );
}
