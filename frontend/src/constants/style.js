export const slideFromUp = {
    hidden: {
      opacity: 0,
      y: "-50vh",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  export const slideFromLeft = {
    hidden: {
      opacity: 0,
      x: "-50vh",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };