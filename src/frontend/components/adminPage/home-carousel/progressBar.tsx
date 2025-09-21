import React from "react";

const ProgressBar = ({ progress, uploading }) => {
  if (!uploading) {
    return null;
  }

  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm">
      <div className="w-4/5 max-w-md rounded-full bg-white p-2 shadow-lg">
        <div className="h-3 w-full rounded-full bg-sanctuary-gold/30">
          <div
            className="h-full rounded-full bg-sanctuary-terracotta transition-all duration-200"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
