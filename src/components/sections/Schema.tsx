import React from "react";
import { useBuddy } from "../../providers/Buddy";

interface SchemaProps {
  showSchema: boolean
}
/** JSON respresentation of buddy schema
 * 
 * @param showSceham - boolean
 * @returns 
 */
export const Schema = ({showSchema}:SchemaProps): JSX.Element => {
  const buddy = useBuddy();
  return (
    <>
      {buddy?.buddy && showSchema && (
        <div className="bg-glass rounded-lg">
          <pre className="py-5 px-3 ml-5 max-h-[80vh] fancy-scrollbar overflow-x-auto overflow-y-auto text-white  drop-shadow-md text-sm rounded-xl ">
            {JSON.stringify(buddy.buddy, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};
