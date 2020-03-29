import FontFaceObserver from 'fontfaceobserver';

const font = new FontFaceObserver('NanumSquareRound');

font.load().then(() => {
  document.body.classList.add('font-loaded');
});
