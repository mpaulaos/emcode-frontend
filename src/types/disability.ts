export interface DisabilitySubItem {
  id: string;
  label: string;
}

export interface DisabilityContentSection {
  title: string;
  paragraphs: string[];
}

export interface DisabilitySection {
  id: string;
  label: string;
  items: DisabilitySubItem[];
}

export interface DisabilityCategory {
  id: string;
  label: string;
  sections: DisabilitySection[];
}

export interface DisabilityContent {
  title: string;
  subtitle: string;
  sections: DisabilityContentSection[];
  image: string;
}