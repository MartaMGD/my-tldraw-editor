'use client';

import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from 'app/server/root';

export const trpc = createTRPCReact<AppRouter>();
