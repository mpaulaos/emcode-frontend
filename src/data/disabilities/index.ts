import type { DisabilityCategory, DisabilityContent } from "../../types/disability";
import { sensorialVisualContent } from "./visual";
import { sensorialAuditivaContent } from "./hearing";
import { fisicaContent } from "./physical";
import { intelectualContent } from "./intellectual";
import { lenguajeContent } from "./language";

export const disabilityCategories: DisabilityCategory[] = [
  {
    id: "sensorial",
    label: "Sensorial",
    sections: [
      {
        id: "visual",
        label: "Visual",
        items: [
          { id: "ceguera", label: "Ceguera" },
          { id: "baja-vision", label: "Baja visión" },
          { id: "daltonismo", label: "Daltonismo" },
          { id: "vision-periferica-reducida", label: "Visión periférica reducida"},
        ],
      },
      {
        id: "auditiva",
        label: "Auditiva",
        items: [
          { id: "sordera", label: "Sordera" },
          { id: "hipoacusia", label: "Hipoacusia" },
          { id: "SorderaUnilateral", label: "Sordera unilateral" },
          { id: "trastornoProcesamientoAuditivo", label: "Trastorno del procesamiento auditivo" },
        ],
      },
    ],
  },
  {
    id: "fisica",
    label: "Física o motora",
    sections: [
      {
        id: "motora",
        label: "Motora",
        items: [
          { id: "paralisisCerebral", label: "Parálisis cerebral" },
          { id: "hemiplejia", label: "Hemiplejia" },
          { id: "paraplejia", label: "Paraplejia" },
          { id: "tetraplejia", label: "Tetraplejia" },
          { id: "ataxia", label: "Ataxia" },
        ],
      },
      {
        id: "fisica",
        label: "Física",
        items: [
          { id: "amputacion", label: "Amputación" },
          { id: "distrofiaMuscular", label: "Distrofia muscular" },
          { id: "lesionMedular", label: "Lesión medular" },
          { id: "osteogenesisImperfecta", label: "Osteogénesis imperfecta" },
          { id: "acondroplasia", label: "Acondroplasia" },
        ],
      },
    ],
  },
  {
    id: "intelectual",
    label: "Intelectual",
    sections: [
      {
        id: "cognitiva",
        label: "Cognitiva",
        items: [
          { id: "discapacidadIntelectualLeve", label: "Discapacidad intelectual leve"},
          { id: "discapacidadIntelectualModerada", label: "Discapacidad intelectual moderada"},
          { id: "sindromeDown", label: "Síndrome de Down" },
          { id: "sindromeXFragil", label: "Síndrome X Frágil" },
        ],
      },
    ],
  },
  {
    id: "lenguaje",
    label: "Lenguaje",
    sections: [
      {
        id: "expresionComprension",
        label: "Lenguaje oral",
        items: [
          { id: "trastornoDesarrolloLenguaje", label: "Trastorno del desarrollo del lenguaje"},
          { id: "afasia", label: "Afasia" },
          { id: "trastornoPragmatico", label: "Trastorno pragmático de la comunicación"},
        ],
      },
      {
        id: "habla",
        label: "Habla",
        items: [
          { id: "tartamudez", label: "Tartamudez" },
          { id: "disartria", label: "Disartria" },
          { id: "apraxiaHabla", label: "Apraxia del habla" },
          { id: "dislalia", label: "Dislalia" },
        ],
      },
    ],
  },
];

export const disabilityContentMap: Record<string, DisabilityContent> = {
  ...sensorialVisualContent,
  ...sensorialAuditivaContent,
  ...fisicaContent,
  ...intelectualContent,
  ...lenguajeContent,
};
