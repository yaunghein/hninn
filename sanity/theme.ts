import { buildLegacyTheme } from 'sanity'

import { colorTokens } from '@/lib/constants/colors'

const { cream, sand, olive, 'olive-light': oliveLight, brown, taupe, peach, white } =
  colorTokens

/** Light Hninn brand tint for Studio — cream surfaces, brown chrome, olive accent. */
export const theme = buildLegacyTheme({
  '--black': brown,
  '--white': cream,

  '--gray': taupe,
  '--gray-base': taupe,

  '--component-bg': cream,
  '--component-text-color': brown,

  '--brand-primary': olive,

  '--default-button-color': taupe,
  '--default-button-primary-color': olive,
  '--default-button-success-color': oliveLight,
  '--default-button-warning-color': peach,
  '--default-button-danger-color': '#b54a3a',

  '--state-info-color': olive,
  '--state-success-color': oliveLight,
  '--state-warning-color': peach,
  '--state-danger-color': '#b54a3a',

  '--main-navigation-color': brown,
  '--main-navigation-color--inverted': sand,

  '--focus-color': olive,
})
