'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'

import { cn } from '@/lib/utils/cn'
import type {
  ConceptStoryBlock,
  ConceptStoryContent,
  ConceptStoryParagraph,
  ConceptStoryTone,
} from '@/types/concept'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type ConceptStoryProps = ConceptStoryContent

const TONE_CLASS: Record<ConceptStoryTone, string> = {
  sand: 'bg-sand text-brown',
  peach: 'bg-peach text-brown',
  olive: 'bg-olive text-sand',
}

/** Base heading size is the end size; scale from start/end ratio so line breaks stay fixed. */
const HEADING_SCALE = {
  mobile: { from: 2.5 / 1.5, to: 1 },
  desktop: { from: 4.75 / 3.25, to: 1 },
} as const

function StoryBlocks({ blocks }: { blocks: ConceptStoryBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <article
          key={block.title}
          className="flex w-full flex-col items-center gap-1"
        >
          <h3 className="text-base font-semibold uppercase leading-normal">
            {block.title}
          </h3>
          <p
            className="max-w-full text-sm leading-normal"
            style={{ width: `${block.width}rem` }}
          >
            {block.body}
          </p>
        </article>
      ))}
    </>
  )
}

function StoryParagraphs({
  paragraphs,
}: {
  paragraphs: ConceptStoryParagraph[]
}) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph.body}
          className="max-w-full text-base leading-normal"
          style={
            paragraph.width !== undefined
              ? { width: `${paragraph.width}rem` }
              : undefined
          }
        >
          {paragraph.body}
        </p>
      ))}
    </>
  )
}

function StoryPanelBody({
  blocks,
  paragraphs,
}: Pick<ConceptStoryContent, 'blocks' | 'paragraphs'>) {
  if (paragraphs?.length) {
    return (
      <div className="flex w-full flex-col items-start gap-8 text-left">
        <StoryParagraphs paragraphs={paragraphs} />
      </div>
    )
  }

  if (blocks?.length) {
    return (
      <div className="flex w-full flex-col items-center gap-20">
        <StoryBlocks blocks={blocks} />
      </div>
    )
  }

  return null
}

export default function ConceptStory({
  id,
  title,
  titleWidth,
  imageSrc,
  imageAlt = '',
  contentSide = 'right',
  tone = 'sand',
  blocks,
  paragraphs,
}: ConceptStoryProps) {
  const rootRef = useRef<HTMLElement>(null)
  const isContentLeft = contentSide === 'left'
  const toneClass = TONE_CLASS[tone]

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const trigger = root.querySelector<HTMLElement>(
        `[data-story-trigger="${id}"]`,
      )
      const imageWrapper = root.querySelector<HTMLElement>(
        `[data-story-image-wrapper="${id}"]`,
      )
      const imageInner = root.querySelector<HTMLElement>(
        `[data-story-image-inner="${id}"]`,
      )
      const header = root.querySelector<HTMLElement>(
        `[data-story-header="${id}"]`,
      )
      const headerWrapper = root.querySelector<HTMLElement>(
        `[data-story-header-title="${id}"]`,
      )
      const content = root.querySelector<HTMLElement>(
        `[data-story-content="${id}"]`,
      )

      if (
        !trigger ||
        !imageWrapper ||
        !imageInner ||
        !header ||
        !headerWrapper ||
        !content
      )
        return

      const mm = gsap.matchMedia()

      mm.add('(max-width: 479px)', () => {
        gsap.set(imageInner, { y: '8rem', scale: 1.5 })
        gsap.set(headerWrapper, {
          scale: HEADING_SCALE.mobile.from,
          transformOrigin: 'center center',
        })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        })

        tl.to(imageInner, { y: 0 })
          .to(headerWrapper, { scale: HEADING_SCALE.mobile.to }, '<')
          .to(imageInner, { scale: 1 })
      })

      mm.add('(min-width: 480px)', () => {
        gsap.set(imageInner, { y: '8rem', scale: 1.5 })
        gsap.set(headerWrapper, {
          scale: HEADING_SCALE.desktop.from,
          transformOrigin: 'center center',
        })
        gsap.set(content, { xPercent: isContentLeft ? -100 : 100 })
        gsap.set(imageWrapper, {
          marginLeft: isContentLeft ? 'auto' : 0,
        })
        gsap.set(header, {
          left: isContentLeft ? 'auto' : 0,
          right: isContentLeft ? 0 : 'auto',
        })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        })

        tl.to(imageInner, { y: 0 })
          .to(headerWrapper, { scale: HEADING_SCALE.desktop.to }, '<')
          .to(header, { width: '50%' })
          .to(content, { xPercent: 0 }, '<')
          .to(imageWrapper, { width: '50%' }, '<')
          .to(imageInner, { scale: 1.1 }, '<')
          .to(imageInner, { scale: 1 }, '<50%')
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [id, isContentLeft] },
  )

  return (
    <section ref={rootRef}>
      <div
        data-story-trigger={id}
        className="relative h-[200svh] xs:h-[300svh]"
      >
        <div className="sticky top-0 z-0 h-svh w-full overflow-x-clip">
          <div
            data-story-image-wrapper={id}
            className="relative h-full w-full overflow-hidden"
          >
            <div data-story-image-inner={id} className="relative h-full w-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                // 150vw: image starts at scale 1.5, so request extra resolution
                sizes="150vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-brown/40" />
          <div
            data-story-header={id}
            className="absolute inset-y-0 left-0 flex h-svh w-full flex-col items-center justify-center text-center text-sand"
          >
            <h2
              data-story-header-title={id}
              className="origin-center whitespace-pre-line text-[1.5rem] font-bold uppercase leading-none will-change-transform xs:text-[3.25rem]"
              style={{ width: `${titleWidth}rem` }}
            >
              {title}
            </h2>
          </div>
          <div
            data-story-content={id}
            className={cn(
              'absolute inset-y-0 hidden h-svh w-1/2 flex-col items-center justify-center px-10 py-10 xs:flex',
              isContentLeft ? 'left-0' : 'right-0',
              toneClass,
              paragraphs?.length ? 'text-left' : 'text-center',
            )}
          >
            <div className="flex w-84.75 flex-col items-center">
              <StoryPanelBody blocks={blocks} paragraphs={paragraphs} />
            </div>
          </div>
        </div>

        <div
          className={cn(
            'relative z-10 flex min-h-svh flex-col items-center justify-center px-6 py-16 xs:hidden',
            toneClass,
            paragraphs?.length ? 'text-left' : 'text-center',
          )}
        >
          <div className="flex w-full max-w-84.75 flex-col items-center">
            <StoryPanelBody blocks={blocks} paragraphs={paragraphs} />
          </div>
        </div>
      </div>
    </section>
  )
}
