import { useEffect, useMemo, useRef, useState } from "react";
import type { OrbitMilestone, OrbitDomain } from "../../data/timeline";

const RING_SCALE: Record<OrbitDomain, number> = {
  frontend: 1,
  design: 0.86,
  music: 0.73,
};

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const EDGE_PADDING = 20;
const BOTTOM_PADDING = 28;
const YEAR_RING_OFFSET = 12;
const MONTH_RING_OFFSET = 32;
const LABEL_PADDING = MONTH_RING_OFFSET + 26;
const MIN_HEIGHT = 260;

interface OrbitTimelineProps {
  milestones: OrbitMilestone[];
}

export function OrbitTimeline({ milestones }: OrbitTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [activeId, setActiveId] = useState(milestones[0]?.id ?? 0);
  const [previousId, setPreviousId] = useState<number | null>(null);
  const [hoverDomain, setHoverDomain] = useState<OrbitDomain | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [arcSpan, setArcSpan] = useState(180);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const span =
        180 -
        Math.min(40, Math.max(0, ((width - 720) / (1440 - 720)) * 40));
      const spanRad = (Math.PI / 180) * span;
      const chord = Math.max(0, width - EDGE_PADDING * 2);
      const radius = chord / (2 * Math.sin(spanRad / 2));
      const height = Math.max(
        MIN_HEIGHT,
        Math.round(radius + LABEL_PADDING + BOTTOM_PADDING)
      );
      setArcSpan(span);
      setSize({ width, height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = orbitRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      setHasEntered(true);
    }
  }, [isInView]);

  const active =
    milestones.find((item) => item.id === activeId) ?? milestones[0];
  const previous =
    previousId != null
      ? milestones.find((item) => item.id === previousId) ?? null
      : null;

  const orbitData = useMemo(() => {
    if (!size.width || !size.height) return [];
    const centerX = size.width / 2;
    const centerY = size.height - BOTTOM_PADDING;
    const spanRad = (Math.PI / 180) * arcSpan;
    const chord = Math.max(0, size.width - EDGE_PADDING * 2);
    const baseRadius = chord / (2 * Math.sin(spanRad / 2));
    const startAngle = 180 + (180 - arcSpan) / 2;
    const endAngle = 360 - (180 - arcSpan) / 2;
    const monthStep = (endAngle - startAngle) / 12;

    return milestones.map((item, index) => {
      const radius = baseRadius * RING_SCALE[item.domain];
      const t = (item.angle - 180) / 180;
      const angle = startAngle + t * (endAngle - startAngle);
      const rad = (Math.PI / 180) * angle;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);
      const monthAngle = startAngle + (item.month + 0.5) * monthStep;
      return {
        ...item,
        x,
        y,
        radius,
        centerX,
        centerY,
        index,
        angle,
        monthAngle,
        monthLabel: MONTHS[item.month] ?? "JAN",
      };
    });
  }, [arcSpan, milestones, size]);

  const rings = useMemo(() => {
    if (!size.width || !size.height) return [];
    const centerX = size.width / 2;
    const centerY = size.height - BOTTOM_PADDING;
    const spanRad = (Math.PI / 180) * arcSpan;
    const chord = Math.max(0, size.width - EDGE_PADDING * 2);
    const baseRadius = chord / (2 * Math.sin(spanRad / 2));
    return [
      { domain: "frontend" as const, radius: baseRadius * RING_SCALE.frontend },
      { domain: "design" as const, radius: baseRadius * RING_SCALE.design },
      { domain: "music" as const, radius: baseRadius * RING_SCALE.music },
    ].map((ring) => ({
      ...ring,
      centerX,
      centerY,
    }));
  }, [arcSpan, size]);

  const ticks = useMemo(() => {
    if (!size.width || !size.height)
      return {
        major: [],
        minor: [],
        months: [],
        monthBoundaries: [],
        yearRadius: 0,
        monthRadius: 0,
      };
    const centerX = size.width / 2;
    const centerY = size.height - BOTTOM_PADDING;
    const spanRad = (Math.PI / 180) * arcSpan;
    const chord = Math.max(0, size.width - EDGE_PADDING * 2);
    const baseRadius = chord / (2 * Math.sin(spanRad / 2));
    const outerRadius = baseRadius * RING_SCALE.frontend;
    const yearRadius = outerRadius + YEAR_RING_OFFSET;
    const monthRadius = outerRadius + MONTH_RING_OFFSET;
    const startAngle = 180 + (180 - arcSpan) / 2;
    const endAngle = 360 - (180 - arcSpan) / 2;
    const major = orbitData.map((item) => ({
      year: item.year,
      angle: item.angle,
      centerX,
      centerY,
      outerRadius: yearRadius,
    }));
    const monthStep = (endAngle - startAngle) / 12;
    const monthsData = MONTHS.map((label, index) => ({
      label,
      angle: startAngle + (index + 0.5) * monthStep,
      centerX,
      centerY,
      outerRadius: monthRadius,
    }));
    const monthBoundaries = Array.from({ length: 13 }, (_, index) => ({
      angle: startAngle + index * monthStep,
      centerX,
      centerY,
      outerRadius: monthRadius,
    }));
    const minor = monthBoundaries.map((item) => ({
      angle: item.angle,
      centerX,
      centerY,
      outerRadius,
    }));
    for (let angle = startAngle; angle <= endAngle; angle += 8) {
      if (major.some((tick) => Math.abs(tick.angle - angle) < 2)) continue;
      if (minor.some((tick) => Math.abs(tick.angle - angle) < 2)) continue;
      minor.push({ angle, centerX, centerY, outerRadius });
    }
    return {
      major,
      minor,
      months: monthsData,
      monthBoundaries,
      yearRadius,
      monthRadius,
    };
  }, [arcSpan, orbitData, size]);

  useEffect(() => {
    if (previousId == null) return;
    const timeout = window.setTimeout(() => setPreviousId(null), 220);
    return () => window.clearTimeout(timeout);
  }, [previousId]);

  const handleSelect = (id: number) => {
    if (id === activeId) return;
    setPreviousId(activeId);
    setActiveId(id);
  };

  const activeOrbit =
    orbitData.find((item) => item.id === activeId) ?? orbitData[0];
  const monthRotation =
    activeOrbit != null ? activeOrbit.angle - activeOrbit.monthAngle : 0;
  const monthRotationTransform =
    size.width && size.height
      ? `rotate(${monthRotation} ${size.width / 2} ${
          size.height - BOTTOM_PADDING
        })`
      : undefined;

  return (
    <div
      className={`orbit-timeline ${isInView ? "orbit-in" : ""}`}
      ref={orbitRef}
    >
      <div
        className="orbit-canvas"
        ref={containerRef}
        style={{ height: size.height || undefined }}
        data-active-domain={hoverDomain ?? active?.domain}
      >
        <svg
          className="orbit-svg"
          viewBox={`0 0 ${size.width || 1} ${size.height || 1}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {rings.map((ring, index) => {
            const startAngle = 180 + (180 - arcSpan) / 2;
            const endAngle = 360 - (180 - arcSpan) / 2;
            const startRad = (Math.PI / 180) * startAngle;
            const endRad = (Math.PI / 180) * endAngle;
            const startX = ring.centerX + ring.radius * Math.cos(startRad);
            const startY = ring.centerY + ring.radius * Math.sin(startRad);
            const endX = ring.centerX + ring.radius * Math.cos(endRad);
            const endY = ring.centerY + ring.radius * Math.sin(endRad);
            const largeArc = arcSpan > 180 ? 1 : 0;
            const d = `M ${startX} ${startY} A ${ring.radius} ${ring.radius} 0 ${largeArc} 1 ${endX} ${endY}`;
            return (
              <path
                key={index}
                className={`orbit-ring ${ring.domain}`}
                d={d}
                pathLength={1}
              />
            );
          })}
          {ticks.minor.map((tick, index) => {
            const rad = (Math.PI / 180) * tick.angle;
            const inner = tick.outerRadius - 6;
            const outer = tick.outerRadius + 4;
            const x1 = tick.centerX + inner * Math.cos(rad);
            const y1 = tick.centerY + inner * Math.sin(rad);
            const x2 = tick.centerX + outer * Math.cos(rad);
            const y2 = tick.centerY + outer * Math.sin(rad);
            return (
              <line
                key={`minor-${index}`}
                className="orbit-tick minor"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              />
            );
          })}
          {ticks.major.map((tick, index) => {
            const rad = (Math.PI / 180) * tick.angle;
            const inner = tick.outerRadius - 6;
            const outer = tick.outerRadius + 6;
            const x1 = tick.centerX + inner * Math.cos(rad);
            const y1 = tick.centerY + inner * Math.sin(rad);
            const x2 = tick.centerX + outer * Math.cos(rad);
            const y2 = tick.centerY + outer * Math.sin(rad);
            const labelRadius = tick.outerRadius + 10;
            const lx = tick.centerX + labelRadius * Math.cos(rad);
            const ly = tick.centerY + labelRadius * Math.sin(rad);
            const rotate = tick.angle + 90;
            return (
              <g key={`major-${index}`} className="orbit-tick-group">
                <line
                  className="orbit-tick major"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                />
                <text
                  className="orbit-year-label"
                  x={lx}
                  y={ly}
                  transform={`rotate(${rotate} ${lx} ${ly})`}
                >
                  {tick.year}
                </text>
              </g>
            );
          })}
          <g
            className="orbit-month-ring"
            transform={monthRotationTransform}
            style={{
              transformOrigin: `${size.width / 2}px ${
                size.height - BOTTOM_PADDING
              }px`,
            }}
          >
            {ticks.monthBoundaries.map((tick, index) => {
              const rad = (Math.PI / 180) * tick.angle;
              const inner = tick.outerRadius - 8;
              const outer = tick.outerRadius + 8;
              const x1 = tick.centerX + inner * Math.cos(rad);
              const y1 = tick.centerY + inner * Math.sin(rad);
              const x2 = tick.centerX + outer * Math.cos(rad);
              const y2 = tick.centerY + outer * Math.sin(rad);
              return (
                <line
                  key={`month-${index}`}
                  className="orbit-tick month"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                />
              );
            })}
            {ticks.months.map((tick, index) => {
              const rad = (Math.PI / 180) * tick.angle;
              const labelRadius = tick.outerRadius + 12;
              const lx = tick.centerX + labelRadius * Math.cos(rad);
              const ly = tick.centerY + labelRadius * Math.sin(rad);
              const rotate = tick.angle + 90;
              return (
                <text
                  key={`month-label-${index}`}
                  className="orbit-month-label"
                  x={lx}
                  y={ly}
                  transform={`rotate(${rotate} ${lx} ${ly})`}
                >
                  {tick.label}
                </text>
              );
            })}
          </g>
        </svg>

        <div className="orbit-detail-layer">
          {previous && (
            <div className="orbit-detail orbit-detail-exit">
              <p className="orbit-detail-year">{previous.year}</p>
              <h4 className="orbit-detail-title">{previous.title}</h4>
              <p className="orbit-detail-text">{previous.detail}</p>
            </div>
          )}
          {active && (
            <div
              className={`orbit-detail ${
                isInView ? "orbit-detail-enter" : ""
              } ${isInView && !hasEntered ? "orbit-detail-initial" : ""}`}
              key={active.id}
            >
              <p className="orbit-detail-year">
                {activeOrbit?.monthLabel} {activeOrbit?.day} · {active.year}
              </p>
              <h4 className="orbit-detail-title">{active.title}</h4>
              <p className="orbit-detail-text">{active.detail}</p>
            </div>
          )}
        </div>

        {orbitData.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`orbit-node orbit-${item.domain} ${
              item.id === activeId ? "active" : ""
            }`}
            style={{
              left: item.x,
              top: item.y,
              ["--delay" as string]: `${item.index * 60}ms`,
            }}
            onClick={() => handleSelect(item.id)}
            onMouseEnter={() => setHoverDomain(item.domain)}
            onMouseLeave={() => setHoverDomain(null)}
            aria-label={`${item.monthLabel} ${item.day} ${item.year} ${item.title}`}
          >
            <span className="orbit-tooltip">
              {item.monthLabel} {item.day} · {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
