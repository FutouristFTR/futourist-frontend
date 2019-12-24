import React from "react";
import firebase from "firebase";

const RecentReviews = ({ reviews, onClick }) => {
  return (
    <div className="recentReviewsContainer" onClick={onClick}>
      {reviews && reviews.length
        ? reviews.map((review, index) => {
            if (review.type === "image") {
              let imagePath = "reviews/" + review.mediaId + "/" + review.mediaId + "-rp-50x50.jpg";
              let imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
                firebase.apps[0].options.projectId
              }.appspot.com/o/${encodeURIComponent(imagePath)}?alt=media`;
              return <img className="recentReview" src={imageUrl} alt="review thumb" key={index} />;
            } else {
              return (
                <img
                  className="recentReview"
                  src={`https://image.mux.com/${review.mediaId}/thumbnail.png?width=50&height=50&fit_mode=smartcrop&time=0`}
                  alt="review thumb"
                  key={index}
                />
              );
            }
          })
        : null}
    </div>
  );
};

export default RecentReviews;
