import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const {request} = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if(event.key === 'Enter'){
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`)
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="enter link"
            id="link"
            type="email"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">enter link</label>
        </div>
      </div>
    </div>
  );
};