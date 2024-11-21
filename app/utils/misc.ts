import { useEffect, useState } from "react";

let hasHydrated = false;
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(hasHydrated);

  useEffect(() => {
    hasHydrated = true;
    setIsHydrated(true);
  }, []);
  return { isHydrated };
}

export const formatTags = (formData: FormData) => {
  const tagIds = formData.getAll("tagId") as string[];
  const tagNames = formData.getAll("tagName") as string[];
  const tagColors = formData.getAll("tagColor") as string[];
  return tagIds.map((id, index) => {
    return {
      id,
      name: tagNames[index],
      color: tagColors[index],
    };
  });
};
