import React, { useEffect, useState } from "react";
import { BuddyEditor } from "../components/BuddyEditor";
import { D3Tree } from "../components/D3Tree";
import { Tabs } from "../components/Tabs";
import { useBuddy } from "../providers/Buddy";
import { BuddyBuilderType } from "../types";
import { deepClone } from "../utils/deepClone";

export const HomePage = () => {
  const buddy = useBuddy();
  const [activeTab, setActiveTab] = useState<"Editor" | "Tree respresentation">(
    "Editor"
  );
  const [d3Tree, setD3Tree] = useState<any>({});

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

  const handleTabChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectedTab = (e.target as HTMLDivElement).id;
    setActiveTab(selectedTab as "Editor" | "Tree respresentation");
  };

  if (buddy?.loadingSchema) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="w-full flex items-center justify-evenly   "></div>
      <Tabs
        activeTab={activeTab}
        tabs={["Editor", "Tree respresentation"]}
        onTabClick={handleTabChange}
      />
      {activeTab === "Editor" ? <BuddyEditor /> : <D3Tree d3Tree={d3Tree} />}
    </>
  );
};
