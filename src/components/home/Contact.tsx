// Contact section component - contact form and social links
import { useState } from "react";
import { Section } from "../ui/Section";
import { Toast, type ToastType } from "../ui/Toast";
import { links } from "../../data/links";

export function Contact() {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const email = "mysxan@163.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setToast({ message: "Email copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy email", type: "error" });
    }
  };

  return (
    <Section id="contact" title="Contact" className="contact-section">
      <div className="contact-content">
        <div className="contact-main">
          <p className="contact-text">
            I'm always interested in hearing about new projects and
            opportunities.
          </p>

          {/* Email with copy button */}
          <div className="email-block">
            <span className="email-label">Email:</span>
            <div className="email-line">
              <a href={`mailto:${email}`} className="email-link">
                {email}
              </a>
              <button
                className="btn-copy"
                onClick={handleCopyEmail}
                title="Copy email address"
                aria-label="Copy email to clipboard"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Social links */}
          <div className="social-links">
            <p className="social-label">Connect:</p>
            <div className="social-icons">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Section>
  );
}
