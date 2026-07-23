import { defineQuery } from 'next-sanity'

export const NAVBAR_QUERY = defineQuery(/* groq */ `
  *[_type == "navbar" && _id == "navbar"][0]{
    hours{
      line1,
      line2
    },
    gallery{
      label,
      href
    },
    reservation{
      label,
      href
    },
    menuLinks[]{
      label,
      href
    }
  }
`)

export const FOOTER_QUERY = defineQuery(/* groq */ `
  *[_type == "footer" && _id == "footer"][0]{
    social[]{
      label,
      href
    },
    address,
    hours,
    legal[]{
      label,
      href
    }
  }
`)

export const CONCEPT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "conceptPage" && _id == "conceptPage"][0]{
    title,
    blocks[]{
      title,
      body
    },
    "seo": {
      "title": coalesce(seo.title, title, "Concept"),
      "description": coalesce(seo.description, blocks[0].body, ""),
      "ogImage": seo.ogImage
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
      }
    },
    "seo": {
      "title": coalesce(seo.title, title, "Contact"),
      "description": coalesce(seo.description, location.title, ""),
      "ogImage": seo.ogImage
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
    },
    "seo": {
      "title": coalesce(seo.title, title, "Events"),
      "description": coalesce(seo.description, description, ""),
      "ogImage": seo.ogImage
    }
  }
`)

export const MENU_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "menuPage" && _id == "menuPage"][0]{
    categories[]{
      _key,
      name,
      items[]{
        _key,
        name,
        description,
        price,
        image{
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
          caption
        }
      }
    },
    "seo": {
      "title": coalesce(seo.title, "Menu"),
      "description": coalesce(
        seo.description,
        "Explore the in-store menu at Hninn — contemporary Burmese brunch in Bangkok.",
        ""
      ),
      "ogImage": seo.ogImage
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
    },
    "seo": {
      "title": coalesce(seo.title, "Gallery"),
      "description": coalesce(
        seo.description,
        "Explore photos from Hninn — food, interiors, events, and pets.",
        ""
      ),
      "ogImage": seo.ogImage
    }
  }
`)
