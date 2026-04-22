/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Logo = ({ variant = 'default', size = 'md' }: { variant?: 'default' | 'white' | 'dark', size?: 'sm' | 'md' | 'lg' }) => {
  const isWhite = variant === 'white';

  // Colores oficiales del Manual de Marca Lagos de Torca
  const colors = {
    lightBlue: isWhite ? 'rgba(255,255,255,0.9)' : '#61B1E3',   // Torca Azul
    teal:      isWhite ? 'rgba(255,255,255,0.7)' : '#74C6D3',   // Río Verde
    navy:      isWhite ? '#FFFFFF'               : '#1F3B6F',   // Azul Océano
    deepNavy:  isWhite ? 'rgba(255,255,255,0.85)': '#192A5E',
    purple:    isWhite ? 'rgba(255,255,255,0.55)': '#332664',   // Violeta Aéreo
    red:       isWhite ? '#FFFFFF'               : '#AD1924',   // Rojo Hibisco
    yellow:    isWhite ? '#FFFFFF'               : '#FFDA28',   // Luz Solar
  };

  const svgSizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex items-center transition-all duration-300">
      <div className={`relative ${svgSizes[size]} flex-shrink-0 group mr-5`}>
        {/*
          Tingua Azul — origami geométrico, fiel al Manual de Marca 2023.
          Estructura de capas (de atrás hacia adelante):
            1. Ala azul clara (elemento dominante, barre hacia abajo-izquierda)
            2. Acento teal (unión ala-cuerpo)
            3. Cuerpo superior navy (cabeza, cuello, lomo)
            4. Cuerpo inferior navy (vientre y cola)
            5. Vientre violeta (acento)
            6. Pico amarillo
            7. Cresta roja
            8. Acento patas rojo
        */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-sm transform group-hover:scale-110 transition-all duration-500"
        >
          {/* Ala principal — azul clara, barre de hombro a punta izquierda */}
          <polygon points="6,53 47,25 55,70 21,84" fill={colors.lightBlue} />

          {/* Acento teal — unión ala/hombro */}
          <polygon points="47,25 55,48 55,70" fill={colors.teal} />

          {/* Cuerpo superior — cabeza, cuello y lomo */}
          <polygon points="47,25 57,9 78,17 83,37 68,51 55,48" fill={colors.navy} />

          {/* Cuerpo inferior + cola */}
          <polygon points="55,48 68,51 72,76 48,91 33,81" fill={colors.deepNavy} />

          {/* Vientre violeta */}
          <polygon points="55,48 68,51 65,68 55,64" fill={colors.purple} />

          {/* Pico — amarillo, punta derecha */}
          <polygon points="78,15 94,27 78,32" fill={colors.yellow} />

          {/* Cresta — rojo, sobre el pico */}
          <polygon points="74,9 82,3 83,13" fill={colors.red} />

          {/* Acento patas — rojo, base de la cola */}
          <polygon points="38,83 48,91 37,94" fill={colors.red} />
        </svg>
      </div>

      <div className="flex flex-col leading-[0.7] select-none pt-2">
        <span
          className={`tracking-[0.45em] uppercase font-bold sm:inline hidden ${isWhite ? 'text-white/60' : 'text-[#61B1E3]'}`}
          style={{ fontSize: size === 'lg' ? '1.5rem' : size === 'md' ? '0.9rem' : '0.65rem' }}
        >
          LAGOS DE
        </span>
        <span
          className={`font-black tracking-tighter ${isWhite ? 'text-white' : 'text-[#1F3B6F]'}`}
          style={{ fontSize: size === 'lg' ? '5.5rem' : size === 'md' ? '3.8rem' : '2.6rem' }}
        >
          TORCA
        </span>
      </div>
    </div>
  );
};
