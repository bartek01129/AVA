import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EditPage.css';

function EditPage() {
  const location = useLocation();
  const { state } = location;
  const [username, setUsername] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState('');
  const [goal, setGoal] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/accounts/acc/${state.username}`
        );
        setUsername(response.data.username);
        setWeight(response.data.weight);
        setHeight(response.data.height);
        setSex(response.data.sex);
        setGoal(response.data.goal);
        setPassword(response.data.password);
      } catch (error) {
        console.error('Error fetching password', error);
      }
    };

    fetchData();
  }, [state.username]);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeHeight = (e) => {
    setHeight(e.target.value);
  };

  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleChangeGoal = (e) => {
    setGoal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      password: password,
      height: height,
      weight: weight,
      goal: goal,
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/accounts/${username}`,
        [formData]
      );
      if (response.data === 'udało się') {
        navigate('/login');
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Błąd', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="editpage">
        <div className="editpage-container">
          <h1>Edit AVA</h1>
          <div className="edit-box">
            <div className="edit-username">Username</div>
            <div className="edit-result">{username}</div>
          </div>
          <div className="edit-box">
            <div className="edit-sex">Płeć</div>
            <div className="edit-result">{sex}</div>
          </div>
          <div className="edit-box">
            <div className="edit-name">Password</div>
            <input
              className="edit-input"
              value={password}
              onChange={handleChangePassword}
            ></input>
          </div>
          <div className="edit-box">
            <div className="edit-name">Wzrost</div>
            <input
              className="edit-input"
              value={height}
              onChange={handleChangeHeight}
            ></input>
          </div>
          <div className="edit-box">
            <div className="edit-name">Waga</div>
            <input
              className="edit-input"
              value={weight}
              onChange={handleChangeWeight}
            ></input>
          </div>
          <div className="edit-box">
            <div className="edit-name">Cel</div>
            <input
              className="edit-input"
              value={goal}
              onChange={handleChangeGoal}
            ></input>
          </div>
          <button className="button-edit">Zapisz</button>
        </div>
      </div>
    </form>
  );
}

export default EditPage;
