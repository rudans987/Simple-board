import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (initialUrl) => {
  const [url, setUrl] = useState(initialUrl);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(url).then(({ data }) => setValue(data));
  };

  return [value];
};

export default useFetch;
