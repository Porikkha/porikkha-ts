const noNavBar = ['/dashboard', '/exam/details'];

export const showNavBar = (pathname: string) => {
  return noNavBar.map((path) => pathname.startsWith(path)).includes(true);
};
