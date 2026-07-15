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
        image{
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
    findUs{
      title,
      map{
        asset->{
          _id,
          url,
          metadata{ lqip }
        },
        hotspot,
        crop,
        alt
      },
      cta{ label, href }
    }
  }
`)
