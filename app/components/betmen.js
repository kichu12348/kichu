import bat from "./images/bat.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BatmanEasterEgg() {
  const [bats, setBats] = useState([]);
  const [showSpotlight, setShowSpotlight] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSpotlight(false);
    }, 1500);

    const batCount = Math.floor(Math.random() * 11) + 15; // 15-25 bats
    const newBats = [];

    for (let i = 0; i < batCount; i++) {
      newBats.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 30 + 20,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 0.5,
        direction: Math.random() > 0.5 ? "ltr" : "rtl",
        flapSpeed: Math.random() * 0.2 + 0.1,
        verticalMove: Math.random() * 40 - 20,
      });
    }

    setBats(newBats);

    // Cleanup
    return () => {
      setBats([]);
      setShowSpotlight(false);
    };
  }, []);

  return (
    <div className="batman-easter-egg">
      {/* heh 😼 */}

      {bats.map((batItem) => (
        <div
          key={batItem.id}
          className={`flying-bat ${batItem.direction}`}
          style={{
            top: `${batItem.top}%`,
            left: `${batItem.left}%`,
            width: `${batItem.size}px`,
            height: `${batItem.size}px`,
            animationDuration: `${batItem.duration}s`,
            animationDelay: `${batItem.delay}s`,
            animationTimingFunction: `cubic-bezier(${Math.random() * 0.3}, ${
              Math.random() * 0.5
            }, ${0.5 + Math.random() * 0.3}, ${Math.random() * 0.3})`,
          }}
        >
          <div
            className="bat-wrapper"
            style={{
              animationDuration: `${batItem.flapSpeed}s`,
              animationDelay: `${batItem.delay}s`,
            }}
          >
            <Image
              src={bat}
              alt="Bat"
              width={batItem.size}
              height={batItem.size}
              className="bat-image"
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        .batman-easter-egg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
          background: rgba(0, 0, 0, 0);
          transition: background 2s;
        }

        .batman-spotlight {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: spotlight-flash 1.5s ease-in-out forwards;
          z-index: 10000;
        }

        .spotlight-inner {
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(0, 0, 0, 0) 70%
          );
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .spotlight-logo {
          animation: logo-pulse 1.5s ease-in-out;
          filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.8));
        }

        .flying-bat {
          position: absolute;
          transform: scale(0);
          opacity: 0;
          animation-fill-mode: forwards;
          filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.5));
        }

        .bat-wrapper {
          animation-name: bat-flap;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-timing-function: ease-in-out;
          transform-origin: center center;
        }

        .bat-image {
          width: 100%;
          height: 100%;
          transform-origin: center center;
        }

        .ltr {
          animation-name: fly-ltr;
        }

        .rtl {
          animation-name: fly-rtl;
        }

        @keyframes spotlight-flash {
          0% {
            background-color: rgba(0, 0, 0, 0);
          }
          20% {
            background-color: rgba(0, 0, 0, 0.8);
          }
          80% {
            background-color: rgba(0, 0, 0, 0.8);
          }
          100% {
            background-color: rgba(0, 0, 0, 0);
          }
        }

        @keyframes logo-pulse {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          20% {
            transform: scale(1.2);
            opacity: 1;
          }
          80% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes fly-ltr {
          0% {
            transform: translateX(-100px) translateY(20px) scale(0)
              rotate(-45deg);
            opacity: 0;
          }
          10% {
            transform: translateX(0) translateY(0) scale(1) rotate(0deg);
            opacity: 0.8;
          }
          40% {
            transform: translateX(40vw) translateY(-30px) scale(1.1)
              rotate(5deg);
            opacity: 0.9;
          }
          70% {
            transform: translateX(80vw) translateY(20px) scale(1) rotate(-5deg);
            opacity: 0.8;
          }
          90% {
            transform: translateX(110vw) translateY(-10px) scale(0.8)
              rotate(15deg);
            opacity: 0.5;
          }
          100% {
            transform: translateX(150vw) translateY(-50vh) scale(0)
              rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes fly-rtl {
          0% {
            transform: translateX(100px) translateY(20px) scale(0) rotate(45deg);
            opacity: 0;
          }
          10% {
            transform: translateX(0) translateY(0) scale(1) rotate(0deg);
            opacity: 0.8;
          }
          40% {
            transform: translateX(-40vw) translateY(-30px) scale(1.1)
              rotate(-5deg);
            opacity: 0.9;
          }
          70% {
            transform: translateX(-80vw) translateY(20px) scale(1) rotate(5deg);
            opacity: 0.8;
          }
          90% {
            transform: translateX(-110vw) translateY(-10px) scale(0.8)
              rotate(-15deg);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-150vw) translateY(-50vh) scale(0)
              rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes bat-flap {
          0% {
            transform: scaleX(1) scaleY(1) rotate(-5deg);
          }
          25% {
            transform: scaleX(0.8) scaleY(1.2) rotate(-2deg);
          }
          50% {
            transform: scaleX(0.6) scaleY(1.1) rotate(0deg);
          }
          75% {
            transform: scaleX(0.8) scaleY(1.2) rotate(2deg);
          }
          100% {
            transform: scaleX(1) scaleY(1) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
