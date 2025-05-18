import { randomizeProps } from '@/app/utils/randomizeProps';
import { describe, it, expect } from 'vitest';

describe('randomizeProps.ts (color)', () => {
  const colors = ['blue', 'green', 'red', 'yellow', 'violet'];
  it('color returns a valid color from the list', () => {
    for (let i = 0; i < 10; i++) {
      const color = randomizeProps.color();
      expect(colors).toContain(color);
    }
  });

  it('should have a color as a function', () => {
    expect(typeof randomizeProps.color).toBe('function');
  });
});

describe('randomizedProps.ts (shape)', () => {
  const shapes = ['rectangle', 'ellipse', 'trapezoid', 'heart', 'pentagon'];
  it('shapes returns a valid shape', () => {
    for (let i = 0; i < 10; i++) {
      const shape = randomizeProps.geoShape();
      expect(shapes).toContain(shape);
    }
  });

  it('should have a color as a function', () => {
    expect(typeof randomizeProps.geoShape).toBe('function');
  });
});
