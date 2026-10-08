"use client";

import { useEffect, useState } from "react";
import { relationshipDateLabel, relationshipStartDate } from "@/lib/love-story";

type RelationshipDuration = {
  months: number;
  days: number;
};

function getRelationshipDuration(today: Date): RelationshipDuration {
  const start = new Date(
    relationshipStartDate.getFullYear(),
    relationshipStartDate.getMonth(),
    relationshipStartDate.getDate(),
  );
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (end < start) return { months: 0, days: 0 };

  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  const monthAnchor = new Date(start.getFullYear(), start.getMonth() + months, start.getDate());

  if (monthAnchor > end) months -= 1;

  const completedMonths = new Date(start.getFullYear(), start.getMonth() + months, start.getDate());
  const days = Math.floor((end.getTime() - completedMonths.getTime()) / 86_400_000);
  return { months, days };
}

function nextLocalMidnight() {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 50);
  return midnight.getTime() - Date.now();
}

export default function RelationshipCounter() {
  const [duration, setDuration] = useState<RelationshipDuration | null>(null);

  useEffect(() => {
    let midnightTimer = 0;
    let refreshTimer = 0;

    const scheduleNextUpdate = () => {
      midnightTimer = window.setTimeout(() => {
        setDuration(getRelationshipDuration(new Date()));
        scheduleNextUpdate();
      }, nextLocalMidnight());
    };

    refreshTimer = window.setTimeout(() => {
      setDuration(getRelationshipDuration(new Date()));
      scheduleNextUpdate();
    }, 0);

    return () => {
      window.clearTimeout(midnightTimer);
      window.clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section className="relationship-note" aria-label="How long we have been together">
      <p className="relationship-intro">We&apos;ve been us for</p>
      <div className="relationship-duration" aria-live="polite" aria-atomic="true">
        {duration ? (
          <>
            <span className="relationship-unit" key={`months-${duration.months}`}>
              <strong>{duration.months}</strong>
              <small>{duration.months === 1 ? "month" : "months"}</small>
            </span>
            <span className="relationship-unit" key={`days-${duration.days}`}>
              <strong>{duration.days}</strong>
              <small>{duration.days === 1 ? "day" : "days"}</small>
            </span>
          </>
        ) : (
          <span className="relationship-loading" aria-hidden="true" />
        )}
      </div>
      <p className="relationship-since">since {relationshipDateLabel}</p>
      <p className="relationship-afterthought">and I&apos;m still glad it started that day.</p>
    </section>
  );
}
