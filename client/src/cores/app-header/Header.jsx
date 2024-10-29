import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#121618]  h-16 w-full z-50">
      <div className="flex items-center justify-between pr-6 h-full">
        <div className="flex items-center space-x-4 ml-40 md:ml-20 lg:ml-40 mt-2">
          <div className="hidden md:flex flex-col justify-center text-white text-2xl font-normal text-left">
            <span>
              <span className="text-[#0796EF]">ORDER</span>
              <span> ITEMS</span>
            </span>
          </div>
        </div>
        <div className="hidden md:flex space-x-8 lg:mr-36 mt-6 text-white">
          {[
            { label: "ITEMS LIST", link: "/" },
            { label: "SUPPLIERS", link: "/supplierlist" },
            { label: "PURCHASE ORDER", link: "/purchaseorder" },
          ].map((item) => (
            <Link
              to={item.link}
              key={item.label}
              className="text-[1rem] font-light tracking-widest hover:text-[#0796EF] transition duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuClick} className="text-[#857878]"></button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 right-0 bg-[#121618] text-white shadow-lg">
          <ul className="flex flex-col items-center py-4 text-center">
            {[
              { label: "HOME", link: "#" },
              { label: "MENU", link: "#" },
              { label: "MAKE A RESERVATION", link: "#" },
              { label: "CONTACT US", link: "#" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.link}
                  onClick={handleMenuClose}
                  className="text-sm font-light tracking-widest hover:text-[#0796EF] transition duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
