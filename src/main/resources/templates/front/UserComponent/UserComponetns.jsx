import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await axios.get('/accounts/');
        const userById = await axios.get('/accounts/13'); // przykładowe id
        const addUsers = await axios.post('/accounts/', { users: [] }); // przykładowa lista użytkowników
        const passwords = await axios.get('/accounts/password');
        const passwordByUsername = await axios.get('/accounts/pass/klementyna'); // przykładowa nazwa użytkownika

        setData({
          allUsers: allUsers.data,
          userById: userById.data,
          addUsers: addUsers.data,
          passwords: passwords.data,
          passwordByUsername: passwordByUsername.data,
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data &&
        Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h2>{key}</h2>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        ))}
    </div>
  );
};

export default App;
