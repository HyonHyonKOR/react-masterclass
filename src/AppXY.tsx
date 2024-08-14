import React, { useState } from "react";
import styles from "./AppXY.module.css";

export default function AppXY() {
  interface IPointer {
    pageX: number;
    pageY: number;
  }

  const [pointer, setPointer] = useState<IPointer>({ pageX: 0, pageY: 0 });

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    const { pageX } = event;
    const { pageY } = event;
    setPointer((prev) => ({ pageX, pageY }));
  };

  return (
    <div className={styles.container} onMouseMove={handleMouse}>
      <h1>XY</h1>
      <div
        className={styles.pointer}
        style={{
          transform: `translate(${pointer?.pageX}px, ${pointer?.pageY}px)`,
        }}
      ></div>
    </div>
  );
}
