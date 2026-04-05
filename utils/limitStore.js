// Store limits per IP
const userLimits = {};

export const checkAskLimit = (ip) => {
  const today = new Date().toDateString();

  if (!userLimits[ip]) {
    userLimits[ip] = { ask: 0, upload: 0, date: today };
  }

  // Reset daily
  if (userLimits[ip].date !== today) {
    userLimits[ip] = { ask: 0, upload: 0, date: today };
  }

  if (userLimits[ip].ask >= 3) return false;

  userLimits[ip].ask++;
  return true;
};


export const checkUploadLimit = (ip) => {
  const today = new Date().toDateString();

  if (!userLimits[ip]) {
    userLimits[ip] = { ask: 0, upload: 0, date: today };
  }

  // Reset daily
  if (userLimits[ip].date !== today) {
    userLimits[ip] = { ask: 0, upload: 0, date: today };
  }

  if (userLimits[ip].upload >= 20) return false;

  userLimits[ip].upload++;
  return true;
};