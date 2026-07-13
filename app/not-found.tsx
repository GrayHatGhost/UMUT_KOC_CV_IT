import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">404</h2>
      <p className="text-xl text-white/60 mb-10 max-w-[40ch]">
        Aradığınız sayfa bulunamadı veya taşınmış olabilir.
      </p>
      <Button variant="primary" href="/" ariaLabel="Ana sayfaya dön">
        Ana Sayfaya Dön
      </Button>
    </div>
  );
}
