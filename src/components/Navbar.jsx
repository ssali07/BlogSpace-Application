import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
     const [isOpen, setIsOpen] = useState(false);

     const toggleMenu = () => setIsOpen(!isOpen);
     const closeMenu = () => setIsOpen(false);

     return (
          <header className="border-b border-gray-200 shadow-sm">
               <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">BlogSpace</Link>
                    <nav className="hidden md:flex items-center gap-6">
                         <Link to="/" className="font-medium hover:text-blue-600 transition-colors">Home</Link>
                         <Link to="/" className="font-medium hover:text-blue-600 transition-colors">Categories</Link>
                         <Link to="/" className="font-medium hover:text-blue-600 transition-colors">About</Link>
                         <Link to="/" className="font-medium hover:text-blue-600 transition-colors">Contact</Link>
                    </nav>
                    <button className="md:hidden p-2" onClick={toggleMenu}>
                         <Menu size={24} />
                    </button>
               </div>
               {isOpen && (
                    <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-10" onClick={closeMenu}></div>
               )}
               <div className={`fixed top-0 left-0 w-full bg-white shadow-md transform transition-transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} z-20 p-6`}>
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-bold">Menu</h2>
                         <button onClick={closeMenu}>
                              <X size={24} />
                         </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                         <Link to="/" className="font-medium hover:text-blue-600" onClick={closeMenu}>Home</Link>
                         <Link to="/" className="font-medium hover:text-blue-600" onClick={closeMenu}>Categories</Link>
                         <Link to="/" className="font-medium hover:text-blue-600" onClick={closeMenu}>About</Link>
                         <Link to="/" className="font-medium hover:text-blue-600" onClick={closeMenu}>Contact</Link>
                    </nav>
               </div>
          </header>
     );
};

export default Navbar;