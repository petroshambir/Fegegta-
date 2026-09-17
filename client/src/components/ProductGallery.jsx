import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  X,
} from 'lucide-react'

function ProductGallery({ images = [], productName = 'Product' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const validImages = images.filter(Boolean)

  const currentImage =
    validImages[activeIndex] || validImages[0]

  const showPrevious = () => {
    setIsZoomed(false)

    setActiveIndex((current) =>
      current === 0
        ? validImages.length - 1
        : current - 1
    )
  }

  const showNext = () => {
    setIsZoomed(false)

    setActiveIndex((current) =>
      current === validImages.length - 1
        ? 0
        : current + 1
    )
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }

      if (event.key === 'Escape') {
        setIsFullscreen(false)
        setIsZoomed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [validImages.length])

  if (!currentImage) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        No image available
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <div className="aspect-square">
            <img
              src={currentImage}
              alt={`${productName} ${activeIndex + 1}`}
              onClick={() => setIsZoomed(true)}
              className={`
                h-full
                w-full
                object-contain
                p-4
                transition-transform
                duration-300
                ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}
              `}
            />
          </div>

          {/* Previous */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-white hover:text-black"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-white hover:text-black"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Image Actions */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZoomed((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-white hover:text-black"
              aria-label="Zoom image"
            >
              <ZoomIn className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-white hover:text-black"
              aria-label="Open fullscreen"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>

          {/* Image Counter */}
          {validImages.length > 1 && (
            <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {validImages.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {validImages.length > 1 && (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {validImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => {
                  setActiveIndex(index)
                  setIsZoomed(false)
                }}
                className={`
                  aspect-square
                  overflow-hidden
                  rounded-xl
                  border-2
                  bg-gray-50
                  transition
                  ${
                    activeIndex === index
                      ? 'border-black'
                      : 'border-transparent hover:border-gray-300'
                  }
                `}
              >
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close fullscreen"
          >
            <X className="h-6 w-6" />
          </button>

          {validImages.length > 1 && (
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          <img
            src={currentImage}
            alt={productName}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          {validImages.length > 1 && (
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
            {activeIndex + 1} / {validImages.length}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductGallery