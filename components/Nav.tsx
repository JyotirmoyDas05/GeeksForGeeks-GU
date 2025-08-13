import Link from 'next/link'; 

import React from 'react'

function Nav() {
  return (
    <nav>
        <div className="nav-logo">
            <Link href="/">GFG GU</Link>
        </div>
        <div className="nav-links">
          <Link href="/members">Members</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </div>
    </nav>
  )
}

export default Nav