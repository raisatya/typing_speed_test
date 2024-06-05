export const isMobile = (): boolean => {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent || (window as any).opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );
  }
  return false;
};
