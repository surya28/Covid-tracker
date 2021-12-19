import { useEffect, useState } from "react";

const useApi = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchApi = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setData(json);
      })
      .catch((err) => {
        setError(true);
      });
  };

  useEffect(() => {
    fetchApi();
    //eslint-disable-next-line
  }, []);

  return { loading, data, error };
};

export default useApi;
