interface MaterialIconProps {
  name: string
  filled?: boolean
  weight?: number
  grade?: number
  opticalSize?: number
  className?: string
  size?: number
}

export default function MaterialIcon({
  name,
  filled = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
  className = '',
  size = 24,
}: MaterialIconProps) {
  const style = {
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
    fontSize: size,
  }

  return (
    <span className={`material-symbols-outlined ${className}`} style={style}>
      {name}
    </span>
  )
}
