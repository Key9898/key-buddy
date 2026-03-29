import { motion } from 'framer-motion'
import type { CharacterBaseProps } from '../base/CharacterBase'

const PAW_ANIMATIONS = {
  idle: {
    leftPaw: { y: 0, x: 0, rotate: 0 },
    rightPaw: { y: 0, x: 0, rotate: 0 },
  },
  typing: {
    leftPaw: {
      y: [0, -12, 0],
      rotate: [0, -5, 0],
      transition: { duration: 0.12, repeat: Infinity, ease: 'easeOut' },
    },
    rightPaw: {
      y: [0, -12, 0],
      rotate: [0, 5, 0],
      transition: { duration: 0.12, repeat: Infinity, ease: 'easeOut', delay: 0.06 },
    },
  },
  mouse: {
    leftPaw: { y: 0, x: 0 },
    rightPaw: {
      y: [0, -4, 0],
      x: [0, 8, 0],
      transition: { duration: 0.3, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  click: {
    leftPaw: { y: 0, x: 0 },
    rightPaw: {
      y: [0, -10, 0],
      transition: { duration: 0.1, ease: 'backOut' },
    },
  },
  speaking: {
    leftPaw: {
      y: [0, -4, 0],
      rotate: [0, -2, 0],
      transition: { duration: 0.25, repeat: Infinity, ease: 'easeInOut' },
    },
    rightPaw: {
      y: [0, -4, 0],
      rotate: [0, 2, 0],
      transition: { duration: 0.25, repeat: Infinity, ease: 'easeInOut', delay: 0.12 },
    },
  },
}

const THEMES = {
  default: {
    body: '#FFFBF5',
    stroke: '#E8D5C4',
    blush: '#FFB6B6',
    innerEar: '#FFD4D4',
  },
  pink: {
    body: '#FFE5EC',
    stroke: '#FFB3C6',
    blush: '#FF85A1',
    innerEar: '#FFC2D1',
  },
  dark: {
    body: '#2D3436',
    stroke: '#636E72',
    blush: '#FF7675',
    innerEar: '#D63031',
  },
}

/**
 * KeyBuddy Classic Mascot Component.
 * High-fidelity SVG implementation with reactive animations.
 */
export default function KeyBuddy({ state, className }: CharacterBaseProps) {
  // We'll use default theme for now, but in future it could come from props
  const theme = THEMES.default
  const pawAnim = PAW_ANIMATIONS[state as keyof typeof PAW_ANIMATIONS] || PAW_ANIMATIONS.idle

  return (
    <motion.div className={className} data-character="keybuddy-classic" data-state={state}>
      <motion.svg
        viewBox="0 0 320 200"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#00000020" />
          </filter>
        </defs>

        <g filter="url(#shadow)">
          <path
            d="M 40 200 L 40 160 Q 40 40 160 40 Q 280 40 280 160 L 280 200 Z"
            fill={theme.body}
            stroke={theme.stroke}
            strokeWidth="6"
            strokeLinejoin="round"
          />

          <g className="ears">
            <path
              d="M 80 45 L 65 10 Q 60 0 75 5 L 110 35"
              fill={theme.body}
              stroke={theme.stroke}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M 240 45 L 255 10 Q 260 0 245 5 L 210 35"
              fill={theme.body}
              stroke={theme.stroke}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path d="M 82 40 L 75 18 L 100 35" fill={theme.innerEar} />
            <path d="M 238 40 L 245 18 L 220 35" fill={theme.innerEar} />
          </g>

          <motion.g
            animate={{ y: state === 'typing' ? [0, -4, 0] : 0 }}
            transition={{ duration: 0.15, repeat: Infinity }}
          >
            <circle cx="115" cy="95" r="5" fill="#2D3436" />
            <circle cx="205" cy="95" r="5" fill="#2D3436" />
            <circle cx="95" cy="115" r="10" fill={theme.blush} opacity="0.6" />
            <circle cx="225" cy="115" r="10" fill={theme.blush} opacity="0.6" />
            <path
              d="M 152 110 Q 160 118 168 110"
              stroke="#2D3436"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          <motion.g animate={pawAnim.leftPaw} style={{ transformOrigin: '100px 160px' }}>
            <path
              d="M 70 160 Q 70 120 110 120 Q 140 120 140 160"
              fill={theme.body}
              stroke={theme.stroke}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M 95 128 L 95 142"
              stroke={theme.stroke}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 115 128 L 115 142"
              stroke={theme.stroke}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          <motion.g animate={pawAnim.rightPaw} style={{ transformOrigin: '220px 160px' }}>
            <path
              d="M 180 160 Q 180 120 210 120 Q 250 120 250 160"
              fill={theme.body}
              stroke={theme.stroke}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M 205 128 L 205 142"
              stroke={theme.stroke}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 225 128 L 225 142"
              stroke={theme.stroke}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      </motion.svg>
    </motion.div>
  )
}
