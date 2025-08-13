'use client'

import { useState } from "react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Stories from Our Family
        </h2>
        <p className="text-center text-gray-600">
          Test component working - currentIndex: {currentIndex}
        </p>
      </div>
    </section>
  )
}
