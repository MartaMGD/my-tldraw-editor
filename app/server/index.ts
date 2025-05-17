import { z } from 'zod';
import { publicProcedure, router } from './trpc';

let drawingStore: any = null;

export const drawingRouter = router({
  getDrawing: publicProcedure.query(async () => {
    return drawingStore;
  }),

  saveDrawing: publicProcedure.input(z.any()).mutation(({ input }) => {
    drawingStore = input;
    return { success: true };
  }),
});
