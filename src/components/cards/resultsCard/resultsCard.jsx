import React from "react";

const ResultsCard = ({ active, cardDescription, cardImage, cardName, onClick, resultsLength }) => {
  return (
    <div className="col-12 col-md-4 offset-md-0">
      <div
        className={
          resultsLength === 0
            ? "resultsCardContainerDisabled"
            : active
            ? "resultsCardContainerActive"
            : "resultsCardContainer"
        }
        onClick={resultsLength === 0 ? () => null : onClick}
      >
        <img src={cardImage} alt="results card" className="resultsCardImage" />
        <div className="resultsCardDescriptionContainer">
          <span className="resultsCardName">
            {cardName} ({resultsLength <= 50 ? resultsLength : "50+"})
          </span>
          <span className="resultsCardDescription">{cardDescription}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
