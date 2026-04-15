"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function MySessionProvider({ children }:{children : any}) {
  return (
    <SessionProvider>

      {children}
    </SessionProvider>

  )
}
