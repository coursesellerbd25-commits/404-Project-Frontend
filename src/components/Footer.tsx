type FooterProps = {
  darkMode: boolean;
};

export default function Footer({ darkMode }: FooterProps) {
  return (
    <footer className="mt-24 pb-8">
      <p
        className={`text-center text-sm transition-colors duration-300 ${
          darkMode
            ? "text-white/70"
            : "text-black/70"
        }`}
      >
        © 2026 404. All rights reserved.
      </p>
    </footer>
  );
}