const formatDate = (date: number) => {
  const d = new Date(date);
  const now = new Date();
  const minutesAgo = Math.floor((now.getTime() - d.getTime()) / 60000);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(monthsAgo / 12);

  const formattedDate = `${pad(d.getDate())}/${pad(
    d.getMonth() + 1,
  )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  let agoText = '';

  if (yearsAgo > 0) {
    agoText = `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  } else if (monthsAgo > 0) {
    agoText = `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else if (daysAgo > 0) {
    agoText = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (hoursAgo > 0) {
    agoText = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (minutesAgo > 0) {
    agoText = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else {
    agoText = 'Just now';
  }

  return `${formattedDate} (${agoText})`;
};

const pad = (value: number) => {
  return value.toString().padStart(2, '0');
};

export { formatDate };
