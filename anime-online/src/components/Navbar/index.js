import React from 'react'
import "./styles/Navbar.css"
import { NAV_ITEMS } from './constants/navItems';

export default function NavBar() {

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark box-border">
        <div className="container-fluid p-3 ps-md-5">
          <div>
            <a className="navbar-brand" href="/homepage">
              <span className="hover:text-violet-400"> ☯ vEpic Company </span>
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-label="Toggle navigation"
            aria-expanded="true"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="justify-content-end collapse navbar-collapse pe-5"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {
                NAV_ITEMS.map((item) => (
                  <li className="nav-item">
                    <a
                      className="nav-link hover:text-violet-400 pb-0 text-sm hover:border-b-2 border-indigo-600"
                      aria-current="page"
                      href={item.href}
                    >
                      {item.text}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
