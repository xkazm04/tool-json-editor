import { BuddyBuilderType } from "../types";

export const deepClone = (buddy: BuddyBuilderType, cloned: {} = {}) => {
  const deeplyCloned = cloned;
  for (let key in buddy) {
    if (Array.isArray(buddy[key as keyof BuddyBuilderType])) {
      (deeplyCloned as any)[key] = (
        (buddy as any)[key] as BuddyBuilderType[]
      ).map((v) => deepClone(v, {}));
    } else {
      (deeplyCloned as any)[key] = buddy[key as keyof BuddyBuilderType];
    }
  }
  return deeplyCloned;
};
