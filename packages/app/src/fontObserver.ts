import FontFaceObserver from 'fontfaceobserver';

const font = new FontFaceObserver('NanumSquareRound', {
  weight: 800,
});

font.load().then(() => {
  document.body.classList.add('font-loaded');
});
