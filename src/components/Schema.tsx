import React from "react";
import { useBuddy } from "../providers/Buddy";

export const Schema = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div>
      <pre className='p-3'>
        {buddy?.buddy && JSON.stringify(buddy.buddy, null, 2)}
      </pre>
    </div>
  );
};
