import { Suspense } from "react";
import { BuilderContent } from "./builder-content";

export default function Builder() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
