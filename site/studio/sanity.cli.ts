/**
 * Sanity CLI Configuration
 * Learn more: https://www.sanity.io/docs/cli
 */

import {defineCliConfig} from 'sanity/cli'

// Identyfikator projektu nie jest tajny — domyślne wartości pozwalają działać bez pliku .env
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'oxgkyhdv'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: 'a48nqlcuqdu4bezdkbva0k9s',
    autoUpdates: true,
  },
  // Adres opublikowanego panelu: https://zmw-legal.sanity.studio
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || 'zmw-legal',
})
