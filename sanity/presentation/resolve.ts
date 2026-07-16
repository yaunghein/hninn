import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homePage: defineLocations({
      select: { title: 'hero.title' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Home',
            href: '/',
          },
        ],
      }),
    }),
    conceptPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Concept',
            href: '/concept',
          },
        ],
      }),
    }),
    eventsPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Events',
            href: '/events',
          },
        ],
      }),
    }),
    galleryPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Gallery',
            href: '/gallery',
          },
        ],
      }),
    }),
    contactPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Contact',
            href: '/contact',
          },
        ],
      }),
    }),
  },
}
