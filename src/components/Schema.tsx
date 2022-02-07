import React from "react";
import { useBuddy } from "../providers/Buddy";

export const Schema = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <>
      {buddy?.buddy && (
        <div className="bg-glass rounded-lg">
          <pre className="py-5 px-3 ml-5 max-h-[80vh] fancy-scrollbar overflow-x-auto overflow-y-auto text-white  drop-shadow-md text-sm rounded-xl ">
            {JSON.stringify(buddy.buddy, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};
