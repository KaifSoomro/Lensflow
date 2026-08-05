import { useCallback } from "react";

const useFormatDate = () => {
  const formatDate = useCallback((date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, []);

  return formatDate;
};

export default useFormatDate;