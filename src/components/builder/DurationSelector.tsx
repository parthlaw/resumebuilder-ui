"use client";

import { useState } from "react";
import { ResumeSection as ResumeSectionType, ResumeItem, useResumeStore } from "@/utils/store";

const months = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
];

function parseDuration(duration: string | undefined) {
  if (!duration) return null;
  const parts = duration.split("-").map(p => p.trim());
  if (parts.length !== 2) return null;
  const [start, end] = parts;
  const [sMon, sYear] = start.split(" ");
  const [eMon, eYear] = end.split(" ");
  return {
    startMonth: months.indexOf(sMon) >= 0 ? months.indexOf(sMon) : 0,
    startYear: Number(sYear) || new Date().getFullYear(),
    endMonth: months.indexOf(eMon) >= 0 ? months.indexOf(eMon) : 0,
    endYear: Number(eYear) || new Date().getFullYear(),
  };
}

interface DurationSelectorProps {
  section?: ResumeSectionType;
  item?: ResumeItem;
  value?: string; // controlled value
  onChange?: (value: string) => void; // controlled change handler
  className?: string;
}

const generateYears = (span = 10) => {
  const now = new Date().getFullYear();
  const years = [] as number[];
  for (let y = now - span; y <= now + span; y++) years.push(y);
  return years;
};

const DurationSelector = ({ section, item, value, onChange, className }: DurationSelectorProps) => {
  const updateSection = useResumeStore(s => s.updateSection);
  const sourceDuration = value ?? item?.duration;
  const parsed = parseDuration(sourceDuration || "");
  const now = new Date();
  const [editing, setEditing] = useState(false);
  const [sMon, setSMon] = useState<number>(parsed ? parsed.startMonth : now.getMonth());
  const [sYear, setSYear] = useState<number>(parsed ? parsed.startYear : now.getFullYear());
  const [eMon, setEMon] = useState<number>(parsed ? parsed.endMonth : now.getMonth());
  const [eYear, setEYear] = useState<number>(parsed ? parsed.endYear : now.getFullYear());

  const years = generateYears(15);

  const formatted = `${months[sMon]} ${sYear} - ${months[eMon]} ${eYear}`;
  const displayText = value ?? item?.duration ?? formatted;

  const persist = (nSMon: number, nSYear: number, nEMon: number, nEYear: number) => {
    const newFormatted = `${months[nSMon]} ${nSYear} - ${months[nEMon]} ${nEYear}`;
    if (onChange) {
      onChange(newFormatted);
    } else if (section && item) {
      const updatedItems = (section.items as ResumeItem[]).map(i => i.id === item.id ? { ...i, duration: newFormatted } : i);
      updateSection(section.id, { ...section, items: updatedItems });
    }
  };

  return (
    <div className={className}>
      {!editing ? (
        <button onClick={() => setEditing(true)} className="text-sm text-muted-foreground hover:underline">
          {displayText}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <select value={sMon} onChange={(e) => { const v = Number(e.target.value); setSMon(v); persist(v, sYear, eMon, eYear); }} className="px-2 py-1 border rounded text-sm">
            {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select value={sYear} onChange={(e) => { const v = Number(e.target.value); setSYear(v); persist(sMon, v, eMon, eYear); }} className="px-2 py-1 border rounded text-sm">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <span className="text-sm">—</span>
          <select value={eMon} onChange={(e) => { const v = Number(e.target.value); setEMon(v); persist(sMon, sYear, v, eYear); }} className="px-2 py-1 border rounded text-sm">
            {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select value={eYear} onChange={(e) => { const v = Number(e.target.value); setEYear(v); persist(sMon, sYear, eMon, v); }} className="px-2 py-1 border rounded text-sm">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      )}
    </div>
  );
};

export default DurationSelector;
