import React from "react";
import { useBuddy } from "../providers/Buddy";
import { UseCaseCard } from "./UseCaseCard";

export const UseCases = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div>
      {buddy?.inputs &&
        buddy.inputs.map((input, index) => {
          return <UseCaseCard key={index} inputIndex={index} input={input} />;
        })}
    </div>
  );
};
