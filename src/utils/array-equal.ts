const arrayEquals = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const checking = [...b];

  for (const elem of a) {
    const index = checking.indexOf(elem);

    if (index === -1) {
      return false;
    }

    checking.splice(index, 1);
  }

  return checking.length === 0;
};

export default arrayEquals;
