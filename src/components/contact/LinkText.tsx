
import React from "react";
import { Link } from "react-router-dom";

interface LinkTextProps {
  text: string;
}

export const LinkText = ({ text }: LinkTextProps) => {
  // Use regex to find and replace anchor tags with Link components
  const renderLinkedText = () => {
    const linkPattern = /<a\s+href=['"]([^'"]+)['"]\s+(?:target=['"][^'"]*['"])?\s*class=['"]([^'"]+)['"]\s*>([^<]+)<\/a>/;
    const match = text.match(linkPattern);
    
    if (match) {
      const [fullMatch, href, className, linkText] = match;
      const beforeLink = text.substring(0, text.indexOf(fullMatch));
      const afterLink = text.substring(text.indexOf(fullMatch) + fullMatch.length);
      
      return (
        <>
          {beforeLink}
          <Link to={href} className={className}>
            {linkText}
          </Link>
          {afterLink}
        </>
      );
    }
    
    return text;
  };

  return <>{renderLinkedText()}</>;
};
