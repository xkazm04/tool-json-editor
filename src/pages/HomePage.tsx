import React, { useEffect, useState } from "react";
// import { EditingModal } from "../components/EditingModal";
import { Schema } from "../components/Schema";
import { UseCases } from "../components/UseCases";
import { useBuddy } from "../providers/Buddy";
import { saveSchema } from "../utils/schemaAPI";
import Tree from "react-d3-tree";
import { BuddyBuilderType } from "../types";
import { D3Tree } from "../components/D3Tree";

export const HomePage = () => {
  const [showSchema, setShowSchema] = useState(true);
  const buddy = useBuddy();
  const [d3Tree, setD3Tree] = useState<any>({});

  const deepClone = (buddy: BuddyBuilderType, cloned: {} = {}) => {
    const deeplyCloned = cloned;
    for (let [key, value] of Object.entries(buddy)) {
      if (Array.isArray(value)) {
        (deeplyCloned as any)[key] = value.map((v) => deepClone(v, {}));
      } else {
        (deeplyCloned as any)[key] = value;
      }
    }
    return deeplyCloned;
  };

  const convertToD3CompatibleTree = (buddy: BuddyBuilderType) => {
    const deeplyClonedBuddy = deepClone(buddy);
    const convertTree = (tree: any) => {
      tree.attributes = {};
      for (let [key, value] of Object.entries(tree)) {
        if (key === "label") {
          tree.name = value;
          delete tree[key];
        }
        if (!Array.isArray(value) && key !== "attributes") {
          tree.attributes[key] = value;
          delete tree[key];
        }
        if (Array.isArray(value)) {
          tree[key] = value.map((v) => convertTree(v));
        }
      }
      return tree;
    };
    const d3Tree = convertTree(deeplyClonedBuddy);
    setD3Tree(d3Tree);
  };

  useEffect(() => {
    if (buddy?.buddy) {
      convertToD3CompatibleTree(buddy.buddy);
    }
  }, [buddy?.buddy]);

  if (buddy?.loadingSchema) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="w-full flex items-center justify-evenly mt-10 mb-6 ">
        <div className="bg-blue-400 rounded-lg p-3 items-center">
          {buddy?.schemas.map(({ id, attributes }, index) => {
            return (
              <button
                onClick={() => buddy.setActiveSchema(id)}
                className={`btn mx-2 ${
                  buddy.currentlyEditingSchema === id ? "bg-red-400" : ""
                }`}
                key={index}
                id={JSON.stringify(id)}
              >
                {attributes.Title}
              </button>
            );
          })}
        </div>
        <div className="bg-blue-400 rounded-lg p-3">
          <button
            className="btn"
            onClick={() =>
              saveSchema(
                buddy?.currentlyEditingSchema,
                buddy?.buddy,
                () =>
                  buddy?.addNotification(
                    "success",
                    "Schema is successfully updated"
                  ),
                () =>
                  buddy?.addNotification(
                    "error",
                    "Something went wrong. Schema is not saved. Go to fukku"
                  )
              )
            }
          >
            Save schema to CMS
          </button>
        </div>

        <div className="flex justify-between items-center bg-blue-400 rounded-lg p-3">
          <label className="font-mono font-bold text-[20px]">Show schema</label>
          <input
            type="checkbox"
            checked={showSchema}
            className="toggle toggle-primary m-auto ml-5 "
            onChange={() => setShowSchema(!showSchema)}
          />
        </div>
      </div>
      <div
        className={`grid  m-auto ${
          showSchema ? "grid-cols-[50%_50%]" : "grid-cols-[100%]"
        }`}
      >
        <div>
          <div className="max-w-screen-lg m-auto"></div>
          <UseCases />
        </div>
        <div className="">{showSchema && <Schema />}</div>
      </div>
      <D3Tree d3Tree={d3Tree} />
    </>
  );
};
