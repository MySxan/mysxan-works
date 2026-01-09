// Info section - basic information about the developer
import { Trans, useTranslation } from "react-i18next";
import { Section } from "../ui/Section";

export function Info() {
  const { t } = useTranslation();

  return (
    <Section id="info" className="info-section">
      <div className="info-content">
        <div className="info-columns">
          <p className="info-paragraph-intro">{t("info.paragraphIntro")}</p>
          <p className="info-paragraph">
            <Trans
              i18nKey="info.paragraph"
              components={{ br: <br />, i: <i /> }}
            />
          </p>
        </div>
      </div>
    </Section>
  );
}
