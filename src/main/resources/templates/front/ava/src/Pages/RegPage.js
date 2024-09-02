import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';

function RegPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  let obj = new Date();
  let betterDate = `${obj.getUTCFullYear()}/${obj.getUTCMonth()+1}/${obj.getUTCDate()} ${obj.getHours()}:${obj.getMinutes()}`
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    weight: '',
    height: '',
    sex: '',
    age: '',
    goal: '',
    lastDate: betterDate,
  });


  const [usernameList,setUsernameList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/accounts/getUsernames`
        );
        const usernames = response.data.map(e => e.username);
        setUsernameList(usernames);
      } catch (error) {
        console.error('Error fetching password', error);
      }
    };

    fetchData();
    
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUsername(value);

  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      alert(
        'Hasło musi zawierać przynajmniej jedną literę i jedną cyfrę'
      );
      return;
    }

    try {

      for(let i=0;i<usernameList.length;i++) {
        if(formData.username === usernameList[i]) {
          return alert('Użytkownik o takim imieniu już istnieje')
        }
      }

      const response = await axios.post('http://localhost:8080/accounts/', [
        formData,
      ]);
      if (response.data === 1) {
        navigate('/login');
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
    }
  };

  return (
    
    <form className="registration-form" onSubmit={handleSubmit}>
      <div class="container">
        <h1>Rejestracja AVA</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          class="input-field"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          class="input-field"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          required
          class="input-field"
          value={formData.weight}
          onChange={handleChange}
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          required
          class="input-field"
          value={formData.height}
          onChange={handleChange}
        />
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Wybierz</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          class="input-field"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="goal"
          placeholder="Target Weight"
          required
          class="input-field"
          value={formData.goal}
          onChange={handleChange}
        />
        <button type="submit" class="submit-button">
          Register
        </button>
      </div>
    </form>
  );
}

export default RegPage;
