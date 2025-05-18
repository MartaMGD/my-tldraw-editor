export const randomizeColor = () => {
  const colors = ['blue', 'green', 'red', 'yellow', 'violet'];
  const randomizeIndex = Math.floor(Math.random() * colors.length);
  return colors[randomizeIndex];
};
