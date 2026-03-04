import React from 'react';
import { CgClose } from 'react-icons/cg';

export default function VideoModal({ children, onClose }) {
  return (
    <section
      className="video_modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button className="video_modal_close" onClick={() => onClose()}>
        <CgClose />
      </button>
      <div>{children}</div>
    </section>
  );
}
