export const scrollTop = () => {
  scrollTo({
    behavior: "smooth",
    top: 0,
  });
};

export const formattedDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
