export const formatTime = (dateString: string | Date | undefined): string => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(date);
  } catch (error) {
    return "";
  }
};

export const formatDate = (dateString: string | Date | undefined): string => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    return "";
  }
};
