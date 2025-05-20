'use client';

import Footer from '@components/Footer/Footer';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToEditor = () => {
    router.push('/editor');
  };

  return (
    <>
      <div className="bg-[url(/presentation-background.jpg)] flex items-center justify-center h-screen bg-gray-50 bg-no-repeat bg-right bg-cover ">
        <Card className="w-full max-w-md shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold leading-tight">
              Want an easy workflow?{' '}
            </CardTitle>
            <CardDescription className="text-lg text-gray-mt-2">
              TLDRAW is your solution for creating intuitive graphs
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button
              variant="outline"
              onClick={goToEditor}
              className="w-full px-6 py-5 text-lg font-semibold rounded-full bg-yellow-300 transition cursor-pointer"
            >
              Start now
            </Button>{' '}
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
}
