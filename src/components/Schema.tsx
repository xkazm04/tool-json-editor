import React from "react";
import { useBuddy } from "../providers/Buddy";

export const Schema = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className="">
      {buddy?.buddy ? (
        <pre className="py-5 px-3 ml-5 max-h-[80vh] fancy-scrollbar overflow-x-auto overflow-y-auto bg-blue-400 drop-shadow-md text-sm rounded-xl ">
          {JSON.stringify(buddy.buddy, null, 2)}
        </pre>
      ) : null}
    </div>
  );
};
