import React from 'react';

import { BOOKING_PAGE_URL } from '../data/firstOrderPromo';

interface BookNowButtonProps {
  label?: string;
  variant?: 'solid' | 'outline';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function BookNowButton({
  label = 'Schedule your collection',
  variant = 'solid',
  fullWidth = false,
  className = '',
  onClick,
}: BookNowButtonProps) {
  const base =
    'inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide pill transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]';

  const variants = {
    solid: 'bg-gold text-paper shadow-accent hover:brightness-105',
    outline: 'border border-gold/70 text-gold hover:bg-gold hover:text-paper',
  };

  return (
    <a
      href={BOOKING_PAGE_URL}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {label}
    </a>
  );
}
