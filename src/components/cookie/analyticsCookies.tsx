
export function deleteCookie(name: string) {
  // удаляем для текущего домена
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  // на всякий случай с leading dot (иногда нужно)
  document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}; SameSite=Lax`;
}

export function deleteCookieByPrefix(prefix: string) {
  document.cookie.split(";").forEach((c) => {
    const cookieName = c.split("=")[0].trim();
    if (cookieName.startsWith(prefix)) deleteCookie(cookieName);
  });
}

export function clearAnalyticsCookies() {
  deleteCookie("_ga");
  deleteCookieByPrefix("_ga_");
  deleteCookie("_clck");
  deleteCookie("_clsk");
}

