import React from "react";
import { useBuddy } from "../providers/Buddy";

export const Schema = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div>
      <pre className='p-3 ml-5 bg-slate-100 drop-shadow-md text-sm overflow-x-scroll'>
        {buddy?.buddy && JSON.stringify(buddy.buddy, null, 2)}
      </pre>
    </div>
  );
};
