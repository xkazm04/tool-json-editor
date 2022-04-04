import React from 'react';
import { UseCases } from '../baseComponents/UseCases';
import { EditSection } from './EditSection';

export const BuddyEditor = () => {
  return (
    <div className="w-full grid grid-cols-[48%_48%] gap-[2%] h-screen">
      <UseCases />
      <EditSection />
    </div>
  );
};
