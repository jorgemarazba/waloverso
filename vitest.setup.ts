import '@testing-library/jest-dom'

// Mock básico de assets estáticos usados en los componentes
// @ts-expect-error - Vitest en jsdom
vi.mock('/ankama.png', () => ({ default: 'ankama.png' }), { virtual: true })
// @ts-expect-error - Vitest en jsdom
vi.mock('/twicht.jpg', () => ({ default: 'twicht.jpg' }), { virtual: true })
// @ts-expect-error - Vitest en jsdom
vi.mock('/secundarios.png', () => ({ default: 'secundarios.png' }), { virtual: true })

