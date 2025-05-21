import React from 'react';

const badgeColors = {
  high: 'bg-red-500',
  normal: 'bg-yellow-500',
  low: 'bg-green-500',
};

export default function PriorityBadge({ priority }) {
  return (
    <span className={`ml-3 px-2 py-0.5 rounded text-xs font-semibold text-white ${badgeColors[priority] || badgeColors.normal}`}> 
      {priority || 'normal'}
    </span>
  );
}
