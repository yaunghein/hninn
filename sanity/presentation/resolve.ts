import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

const siteWideLocations = [
  { title: 'Home', href: '/' },
  { title: 'Concept', href: '/concept' },
  { title: 'Events', href: '/events' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Contact', href: '/contact' },
]

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    navbar: defineLocations({
      select: {},
      resolve: () => ({
        locations: siteWideLocations,
      }),
    }),
    footer: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          { title: 'Home', href: '/' },
          { title: 'Contact', href: '/contact' },
        ],
      }),
    }),
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
