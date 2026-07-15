import { defineQuery } from 'next-sanity'

export const CONCEPT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "conceptPage" && _id == "conceptPage"][0]{
    title,
    blocks[]{
      title,
      body
    }
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "contactPage" && _id == "contactPage"][0]{
    title,
    bookCta{
      label,
      href
    },
    contacts[]{
      label,
      href
    },
    social[]{
      label,
      href
    },
    hours{
      open,
      closed
    },
    location{
      title,
      directionsCta{
        label,
        href
      },
      map{
        asset->{
          _id,
          url,
          metadata{
            lqip
          }
        },
        hotspot,
        crop,
        alt
      }
    }
  }
`)

export const EVENTS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "eventsPage" && _id == "eventsPage"][0]{
    title,
    description,
    cta{
      label,
      href
    },
    images[]{
      asset->{
        _id,
        url,
        metadata{
          lqip
        }
      },
      hotspot,
      crop,
      alt
    }
  }
`)

export const GALLERY_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryPage" && _id == "galleryPage"][0]{
    blocks[]{
      _key,
      name,
      images[]{
        asset->{
          _id,
          url,
          metadata{
            dimensions{
              width,
              height
            },
            lqip
          }
        },
        hotspot,
        crop,
        alt
      }
    }
  }
`)
