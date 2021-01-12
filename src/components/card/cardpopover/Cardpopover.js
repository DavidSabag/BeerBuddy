import React from "react";

const Cardpopover = ({name, tagline, description, brewers_tips}) => {
  
  
  return (
    <>
      {"\n"}<h3>{name}</h3>
      <h6><b>Tagline -</b> {tagline}</h6>
      <h6><b>Description -</b> {description}</h6>
      <h6><b>Brewers Tips -</b> {brewers_tips}</h6>
      
    </>
  );
};

export default Cardpopover;
