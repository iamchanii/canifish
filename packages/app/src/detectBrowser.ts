const isChrome =
  typeof window !== 'undefined' &&
  window.navigator.userAgent.toLowerCase().includes('chrome');

const isSafari =
  !isChrome &&
  typeof window !== 'undefined' &&
  window.navigator.userAgent.toLowerCase().includes('safari');

const detectBrowser = () => {
  if (isSafari) {
    document.documentElement.classList.add('safari');
  }
};

export default detectBrowser;
