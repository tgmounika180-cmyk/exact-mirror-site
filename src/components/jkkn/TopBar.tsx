import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { PLACEHOLDERS } from "@/content/placeholders";

export function TopBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="container flex h-10 items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <a className="hover:underline" href="#">
            {PLACEHOLDERS.CONTACT_PHONE}
          </a>
          <a className="hover:underline" href="#">
            {PLACEHOLDERS.CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a className="opacity-90 hover:opacity-100" href="https://facebook.com/myjkkn" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </a>
          <a className="opacity-90 hover:opacity-100" href="https://x.com/jkkninstitution" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </a>
          <a className="opacity-90 hover:opacity-100" href="https://instagram.com/jkkninstitutions" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a
            className="opacity-90 hover:opacity-100"
            href="https://linkedin.com/school/jkkninstitutions/"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a className="opacity-90 hover:opacity-100" href="https://youtube.com/@JKKNINSTITUTIONS" aria-label="YouTube">
            <Youtube className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
