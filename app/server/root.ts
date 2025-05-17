import { drawingRouter } from '.';
import { router } from './trpc';

export const appRouter = router({
  drawing: drawingRouter,
});

export type AppRouter = typeof appRouter;
