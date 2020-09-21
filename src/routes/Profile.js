import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Nweet from "components/Nweet";

export default ({ userObj, refreshUser }) => {
  const [myNweets, setMyNweets] = useState([]);
  // const currentDisplayName = userObj.displayName ? userObj.displayName : "noname";
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(
    () => {
      const getMyNweets = async () => {
        const nweets = await dbService
          .collection("tweets")
          .orderBy("createAt")
          .where("creatorId", "==", userObj.uid)
          .get();
        const myNweetsArray = nweets.docs.map((doc) => doc.data());
        setMyNweets(myNweetsArray);
      };
      getMyNweets();
    }, // eslint-disable-next-line
    []
  );

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" style={{ marginTop: 10 }} />
      </form>
      <div>
        <div style={{ marginTop: 30 }}>My Tweets</div>
        <div className="myNweets">
          {myNweets.map((nweet) => (
            <Nweet
              key={nweet.createAt}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
