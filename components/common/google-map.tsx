import { cn } from '@/lib/utils/cn'

const MAP_EMBED_SRC =
  'https://www.google.com/maps/d/u/0/embed?mid=1ctsSMQKAMJRihmnVhax7Mc5Qkq7pUW4&ehbc=2E312F&noprof=1&hl=en&gl=us'

/** My Maps embeds a fixed toolbar; clip it so only the map shows. */
const TOOLBAR_HEIGHT = '12rem'

type GoogleMapProps = {
  className?: string
  title?: string
}

export default function GoogleMap({
  className,
  title = 'Map showing Hninn location',
}: GoogleMapProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <iframe
        src={MAP_EMBED_SRC}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="w-full border-0"
        style={{
          height: `calc(100% + ${TOOLBAR_HEIGHT})`,
          marginTop: `-${TOOLBAR_HEIGHT}`,
        }}
      />
    </div>
  )
}
