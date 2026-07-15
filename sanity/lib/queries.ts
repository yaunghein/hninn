import { defineQuery } from 'next-sanity'

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
          url
        },
        hotspot,
        crop,
        alt
      }
    }
  }
`)
