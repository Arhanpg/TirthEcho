export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant w-full mt-auto opacity-90 hover:opacity-100 transition-opacity">
      <div className="w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-md">
        {/* Brand */}
        <div className="font-h3 text-h3 text-on-surface-variant">TirthEcho</div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-md">
          <a href="#" className="text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors">
            About
          </a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors">
            Donate
          </a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors">
            Privacy
          </a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors">
            Terms
          </a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors">
            Contact
          </a>
        </nav>

        {/* Copyright */}
        <div className="text-on-surface-variant font-body-md text-body-md text-center md:text-right">
          © 2024 TirthEcho. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
