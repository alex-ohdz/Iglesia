// utils/device.js
export function isMobileDevice(userAgent) {
	return /iPhone|iPad|iPod|Android/i.test(userAgent);
  }
  