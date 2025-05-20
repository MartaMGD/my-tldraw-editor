import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Terminal } from 'lucide-react';

interface AlertCardProps {
  title: string;
  description: string;
}
export function AlertCard({ title, description }: AlertCardProps) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
