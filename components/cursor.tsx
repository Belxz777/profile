"use client"

import type React from "react"

import { motion } from "framer-motion"

interface PixelCursorProps {
  mousePosition: { x: number; y: number }
}

const PixelCursor: React.FC<PixelCursorProps> = ({ mousePosition }) => {
  // Pixel art cursor
  const cursorArt = `
  .BB.....
  BBBB....
  BBBBBB..
  BBBBBBBB
  BBBBBB..
  BBBB....
  .BB.....
  ........
  `

  // Convert pixel art string to HTML
  const renderPixelCursor = (art: string) => {
    const lines = art.trim().split("\n")
    const pixelSize = 2 // Size of each pixel in px

    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${lines.length}, ${pixelSize}px)`,
          filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))",
        }}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} style={{ display: "flex" }}>
            {Array.from(line).map((char, charIndex) => (
              <div
                key={`${lineIndex}-${charIndex}`}
                style={{
                  width: `${pixelSize}px`,
                  height: `${pixelSize}px`,
                  backgroundColor: char === "B" ? "#fff" : "transparent",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transformOrigin: "top left",
      }}
      animate={{
        x: 0,
        y: 0,
    
      }}
      transition={{
        duration: 0.05,
        scale: {
          duration: 0.3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        },
        rotate: {
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        },
      }}
    >
      {renderPixelCursor(cursorArt)}
    </motion.div>
  )
}

export default PixelCursor
