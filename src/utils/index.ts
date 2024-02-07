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

function postedAt(date: Date) {
  const now = new Date().getTime();
  const posted = new Date(date).getTime();
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hours ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }
  return "now";
}

export { postedAt };
