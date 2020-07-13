import React, {useState, useContext, useCallback, useEffect} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const {request, loading} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchedLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setLinks(fetched);
    } catch (e) {
      console.log(e);
    }
  }, [token, request]);

  useEffect(() => {
    fetchedLinks();
  }, [fetchedLinks]);

  if(loading){
    return (
      <Loader />
    );
  }

  return (
    <>
      {!loading && (
        <LinksList links={links} />
      )}
    </>
  );
};