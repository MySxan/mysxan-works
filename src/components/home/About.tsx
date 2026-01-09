// About section component - personal information, skills, and timeline
import { useTranslation } from "react-i18next";
import { Section } from "../ui/Section";
import { SkillGroup } from "../ui/SkillGroup";
import { Timeline } from "../ui/Timeline";
import { skills } from "../../data/skills";
import { timeline } from "../../data/timeline";

export function About() {
  const { t } = useTranslation();

  return (
    <Section id="about" title={t("about.title")} className="about-section">
      {/* Split layout: Bio + Skills */}
      <div className="about-content">
        <div className="about-bio">
          <p>
            ご理解いただき大変痛み入ります……！
            また、お送りするタイミングにつきましても承知いたしました。
            つきましては、全体像あるいはある程度の方向性が見える段階まで書き進めましたら、デモとして共有いたします。
            引き続きお手数をおかけしますが、何卒よろしくお願いいたします。
            （どうぞ良いお年をお迎えください🙇‍♂️ ）
          </p>
          <p>
            男生超级扣分的行为，快来看看自己中了几条: 1.不定积分结果不加常数C
            2.定积分换元时忘记更换积分上下限 3.滥用洛必达法则
            4.求复合函数导数时遗漏链式法则项 5.判别级数敛散性误用判别法
            6.计算行列式或逆矩阵时遗漏代数余子式的符号 7.混淆偏导数与全导数
            8.分部积分法中u和dv选择不当 9.在加减运算中误用等价无穷小
            10.解非齐次微分方程时遗漏特解
          </p>
          <p>
            是的，最后B站在一起了，学习在一起了，跨年在一起了，印第安在一起了，学业在一起了，洞察在一起了，笔盒在一起了.
          </p>
        </div>

        <div className="about-skills">
          {skills.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="about-timeline">
        <h3 className="timeline-heading">{t("about.timelineTitle")}</h3>
        <Timeline milestones={timeline} />
      </div>
    </Section>
  );
}
