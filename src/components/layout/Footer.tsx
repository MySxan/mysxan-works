// Footer component - page footer with copyright, tagline, and social links
import { Container } from "../ui/Container";
import { links } from "../../data/links";
import { FaGithub, FaLinkedin, FaTwitter, FaSpotify } from "react-icons/fa";
import { SiPixiv, SiBilibili, SiBandcamp } from "react-icons/si";
import type { IconType } from "react-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const ICONS: Record<string, IconType> = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    pixiv: SiPixiv,
    bilibili: SiBilibili,
    bandcamp: SiBandcamp,
    spotify: FaSpotify,
  };

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-info">
            <p className="footer-copyright">
              &copy; {currentYear} MySxan. All rights reserved.
            </p>
            <p className="footer-tagline">
              Crafted with React, TypeScript, and creative passion.
            </p>
          </div>

          <div className="footer-social">
            {links.map((link) => {
              const Icon = ICONS[link.icon] ?? FaGithub;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon className="footer-icon" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
