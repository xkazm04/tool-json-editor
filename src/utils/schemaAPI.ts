import { BuddyBuilderType } from "../types";

export const getSchemas = async () => {
  const response = await fetch(
    "https://strapideploys.herokuapp.com/api/buddies"
  );
  const data = await response.json();

  return data;
};

export const saveSchema = async (
  id: number | null | undefined,
  buddy: BuddyBuilderType | null | undefined,
  onSuccess: () => void,
  onReject: () => void
) => {
  if (!id || !buddy) return;
  await fetch(`https://strapideploys.herokuapp.com/api/buddies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        Tree: buddy,
      },
    }),
  })
    .then((data) => {
      if (!data.ok) throw new Error();
      onSuccess();
    })
    .catch((err) => err && onReject());
};
