import { BuddyBuilderType } from "../types";

export const getSchemas = async () => {
  try {
    const response = await fetch(
      "https://strapideploys.herokuapp.com/api/buddies"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error) {
      throw new Error("Something went wrong");
    }
  }
};

export const saveSchema = async (
  id: number | null | undefined,
  buddy: BuddyBuilderType | null | undefined
) => {
  if (!id || !buddy) return;
  const response = await fetch(
    `https://strapideploys.herokuapp.com/api/buddies/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Tree: buddy,
        },
      }),
    }
  );
  const data = await response.json();
};
