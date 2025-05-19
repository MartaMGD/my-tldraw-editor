'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const ImageGeneratorForm = z.object({
  prompt: z.string().min(2, { message: 'Must not be empty' }),
});

interface GenerateImageInputFormProps {
  handleGenerateImage: (data: { prompt: string }) => void;
}

export function GenerateImageInputForm({ handleGenerateImage }: GenerateImageInputFormProps) {
  const form = useForm({
    resolver: zodResolver(ImageGeneratorForm),
    defaultValues: {
      prompt: '',
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(handleGenerateImage)}
      className="flex flex-row relative top-[88px] left-[-225px] z-10 gap-2 mt-2 lg:left-[-150] lg:top-0 lg:pr-4"
    >
      <Input
        id="prompt"
        {...form.register('prompt')}
        placeholder="Enter a prompt"
        className="w-[150px]"
      />
      <Button type="submit">Generate AI image</Button>
    </form>
  );
}
