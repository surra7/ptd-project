import { getCookieValue } from '@/libs/getCookieValue';

export const deleteCookie = (name: any, path: any, domain: any) => {
  if (getCookieValue(name)) {
    document.cookie =
      name + '=; Max-Age=-99999999;' + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '');
  }
};
