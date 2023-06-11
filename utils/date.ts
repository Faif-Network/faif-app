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
    agoText = `hace ${yearsAgo} año${yearsAgo > 1 ? 's' : ''}`;
  } else if (monthsAgo > 0) {
    agoText = `hace ${monthsAgo} mes${monthsAgo > 1 ? 'es' : ''}`;
  } else if (daysAgo > 0) {
    agoText = `hace ${daysAgo} dia${daysAgo > 1 ? 's' : ''}`;
  } else if (hoursAgo > 0) {
    agoText = `hace ${hoursAgo} hora${hoursAgo > 1 ? 's' : ''}`;
  } else if (minutesAgo > 0) {
    agoText = `hace ${minutesAgo} minuto${minutesAgo > 1 ? 's' : ''}`;
  } else {
    agoText = 'Justo ahora';
  }

  return `${formattedDate} (${agoText})`;
};

const pad = (value: number) => {
  return value.toString().padStart(2, '0');
};

export { formatDate };
