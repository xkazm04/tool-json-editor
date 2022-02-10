import { BuddyBuilderType } from "../types";
import { deepClone } from "./deepClone";

export const convertToD3CompatibleTree = (buddy: BuddyBuilderType) => {
    const deeplyClonedBuddy = deepClone(buddy);
    const convertTree = (tree: any) => {
      tree.attributes = {};
      for (let [key, value] of Object.entries(tree)) {
        if (key === 'label') {
          tree.name = value;
          delete tree[key];
        }
        if (!Array.isArray(value) && key !== 'attributes') {
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
    return d3Tree;
  };