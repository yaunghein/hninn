import { ConceptHero } from '@/components/concept'
import type { ConceptContent } from '@/types/concept'

const concept: ConceptContent = {
  title: 'The Heart of Hninn',
  blocks: [
    {
      title: 'A Fresh Take on Tradition',
      body: 'Hninn was born out of a love for the rich, diverse, and often underrepresented flavors of Myanmar. We wanted to create a space in Bangkok that moved beyond the traditional restaurant format. Instead, we’ve reimagined these beloved heritage recipes to fit seamlessly into a laid-back, contemporary brunch setting. It’s authentic taste, served with a modern aesthetic.',
    },
    {
      title: 'A Sanctuary for You and Your Pets',
      body: 'We believe that the best meals are shared with the ones you love—and that includes your pets! Our Phetchaburi location was designed to be a bright, welcoming sanctuary. With our pet-friendly policy, spacious seating, and warm staff, Hninn is a place to unwind, connect, and feel right at home.',
    },
  ],
}

export default function ConceptPage() {
  return <ConceptHero {...concept} />
}
