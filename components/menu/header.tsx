'use client'

import { Button } from '@/components/common'

export default function MenuHeader() {
  return (
    <header className="flex flex-col items-center gap-13 px-6 py-18 xs:gap-10 xs:px-[12.5%] xs:pb-16 xs:pt-24">
      <h1 className="text-center text-[2rem] font-semibold uppercase leading-none tracking-[-0.02em] text-olive xs:text-5xl xs:tracking-tight">
        Menu
      </h1>
      <Button
        label="In-store menu"
        color="olive"
        hoverColor="sand"
        onClick={() => {}}
      />
    </header>
  )
}
