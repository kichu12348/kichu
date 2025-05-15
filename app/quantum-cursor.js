'use client';

import { useEffect, useState } from 'react';

export default function QuantumCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const cursor = document.createElement('div');
      cursor.classList.add('quantum-cursor');
      document.body.appendChild(cursor);
      const onMouseMove = (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        setPosition({ x: e.clientX, y: e.clientY });
        const probabilityShift = Math.random() > 0.95;
        if (probabilityShift) {
          const shift = Math.random() * 5 - 2.5;
          cursor.style.transform = `translate(-50%, -50%) translateX(${shift}px)`;
        } else {
          cursor.style.transform = `translate(-50%, -50%)`;
        }
        
        setVisible(true);
      };
      const addActive = () => {
        cursor.classList.add('active');
        setActive(true);
      };
      
      const removeActive = () => {
        cursor.classList.remove('active');
        setActive(false);
      };
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .techCard, .projectCard, .timelineContent, .contactLink .quant-cursor'
      );
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', addActive);
        el.addEventListener('mouseleave', removeActive);
      });

      const onMouseEnter = () => setVisible(true);
      const onMouseLeave = () => setVisible(false);
      const techCards = document.querySelectorAll('.techCard');
      
      techCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', `${x}%`);
          card.style.setProperty('--mouse-y', `${y}%`);
        });
      });

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseleave', onMouseLeave);
        
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', addActive);
          el.removeEventListener('mouseleave', removeActive);
        });
        
        document.body.removeChild(cursor);
      };
    }
  }, []);

  return null; 
}
