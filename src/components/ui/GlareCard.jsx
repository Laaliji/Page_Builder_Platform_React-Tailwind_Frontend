import { cn } from "../../template/utils/ui-utils";
import { useRef } from "react";

export const GlareCard = ({
  children,
  className,
  isSelected,
  onClick,
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef(null);
  const state = useRef({
    glare: { x: 20, y: 20 },
    background: { x: 20, y: 20 },
    rotate: { x: 0, y: 0 },
  });

  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": isSelected ? "0.6" : "0",
    "--radius": "48px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  };

  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg": `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='rgba(13, 146, 244, 0.5)' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round'/%3E%3C/svg%3E")`,
    "--pattern": "var(--foil-svg) center/100% no-repeat",
    "--rainbow":
      "repeating-linear-gradient( 0deg, rgba(13, 146, 244, 1) calc(var(--step) * 1), rgba(13, 146, 244, 1) calc(var(--step) * 2), rgba(13, 146, 244, 1) calc(var(--step) * 3), rgba(13, 146, 244, 0.8) calc(var(--step) * 4), rgba(13, 146, 244, 0.8) calc(var(--step) * 5), rgba(13, 146, 244, 1) calc(var(--step) * 6) ) 0% var(--bg-y)/200% 700% no-repeat",
    "--diagonal":
      "repeating-linear-gradient( 128deg, #0D92F4 0%, rgba(13, 146, 244, 0.2) 3.8%, rgba(13, 146, 244, 0.2) 4.5%, rgba(13, 146, 244, 0.2) 5.2%, #0D92F4 10%, #0D92F4 12% ) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade":
      "radial-gradient( farthest-corner circle at var(--m-x) var(--m-y), rgba(13, 146, 244, 0.4) 12%, rgba(13, 146, 244, 0.3) 20%, rgba(13, 146, 244, 0) 120% ) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "overlay, lighten, hue",
  };

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current?.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current?.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current?.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current?.style.setProperty("--bg-y", `${background.y}%`);
    }
  };

  return (
    <div
      style={containerStyle}
      className={`relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform w-[220px] [aspect-ratio:17/21] ${
        isSelected ? "shadow-xl bg-blue-100 scale-105" : "shadow-sm bg-white hover:shadow-lg"
      }`}
      ref={refElement}
      onPointerMove={(event) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.x / 3.5) * rotateFactor;
        rotate.y = (delta.y / 2) * rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current?.style.setProperty("--r-x", `0deg`);
          refElement.current?.style.setProperty("--r-y", `0deg`);
        }
      }}
      onClick={onClick}
    >
      <div
        className={`h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] overflow-hidden`}
      >
        <div
          className="h-full w-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]"
          style={backgroundStyle}
        >
          <div className={cn("h-full w-full bg-grey", className)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
