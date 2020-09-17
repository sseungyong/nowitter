import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeletClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${nweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newNweet}
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancle</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{newNweet.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeletClick}>Delete tweet</button>
              <button onClick={toggleEditing}>Edit tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
