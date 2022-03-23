import React, { useState } from 'react';
import { Schema } from './Schema';
import { UseCases } from '../baseComponents/UseCases';

export const BuddyEditor = () => {
  return (
    <div className="w-full grid grid-cols-[47%_47%] gap-[6%]  h-screen">
      <UseCases />
      <Schema />
    </div>
  );
};
