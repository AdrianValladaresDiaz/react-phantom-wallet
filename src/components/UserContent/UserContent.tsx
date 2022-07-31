import React, { ReactElement, useContext, useEffect, useState } from "react";
import { GifArray } from "../../interfaces/gif";
import { context as userContext } from "../../state/userState/userContext";
// eslint-disable-next-line no-unused-vars
import { getGifs, sendGif } from "../../utils/solanaUtils";
import GifGrid from "../GifGrid/GifGrid";

const initialFormState = {
  "gif-input": "",
};

const UserContent = (): ReactElement => {
  // eslint-disable-next-line no-unused-vars
  const { state: userState, dispatch: userDispatch } = useContext(userContext);
  const [formState, setFormState] = useState(initialFormState);
  const [gifList, setGifList] = useState<GifArray>([]);

  useEffect(() => {
    (async () => {
      try {
        if (userState.loggedIn) {
          const gifs = await getGifs();
          setGifList(gifs);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userState.loggedIn]);

  const submitForm = async () => {
    await sendGif(formState["gif-input"]);
    const gifs = await getGifs();
    setGifList(gifs);
  };

  const handleChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    setFormState({ ...formState, [target.id]: target.value });
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="gif-input">
          Input a new gif!
          <input
            type="text"
            id="gif-input"
            name="gif-input"
            onChange={handleChange}
          />
        </label>
        <input type="submit" onClick={submitForm} />
      </form>
      <GifGrid gifArr={gifList} />
    </>
  );
};

export default UserContent;
