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
  label = 'Book Now',
  variant = 'solid',
  fullWidth = false,
  className = '',
  onClick,
}: BookNowButtonProps) {
  const base =
    'inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wider pill transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]';

  const variants = {
    solid: 'bg-gold text-navy shadow-accent hover:brightness-110',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-navy',
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
