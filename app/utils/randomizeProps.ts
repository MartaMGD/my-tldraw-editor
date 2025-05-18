export const randomizeProps = {
  color: () => {
    const colors = ['blue', 'green', 'red', 'yellow', 'violet'];
    const randomizeIndex = Math.floor(Math.random() * colors.length);
    return colors[randomizeIndex];
  },

  geoShape: () => {
    const shapes = ['rectangle', 'ellipse', 'trapezoid', 'heart', 'pentagon'];
    const randomizeShape = Math.floor(Math.random() * shapes.length);
    return shapes[randomizeShape];
  },
};
