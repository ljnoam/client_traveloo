// src/components/UI/BlurText.jsx
import { useEffect, useState, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', 
  direction = 'top', 
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const animatedCount = useRef(0);
  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };
  const defaultTo = [
    { filter: 'blur(5px)', opacity: 0.5, transform: direction === 'top'
        ? 'translate3d(0,5px,0)'
        : 'translate3d(0,-5px,0)' },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  // FORCER l'animation au montage
  useEffect(() => {
    setInView(true);
  }, []);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
            for (const step of (animationTo || defaultTo)) {
              await next(step);
            }
            animatedCount.current += 1;
            if (animatedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <p className={`flex flex-wrap justify-center ${className}`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
};

export default BlurText;
