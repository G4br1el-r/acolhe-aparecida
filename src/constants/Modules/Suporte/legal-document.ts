export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocumentContent = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};
