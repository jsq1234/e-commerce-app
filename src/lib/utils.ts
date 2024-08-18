export const retainKeys = (obj: any, keysToRetain: string[]) => {
  Object.keys(obj)
    .filter((key) => !keysToRetain.includes(key))
    .forEach((key) => delete obj[key]);
};
