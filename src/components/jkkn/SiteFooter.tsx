import jkknLogo from "@/assets/jkkn-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteFooterLinks, fetchSiteSettings } from "@/lib/jkkn/content";

export function SiteFooter() {
  const settingsQ = useQuery({ queryKey: ["site", "settings"], queryFn: fetchSiteSettings });
  const linksQ = useQuery({ queryKey: ["site", "footer-links"], queryFn: fetchSiteFooterLinks });

  const settings = settingsQ.data;
  const footerDescription = settings?.footer_description || "Placeholder description matching the footer’s informational block.";
  const address = settings?.contact_address || "JKKN Campus, Placeholder Address";
  const phone = settings?.contact_phone || "+91 93458 55001";
  const email = settings?.contact_email || "info@jkkn.ac.in";
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${email}`;

  const footerLinks = (linksQ.data ?? []).reduce<Record<string, string>>((acc, row) => {
    acc[row.key] = row.label;
    return acc;
  }, {});

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={jkknLogo} alt="JKKN Institutions" className="mb-4 h-10 w-auto" />
            <p className="text-sm opacity-90">
              {footerDescription}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a className="hover:underline" href="#">
                  {footerLinks.about || "About"}
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  {footerLinks.our_colleges || "Our Colleges"}
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  {footerLinks.admissions || "Admissions"}
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  {footerLinks.contact || "Contact"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wide">Contact</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>{address}</li>
              <li>
                <a className="hover:underline" href={phoneHref}>
                  {phone}
                </a>
              </li>
              <li>
                <a className="hover:underline" href={emailHref}>
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wide">Location</h3>
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-primary/20" />
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-90">
          © {new Date().getFullYear()} JKKN Institutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
