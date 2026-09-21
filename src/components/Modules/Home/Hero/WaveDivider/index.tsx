export function WaveDivider() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 h-22 md:h-34">
      <div className="absolute inset-x-0 bottom-0 h-6 bg-white md:h-10" />

      <svg
        className="absolute inset-x-0 bottom-6 block h-16 w-full md:bottom-10 md:h-24"
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 48C240 24 480 56 720 44C960 32 1200 16 1440 28V80H0V48Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
