import React from "react";
import { BuddyBuilderType } from "../types";
import { UseCaseCard } from "./UseCaseCard";

interface OwnProps {
  inputs: BuddyBuilderType[];
  
}

export const UseCases = ({
  inputs,
}: OwnProps): JSX.Element => {
  return (
    <div>
      {inputs.length > 0 &&
        inputs.map((input, index) => {
          return (
            <UseCaseCard
              key={index}
              input={input}
            />
          );
        })}
    </div>
  );
};
