import React from 'react';
import clsx from 'clsx';

export function SeverityBadge({ severity, className = '' }) {
  const styles = {
    CRITICAL: 'bg-red-950/80 text-red-400 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.2)]',
    HIGH: 'bg-orange-950/80 text-orange-400 border-orange-500/50',
    MODERATE: 'bg-amber-950/80 text-amber-400 border-amber-500/50',
    CLEAR: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50',
    SAFE: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50',
    CAUTION: 'bg-amber-950/80 text-amber-400 border-amber-500/50',
    BLOCKED: 'bg-red-950/80 text-red-400 border-red-500/50'
  };

  const labels = {
    CRITICAL: 'CRITICAL THREAT',
    HIGH: 'HIGH ALERT',
    MODERATE: 'WATCH & PREPARE',
    CLEAR: 'NORMAL (CLEAR)',
    SAFE: 'SAFE ROUTE',
    CAUTION: 'USE CAUTION',
    BLOCKED: 'BLOCKED / SUBMERGED'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider border uppercase',
        styles[severity] || styles.MODERATE,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {labels[severity] || severity}
    </span>
  );
}
