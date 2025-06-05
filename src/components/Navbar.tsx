import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

const Navbar = ({ onScrollToSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const sectionsRef = useRef<NodeListOf<Element> | null>(null);
  const NAVBAR_HEIGHT = 80; // Define navbar height as a constant

  // Function to update sections list. Used on mount and resize.
  const updateSections = useCallback(() => {
      sectionsRef.current = document.querySelectorAll("section[id]");
  }, []);

  // Function to handle scroll and determine active section
  const handleScroll = useCallback(() => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = sectionsRef.current;
      if (!sections || sections.length === 0) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Handle the case when scrolled to the very top
      if (scrollPosition === 0) {
          setActiveItem("home");
          return;
      }

      let currentActive = "home";
      let minDistance = Infinity;

      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionId = sectionElement.getAttribute("id") || "";
        if (!sectionId || sectionId === "home") return;

        const sectionTopRelativeToViewport = sectionElement.getBoundingClientRect().top;

        // Consider a section active if its top is within a certain range from the top of the viewport, after the navbar
        const distance = Math.abs(sectionTopRelativeToViewport - NAVBAR_HEIGHT);

        if (sectionTopRelativeToViewport <= NAVBAR_HEIGHT + 20 && sectionTopRelativeToViewport > -sectionElement.offsetHeight + NAVBAR_HEIGHT) {
             if (distance < minDistance) {
                 minDistance = distance;
                 currentActive = sectionId;
             }
        }

        // Fallback: if no section is close to the top, check if the middle of the section is in the viewport
        const sectionMiddleRelativeToViewport = sectionTopRelativeToViewport + sectionElement.offsetHeight / 2;
        if (sectionMiddleRelativeToViewport > 0 && sectionMiddleRelativeToViewport < viewportHeight) {
             // If the middle is in view, and it's not already assigned to a closer section
             if (currentActive === "home" || Math.abs(sectionMiddleRelativeToViewport - viewportHeight / 2) < Math.abs(((document.getElementById(currentActive) as HTMLElement)?.getBoundingClientRect().top || 0) + ((document.getElementById(currentActive) as HTMLElement)?.offsetHeight || 0) / 2 - viewportHeight / 2)) {
                  currentActive = sectionId;
             }
        }

      });

       // Final check if still on home section range after checking others
       const homeSection = document.getElementById("home") as HTMLElement;
       if (homeSection && scrollPosition < homeSection.offsetHeight / 2) { // Check if within the top half of the home section
            setActiveItem("home");
       } else {
           setActiveItem(currentActive);
       }

    }, [NAVBAR_HEIGHT]); // Added NAVBAR_HEIGHT to dependency array

  useEffect(() => {

    // Update sections and add event listeners
    updateSections();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateSections);

    // Initial check and setup
    // Delay initial handleScroll to allow all components to render and have correct dimensions
    const loadTimer = setTimeout(() => {
        updateSections(); // Re-update sections after a delay
        handleScroll(); // Perform initial scroll handling
    }, 500); // 500ms delay - adjust if needed


    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSections);
      clearTimeout(loadTimer);
    };
  }, [handleScroll, updateSections]); // Added handleScroll and updateSections to dependency array

  const menuItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Problema", href: "#problema", id: "problema" },
    { name: "Solução", href: "#solucoes", id: "solucoes" },
    { name: "Resultados", href: "#resultados", id: "resultados" },
    { name: "Depoimentos", href: "#depoimentos", id: "depoimentos" },
    { name: "Contato", href: "#contato", id: "contato" }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full overflow-hidden",
        isScrolled
          ? "bg-[#15191F]/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-b from-black/30 to-transparent py-4"
      )}
    >
      <div className="mx-auto w-full max-w-[100vw] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full h-16">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
             e.preventDefault();
             onScrollToSection("home");
          }}
        >
          <img
            src="/lovable-uploads/9e39c707-25f3-40d0-9e71-cdebc2d511eb.png"
            alt="NEXSYN Logo"
            className="h-8 md:h-10"
          />
        </motion.a>

        {/* Desktop Menu */}
        {/* Reverted to simple nav and a tags to avoid Radix UI NavigationMenu issues */}
        <nav className="hidden lg:flex items-center space-x-8">
           {menuItems.map((item) => (
             <motion.a
               key={item.id}
               href={item.href}
               className={cn(
                 "text-gray-200 transition-colors duration-300 font-medium relative",
                 activeItem === item.id ? "text-nexorange" : "", // Active state color
                 isScrolled ? "text-gray-200" : "text-gray-200"
               )}
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3 }}
               whileHover={{ color: "#FF6F00" }}
               onClick={(e) => {
                 e.preventDefault();
                 onScrollToSection(item.id);
               }}
             >
               {item.name}
               {/* Active item indicator */}
               {activeItem === item.id && (
                 <motion.span
                   className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-nexorange"
                   layoutId="activeSectionNavbar"
                   transition={{
                     type: "spring",
                     stiffness: 500,
                     damping: 30
                   }}
                 />
               )}
             </motion.a>
           ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <motion.a
          href="#contato"
          className="hidden lg:block bg-nexorange px-4 py-2 rounded-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(255,111,0,0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            onScrollToSection("contato");
          }}
        >
          Diagnóstico Gratuito
        </motion.a>

        {/* Mobile Menu Button - Improved for better touch targets */}
        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-12 w-12 text-gray-200 hover:bg-gray-800/50 hover:text-white focus-visible:ring-2 focus-visible:ring-nexorange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                <motion.span
                  className="flex items-center justify-center w-full h-full"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {isMobileMenuOpen ? (
                    <X size={28} className="h-7 w-7" />
                  ) : (
                    <Menu size={28} className="h-7 w-7" />
                  )}
                </motion.span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full max-w-[85vw] sm:max-w-md bg-[#0f1218] border-l border-gray-800 overflow-y-auto"
              onInteractOutside={(e) => {
                // Prevent closing when clicking on interactive elements
                const target = e.target as HTMLElement;
                if (target.closest('.mobile-menu-content')) {
                  e.preventDefault();
                }
              }}
            >
              <div className="mobile-menu-content h-full flex flex-col">
                <SheetHeader className="px-1 pt-2 pb-4 border-b border-gray-800">
                  <SheetTitle className="text-left">
                    <a 
                      href="#home" 
                      className="flex items-center"
                      onClick={() => {
                        onScrollToSection("home");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <img
                        src="/lovable-uploads/9e39c707-25f3-40d0-9e71-cdebc2d511eb.png"
                        alt="NEXSYN Logo"
                        className="h-10 w-auto"
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Menu Items */}
                <nav className="flex-1 py-4 overflow-y-auto">
                  <ul className="space-y-1">
                    {menuItems.map((item, index) => (
                      <motion.li 
                        key={item.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: index * 0.05,
                          ease: "easeOut"
                        }}
                      >
                        <a
                          href={item.href}
                          className={cn(
                            "block px-4 py-4 text-lg font-medium transition-colors duration-200 rounded-lg mx-2",
                            activeItem === item.id 
                              ? "bg-nexorange/10 text-nexorange" 
                              : "text-gray-200 hover:bg-gray-800/50 hover:text-white"
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            onScrollToSection(item.id);
                            // Add a small delay to allow the scroll to happen before closing
                            setTimeout(() => setIsMobileMenuOpen(false), 100);
                          }}
                        >
                          {item.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* CTA Button (Mobile) */}
                <motion.div 
                  className="p-4 pt-2 border-t border-gray-800"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: (menuItems.length * 0.05) + 0.1,
                    ease: "easeOut"
                  }}
                >
                  <a
                    href="#contato"
                    className={cn(
                      "block w-full text-center px-6 py-3 rounded-xl font-semibold text-base",
                      "bg-gradient-to-r from-nexorange/90 to-amber-600 text-white",
                      "hover:from-nexorange hover:to-amber-600 hover:shadow-lg hover:shadow-amber-500/20",
                      "active:scale-95 transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0f1218]"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      onScrollToSection("contato");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Diagnóstico Gratuito
                  </a>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
