/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Logo = ({ variant = 'default', size = 'md' }: { variant?: 'default' | 'white' | 'dark', size?: 'sm' | 'md' | 'lg' }) => {
  const isWhite = variant === 'white';
  
  // High contrast palette for the Tingua Azul
  // Official Colors from Lagos de Torca Branding Image
  const colors = {
    lightBlue: isWhite ? 'rgba(255,255,255,0.8)' : '#72D3E6',
    teal: isWhite ? 'rgba(255,255,255,0.7)' : '#28B1CC',
    navy: isWhite ? '#FFFFFF' : '#192A5E',
    deepNavy: isWhite ? '#FFFFFF' : '#121A3B',
    red: isWhite ? '#FFFFFF' : '#BB1E2C',
    yellow: isWhite ? '#FFFFFF' : '#FBE486'
  };

  const svgSizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex items-center transition-all duration-300">
      <div className={`relative ${svgSizes[size]} flex-shrink-0 group mr-5`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-sm transform group-hover:scale-110 transition-all duration-500">
          {/* GEOMETRIC TINGUA (OFFICIAL LOGO MASTER) */}
          
          {/* Main Body & Neck (Navy) */}
          <path d="M72 15 L50 45 L72 32 Z" fill={colors.navy} />
          <path d="M50 45 L35 75 L72 32 Z" fill={colors.navy} opacity="0.95" />
          
          {/* Head & Upper Neck */}
          <path d="M72 15 L88 22 L72 32 Z" fill={colors.navy} />
          
          {/* Beak & Crest (The iconic details) */}
          <path d="M88 22 L98 25 L88 28 Z" fill={colors.yellow} />
          <path d="M82 17 L88 22 L82 22 Z" fill={colors.red} />
          
          {/* Origami Wings (Left side focus) */}
          {/* Layer 1: Bottom Teal */}
          <path d="M10 50 L40 65 L40 40 Z" fill={colors.teal} />
          {/* Layer 2: Top Light Blue */}
          <path d="M15 42 L45 32 L45 52 Z" fill={colors.lightBlue} />
          
          {/* Connection piece */}
          <path d="M40 40 L50 45 L45 32 Z" fill={colors.deepNavy} />
          
          {/* Tail/End pieces */}
          <path d="M35 75 L20 88 L30 78 Z" fill={colors.deepNavy} />
        </svg>
      </div>
      
      <div className="flex flex-col leading-[0.7] select-none pt-2">
        <span className={`tracking-[0.45em] uppercase font-bold sm:inline hidden ${isWhite ? 'text-white/60' : 'text-[#61B1E3]'}`} style={{ fontSize: size === 'lg' ? '1.5rem' : size === 'md' ? '0.9rem' : '0.65rem' }}>
          LAGOS DE
        </span>
        <span className={`font-black tracking-tighter ${isWhite ? 'text-white' : 'text-[#1F3B6F]'}`} style={{ fontSize: size === 'lg' ? '5.5rem' : size === 'md' ? '3.8rem' : '2.6rem' }}>
          TORCA
        </span>
      </div>
    </div>
  );
};
