import { profile } from "@/src/content/profile";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-100 py-10 bg-white">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-neutral-400">
            Kendimi geliştirmeye devam ediyorum.
          </p>
          <p className="text-xs text-neutral-300">
            &copy; 2026 {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
