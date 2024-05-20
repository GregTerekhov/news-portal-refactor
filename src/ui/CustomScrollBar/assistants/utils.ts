import { ScrollOrientation } from 'types';

const archiveScroll = 'customHorizontalScrollPosition data-[orientation=horizontal]:h-2.5';
const dropdownScroll =
  'customVerticalScrollPosition max-h-customScrollHeight data-[orientation=vertical]:w-2.5';

export const customScrollStyle = (orientation: ScrollOrientation): string =>
  orientation === ScrollOrientation.Vertical ? dropdownScroll : archiveScroll;

const customScrollThumb = (orientation: ScrollOrientation): string =>
  orientation === ScrollOrientation.Vertical
    ? 'before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2'
    : 'before:!h-2.5';

export const areaThumbStyles = (orientation: ScrollOrientation): string =>
  `${customScrollThumb(orientation)} relative flex flex-1 before:rounded-[10px] before:absolute before:h-full before:w-full before:bg-accentBase before:content-['']`;
