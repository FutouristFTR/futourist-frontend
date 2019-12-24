import React from "react";
import { Link } from "react-router-dom";
import CardList from "components/cardList/cardList";
import routes from "constants/routes";
import UserCard from "components/cards/userCard";
import LoadingSpinner from "components/loadingSpinner/loadingSpinner";

const UserProfileView = props => {
  return (
    <React.Fragment>
      {!props.loading ? (
        <section className="userProfileSection">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-5">
                <UserCard user={props.user} numberOfAllReviews={props.numberOfAllReviews} />
              </div>
              <div className="col-12 col-md-7">
                <div className="bioContainer">
                  <div className="bioTitleAndEditLink">
                    <p className="bioTitle">Bio</p>
                    {props.userId === props.userUid ? (
                      <Link to={routes.USER_PROFILE + `/${props.userUid}` + routes.EDIT_PROFILE}>
                        Edit my profile
                      </Link>
                    ) : null}
                  </div>
                  <p className="bioContent">{props.user && props.user.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <section className="reviewSection">
            <CardList
              listTitle={`All Reviews from ${props.user && props.user.username}`}
              buttonText={
                !props.allReviewsLoaded ? (props.loadingReviews ? null : "Load more reviews") : null
              }
              buttonAction={() => props.loadMoreReviews()}
            >
              {props.renderUserReviews()}
            </CardList>
          </section>
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </React.Fragment>
  );
};

export default UserProfileView;
