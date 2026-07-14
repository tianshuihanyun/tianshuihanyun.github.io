import { motion, useMotionValue, useTransform } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";

function CardRotate({ children, onSendToBack, onCardClick, sensitivity, isTop }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  // 标记本次交互是否有拖拽移动（大于2px）
  const dragMoved = useRef(false);

  function handleDragEnd(_, info) {
    const dx = Math.abs(info.offset.x);
    const dy = Math.abs(info.offset.y);
    if (dx > 2 || dy > 2) {
      dragMoved.current = true;
    }
    if (dx > sensitivity || dy > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  function handleClick(e) {
    e.stopPropagation();
    // 只有完全没有拖拽移动，才视为"点击"→打开大图
    if (isTop && onCardClick && !dragMoved.current) {
      onCardClick();
    }
    dragMoved.current = false;
  }

  return (
    <motion.div
      style={{ position: "absolute", inset: 0, x, y, rotateX, rotateY, zIndex: isTop ? 10 : 0 }}
      drag={isTop}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={isTop ? { cursor: "grabbing" } : undefined}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  onCardClick,
}) {
  const [isPaused, setIsPaused] = useState(false);

  const [stack, setStack] = useState(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    }
    return [];
  });

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((content, index) => ({ id: index + 1, content })));
    }
  }, [cards]);

  const sendToBack = useCallback((id) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      if (index < 0) return prev;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  }, []);

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused, sendToBack]);

  if (!stack.length) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        perspective: 600,
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const isTop = index === stack.length - 1;
        const randomRot = randomRotation ? Math.random() * 10 - 5 : 0;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            onCardClick={onCardClick ? () => onCardClick(card.id - 1) : undefined}
            sensitivity={sensitivity}
            isTop={isTop}
          >
            <motion.div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRot,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
