"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "ホーム" },
    { href: "/editor", label: "背景削除" },
    { href: "/how-to-use", label: "使い方" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--text-primary)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--gradient-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ✂️
          </div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Cutout AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            gap: 16,
            alignItems: "center",
          }}
          className="nav-desktop shadow-none"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 4px",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                color:
                  pathname === link.href
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                transition: "all var(--transition-fast)",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/editor" 
            className="btn-primary" 
            style={{ 
              marginLeft: 16, 
              padding: "8px 20px", 
              fontSize: 14, 
              textDecoration: "none",
              whiteSpace: "nowrap"
            }}
          >
            今すぐ試す
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            fontSize: 24,
            cursor: "pointer",
            padding: 8,
          }}
          aria-label="メニュー"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav
          className="md:hidden"
          style={{
            padding: "8px 24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                color:
                  pathname === link.href
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                background:
                  pathname === link.href
                    ? "rgba(108, 92, 231, 0.1)"
                    : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
