const noNavBar = ['/dashboard', '/exam/results', '/classroom', '/discussion'];

export const showNavBar = (pathname: string) => {
  return noNavBar.map((path) => pathname.startsWith(path)).includes(true);
};
