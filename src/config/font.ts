import localFont from 'next/font/local';

export const neueMontreal = localFont({
  src: [
    {
      path: '../fonts/PPNeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-Book.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/PPNeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-SemiBolditalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/PPNeueMontreal-Thin.woff2',
      weight: '200',
      style: 'normal',
    },
  ],
});
