'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToEditor = () => {
    router.push('/editor');
  };

  return (
    <div className="bg-[url(/presentation-background.jpg)] flex items-center justify-center h-screen bg-gray-50 bg-no-repeat bg-right bg-cover ">
      <Card className="w-[500px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-4xl">Want an easy work flow? </CardTitle>
          <CardDescription className="text-md">
            TLDRAW is your solution for creating intuitive graphs
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button
            variant="outline"
            onClick={goToEditor}
            className="w-full px-6 py-5 text-lg font-semibold rounded-full bg-pink-700 text-white hover:text-black transition cursor-pointer"
          >
            Start now
          </Button>{' '}
        </CardFooter>
      </Card>
    </div>
  );
}
