import { defineQuery } from 'next-sanity'

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homePage" && _id == "homePage"][0]{
    hero{
      title,
      description,
      duration,
      slides[]{
        image{
          asset->{
            _id,
            url,
            metadata{ lqip }
          },
          hotspot,
          crop,
          caption
        },
        background,
        text,
        pattern,
        logo
      }
    },
    generalFacts{
      facts[]{
        title,
        titleLines,
        titleAlign,
        offset,
        leftImages[]{
          asset->{
            _id,
            url,
            metadata{ lqip }
          },
          hotspot,
          crop,
          alt
        },
        rightImages[]{
          asset->{
            _id,
            url,
            metadata{ lqip }
          },
          hotspot,
          crop,
          alt
        }
      },
      cta{ label, href }
    },
    menu{
      title,
      description,
      duration,
      items[]{
        name,
        images[]{
          image{
            asset->{
              _id,
              url,
              metadata{
                lqip,
                dimensions{
                  aspectRatio,
                  width,
                  height
                }
              }
            },
            hotspot,
            crop
          },
          caption
        },
        // Legacy single image — still mapped if present until content is re-saved
        image{
          asset->{
            _id,
            url,
            metadata{
              lqip,
              dimensions{
                aspectRatio,
                width,
                height
              }
            }
          },
          hotspot,
          crop,
          alt,
          caption
        }
      },
      cta{ label, href }
    },
    findUs{
      title,
      cta{ label, href }
    },
    "seo": {
      "title": coalesce(seo.title, hero.title, "Hninn"),
      "description": coalesce(seo.description, hero.description, ""),
      "ogImage": seo.ogImage
    }
  }
`)
