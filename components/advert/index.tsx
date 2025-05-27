'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface AdBannerProps {
  imageUrl: string
  altText: string
  clickUrl?: string
  width?: number
  height?: number
  className?: string
  isDismissible?: boolean
  onDismiss?: () => void
  priority?: boolean
  trackingId?: string
  fullWidth?: boolean
  aspectRatio?: string
}

export const AdBanner = ({
  imageUrl,
  altText,
  clickUrl,
  width = 728,
  height = 90,
  className = '',
  isDismissible = false,
  onDismiss,
  priority = false,
  trackingId,
  fullWidth = false,
  aspectRatio = '16/9'
}: AdBannerProps) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => {
    // Track click if tracking ID is provided
    if (trackingId) {
      // You can integrate with your analytics service here
      console.log(`Ad clicked: ${trackingId}`)
    }

    // Open link if provided
    if (clickUrl) {
      window.open(clickUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  const bannerContent = (
    <div 
      className={`relative ${fullWidth ? 'w-full' : 'inline-block'} ${clickUrl ? 'cursor-pointer' : ''} ${className}`}
      onClick={clickUrl ? handleClick : undefined}
      role={clickUrl ? 'button' : 'img'}
      tabIndex={clickUrl ? 0 : undefined}
      onKeyDown={clickUrl ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      } : undefined}
      style={fullWidth ? { aspectRatio } : undefined}
    >
      <Image
        src={imageUrl}
        alt={altText}
        width={fullWidth ? undefined : width}
        height={fullWidth ? undefined : height}
        fill={fullWidth}
        sizes={fullWidth ? '100vw' : undefined}
        priority={priority}
        className={`${fullWidth ? 'object-cover' : 'object-cover'} shadow-sm hover:shadow-md transition-shadow duration-200`}
        unoptimized={imageUrl.startsWith('http')}
      />
      
      {isDismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors duration-150 z-10"
          aria-label="Dismiss advertisement"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )

  return bannerContent
}

// Preset banner sizes for common ad formats
export const AdBannerSizes = {
  LEADERBOARD: { width: 728, height: 90 },
  BANNER: { width: 468, height: 60 },
  RECTANGLE: { width: 300, height: 250 },
  LARGE_RECTANGLE: { width: 336, height: 280 },
  SKYSCRAPER: { width: 160, height: 600 },
  WIDE_SKYSCRAPER: { width: 300, height: 600 },
  MOBILE_BANNER: { width: 320, height: 50 },
  LARGE_MOBILE_BANNER: { width: 320, height: 100 }
}

// Usage examples with different configurations
export const AdBannerExamples = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold">Advertisement Banner Examples</h2>
      
      {/* Standard Leaderboard Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Leaderboard Banner (728x90)</h3>
        <AdBanner
          imageUrl="https://via.placeholder.com/728x90/4F46E5/FFFFFF?text=Your+Ad+Here"
          altText="Sample advertisement"
          clickUrl="https://example.com"
          {...AdBannerSizes.LEADERBOARD}
          trackingId="leaderboard-001"
        />
      </div>

      {/* Rectangle Banner with Dismiss */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Rectangle Banner (300x250) - Dismissible</h3>
        <AdBanner
          imageUrl="https://via.placeholder.com/300x250/10B981/FFFFFF?text=Dismissible+Ad"
          altText="Dismissible advertisement"
          clickUrl="https://example.com"
          {...AdBannerSizes.RECTANGLE}
          isDismissible={true}
          onDismiss={() => console.log('Ad dismissed')}
          trackingId="rectangle-001"
        />
      </div>

      {/* Mobile Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Mobile Banner (320x50)</h3>
        <AdBanner
          imageUrl="https://via.placeholder.com/320x50/EF4444/FFFFFF?text=Mobile+Ad"
          altText="Mobile advertisement"
          clickUrl="https://example.com"
          {...AdBannerSizes.MOBILE_BANNER}
          trackingId="mobile-001"
        />
      </div>

      {/* Custom Styled Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Styled Banner</h3>
        <AdBanner
          imageUrl="https://via.placeholder.com/600x200/8B5CF6/FFFFFF?text=Custom+Banner"
          altText="Custom styled advertisement"
          clickUrl="https://example.com"
          width={600}
          height={200}
          className="border-2 border-purple-200 rounded-xl"
          isDismissible={true}
          trackingId="custom-001"
        />
      </div>
    </div>
  )
}