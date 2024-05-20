const PERIOD = ['Today', 'Week', 'Month'] as const;

type PeriodType = (typeof PERIOD)[number];

export type ReadonlyPeriodType = ReadonlyArray<PeriodType>;

export const periods: ReadonlyPeriodType = PERIOD;

const MATERIAL_TYPES = [
  'Addendum',
  'An Analysis',
  'An Appraisal',
  'Archives',
  'Article',
  'Banner',
  'Biography',
  'Birth Notice',
  'Blog',
  'Briefing',
  'Caption',
  'Chronology',
  'Column',
  'Correction',
  'Economic Analysis',
  'Editorial',
  'Editorial Cartoon',
  "Editors' Note",
  'First Chapter',
  'Front Page',
  'Glossary',
  'Interactive Feature',
  'Interactive Graphic',
  'Interview',
  'Letter',
  'List',
  'Marriage Announcement',
  'Military Analysis',
  'News',
  'News Analysis',
  'Newsletter',
  'Obituary',
  'Obituary (Obit)',
  'Op-Ed',
  'Paid Death Notice',
  'Postscript',
  'Premium',
  'Question',
  'Quote',
  'Recipe',
  'Review',
  'Schedule',
  'SectionFront',
  'Series',
  'Slideshow',
  'Special Report',
  'Statistics',
  'Summary',
  'Text',
  'Video',
  'Web Log',
] as const;

type MaterialType = (typeof MATERIAL_TYPES)[number];

export type ReadonlyMaterialTypes = ReadonlyArray<MaterialType>;

export const materials: ReadonlyMaterialTypes = MATERIAL_TYPES;
