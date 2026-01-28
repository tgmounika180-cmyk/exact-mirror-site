import { useContentMode } from "@/content/contentMode";

export function SiteFooter() {
  const { content } = useContentMode();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={content.LOGO_IMAGE_SRC} alt={content.LOGO_IMAGE_ALT} className="mb-4 h-10 w-auto" />
            <p className="text-sm opacity-90">
              {content.SECTION_TEXT_CONTENT}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a className="hover:underline" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Our Colleges
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Admissions
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wide">Contact</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>{content.ADDRESS}</li>
              <li>
                <a className="hover:underline" href="#">
                  {content.CONTACT_PHONE}
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  {content.CONTACT_EMAIL}
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
