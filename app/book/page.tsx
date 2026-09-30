import { Suspense } from 'react';
import BookFlow from './BookFlow';

export const metadata = {
  title: 'Book a Service',
  description:
    'Book your bike service with BIKECARE in a few taps — choose your bike, service, time slot and free doorstep pickup, then track it live.',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookFlow />
    </Suspense>
  );
}
