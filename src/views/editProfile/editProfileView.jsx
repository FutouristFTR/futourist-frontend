import React from "react";
import Button from "components/button";
import UserCard from "components/cards/userCard";
import LoadingSpinner from "components/loadingSpinner/loadingSpinner";
import user from "constants/user";

const EditProfileView = props => (
  <React.Fragment>
    {props.loading ? (
      <LoadingSpinner />
    ) : (
      <section className="editProfileSection">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
              <UserCard
                myProfile
                profilePhoto={props.profilePhoto}
                user={props.auth.isLoggedIn && props.user}
                userId={props.auth.isLoggedIn && props.auth.userUid}
              />
            </div>

            <div className="col-12 col-md-7">
              <section className="informationSection">
                <div className="informationTitle">Your information</div>
                <div className="informationContent">
                  {/* <div className="informationLabel">Name</div>
              <input
                className="customInput"
                type="text"
                placeholder="Enter your full name"
                id="editProfileNameInput"
                name="fullName"
                onChange={props.handleChangeInput}
              /> */}
                  <div className="informationLabel">Username</div>
                  <input
                    className="customInput"
                    type="text"
                    placeholder="Enter your username"
                    id="editProfileUsernameInput"
                    name="username"
                    onChange={props.handleChangeInput}
                    value={props.auth.isLoggedIn && props.username}
                    maxLength={user.USERNAME_MAX_LENGTH}
                  />
                  <div className="errorContainer">
                    {props.errors.usernameWrongLength ? (
                      <span className="errorMessage">
                        Username must be between 6 and 25 characters long.
                      </span>
                    ) : props.errors.usernameWrongCharacters ? (
                      <span className="errorMessage">
                        Username can consist only of lower case letters, numbers and underscores.
                      </span>
                    ) : props.errors.usernameNull ? (
                      <span className="errorMessage">Username can not be empty.</span>
                    ) : props.error !== "" ? (
                      <span className="errorMessage">{props.error}</span>
                    ) : null}
                  </div>
                  <div className="informationLabel">Bio</div>
                  <textarea
                    className="customInput descriptionInput"
                    placeholder="Describe yourself"
                    id="editProfileBioInput"
                    onChange={props.handleChangeInput}
                    name="bio"
                    value={props.auth.isLoggedIn && props.bio}
                    maxLength={user.BIO_LENGTH}
                  />
                  <div className="errorContainer">
                    {props.errors.bioTooLong ? (
                      <span className="errorMessage">Bio can be up to 140 characters long.</span>
                    ) : null}
                  </div>
                  <div className="informationLabel">E-mail</div>
                  <div className="editProfileEmail">
                    {(props.auth.isLoggedIn && props.auth.userEmail) || "john.doe@gmail.com"}
                  </div>
                </div>
              </section>
              {/* <section className="informationSection">
            <div className="informationTitle">Private information</div>
            <form className="informationContent">
              <div className="informationLabel">Gender</div>
              <select
                className="customInput customSelect"
                id="editProfileGenderSelect"
                onChange={props.handleChangeInput}
                name="gender"
                value={props.gender}
              >
                <option value="" disabled hidden>
                  Select your gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <div className="informationLabel">Country</div>
              <select
                className="customInput"
                id="editProfileCountrySelect"
                onChange={props.handleChangeInput}
                name="country"
                value={props.country}
              >
                <option value="" disabled hidden>
                  Select your country
                </option>
                <option value="SLO">Slovenia</option>
              </select>
            </form>
          </section> */}
              <div className="saveButtonContainer">
                <Button className="submitButton" onClick={props.saveChanges}>
                  {props.saving ? <i className="fas fa-spinner fa-spin" /> : "Save changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}
  </React.Fragment>
);

export default EditProfileView;
