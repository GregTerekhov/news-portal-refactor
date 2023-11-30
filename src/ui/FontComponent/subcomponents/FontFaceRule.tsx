import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchFont } from 'helpers';

import { FontInfo } from '../assistants';

const FontFaceRule: FC<FontInfo> = ({ fontName, weight }) => {
  const { data: fontWoff2, isLoading: isLoadingWoff2 } = useQuery<string, Error>({
    queryKey: ['font', fontName, weight, 'woff2'],
    queryFn: () => fetchFont(`${fontName}-${weight}.woff2`),
    // {
    //   onSuccess: (data) => {
    //     QueryClient.setQueryData(['font', fontName, weight, 'woff2'], data);
    //   },
    // },
  });

  const { data: fontTtf, isLoading: isLoadingTtf } = useQuery<string, Error>({
    queryKey: ['font', fontName, weight, 'ttf'],
    queryFn: () => fetchFont(`${fontName}-${weight}.ttf`),
    // {
    //   onSuccess: (data) => {
    //     QueryClient.setQueryData(['font', fontName, weight, 'ttf'], data);
    //   },
    // },
  });

  if (isLoadingWoff2 || isLoadingTtf) {
    return null;
  }

  return (
    <>
      {fontWoff2 && fontTtf && (
        <>
          <style>
            {`
              @font-face {
                font-display: swap;
                font-family: '${fontName}';
                src: url(${fontWoff2}) format('woff2'), url(${fontTtf}) format('truetype');
                font-weight: ${weight};
                font-style: normal;
              }
            `}
          </style>
        </>
      )}
    </>
  );
};

export default FontFaceRule;
