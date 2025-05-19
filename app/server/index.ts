import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import axios from 'axios';

let drawingStore: any = null;

export const drawingRouter = router({
  getDrawing: publicProcedure.query(async () => {
    return drawingStore;
  }),

  saveDrawing: publicProcedure.input(z.any()).mutation(({ input }) => {
    drawingStore = input;
    return { success: true };
  }),

  generateImage: publicProcedure
    .input(
      z.object({
        prompt: z.string().min(1, 'El prompt es obligatorio'),
      })
    )
    .mutation(async ({ input }) => {
      const token = process.env.HUGGINGFACE_API_TOKEN;
      if (!token) throw new Error('No se encontró HUGGINGFACE_API_TOKEN');

      const payload = {
        model: 'black-forest-labs/flux-schnell',
        prompt: input.prompt,
        response_format: 'b64_json',
      };

      const response = await axios.post(
        'https://router.huggingface.co/nebius/v1/images/generations',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const rawBase64 = response.data?.data?.[0]?.b64_json ?? null;
      const base64Image = rawBase64 ? `data:image/webp;base64,${rawBase64}` : null;

      return { base64Image };
    }),
});
