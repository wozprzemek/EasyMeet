export function keyOmit(obj: any, key: any) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
  }