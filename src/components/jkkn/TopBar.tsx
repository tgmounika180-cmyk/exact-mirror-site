import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { fetchSiteSettings } from "@/lib/jkkn/content";

export function TopBar() {
  const settingsQ = useQuery({ queryKey: ["site", "settings"], queryFn: fetchSiteSettings });
  const phone = settingsQ.data?.topbar_phone || "+91 93458 55001";
  const email = settingsQ.data?.topbar_email || "info@jkkn.ac.in";

  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${email}`;

  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="container flex h-10 items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <a className="hover:underline" href={phoneHref}>
            {phone}
          </a>
          <a className="hover:underline" href={emailHref}>
            {email}
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
