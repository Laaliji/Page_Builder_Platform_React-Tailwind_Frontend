"use client";
import { cn } from "../../template/utils/ui-utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const ModalContext = createContext(undefined);

export const ModalProvider = ({
  children,
  initialOpen = false 
}) => {
  const [open, setOpen] = useState(initialOpen);  

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({
  children,
  initialOpen = false,
  closeButton = true
}) {
  return <ModalProvider initialOpen={initialOpen}>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className
}) => {
  const { setOpen } = useModal();
  return (
    (<button
      className={cn(
        "px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
        className
      )}
      onClick={() => setOpen(true)}>
      {children}
    </button>)
  );
};

export const ModalBody = ({
  children,
  className,
  disableOutsideClick = true
}) => {
  const { open } = useModal();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const modalRef = useRef(null);
  const { setOpen } = useModal();
  
  // Only add outside click handler if not disabled
  useOutsideClick(modalRef, disableOutsideClick ? () => {} : () => setOpen(false));

  return (
    (<AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50">
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}>
           
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>)
  );
};

export const ModalContent = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col flex-1 p-8 md:p-10", className)}>
      {children}
    </div>)
  );
};

export const ModalFooter = ({
  children,
  className
}) => {
  return (
    (<div
      className={cn("flex justify-end p-4 bg-gray-100 dark:bg-neutral-900", className)}>
      {children}
    </div>)
  );
};

const Overlay = ({
  className
}) => {
  return (
    (<motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}></motion.div>)
  );
};

export const useOutsideClick = (
  ref,
  callback
) => {
  useEffect(() => {
    const listener = (event) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};