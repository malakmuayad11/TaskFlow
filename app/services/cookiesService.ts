export function createLoggedInUserCookie(userId: number) {
  document.cookie =
    "userId=" + userId.toString() + "; path=/dashboard;max-age=604800";
  // The user stay logged-in for 7 days
}

export function getCookie(cookieName: string) {
  const cookies = document.cookie.split(";");

  for (let c of cookies) {
    c = c.trim();

    if (c.startsWith(cookieName + "=")) {
      return c.substring(cookieName.length + 1);
    }
  }

  return null; // Not found
}

export function deleteCookies(cookieName: string) {
  document.cookie =
    "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/dashboard";
}
