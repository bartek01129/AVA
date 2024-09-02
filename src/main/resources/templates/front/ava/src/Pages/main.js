import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';

function Main() {
  const bike = {
    name: 'rower',
    calories: 400,
    time: 1,
  };

  const swim = {
    name: 'pływanie',
    calories: 800,
    time: 2,
  };

  const gym = {
    name: 'siłownia',
    calories: 200,
    time: 4,
  };

  let sports = [swim, bike, gym];
  let randomSport = sports[Math.floor(Math.random() * sports.length)];

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('');
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [sport, setSport] = useState('');
  const [days, setDays] = useState('');
  const [lastDate, setLastDate] = useState('');

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
        setAge(response.data.age);
        setGoal(response.data.goal);
        setLastDate(response.data.lastDate);
        setSport(randomSport);
      } catch (error) {
        console.error('Error fetching password', error);
      }
    };
    

    fetchData();
    howManyCaloreis();
    howManyDays();
  }, [state.username, weight, height, sex, age, goal, lastDate]);

  const editpage = () => {
    navigate('/edit', { state: { username } });
  };

  const logOut = () => {
    navigate('/login');
  };

  const howManyDays = () => {
    const goalValue = parseInt(goal);
    const weightValue = parseInt(weight);
    let goalWeight;
    let daysToEnd;
    let burndeCalories;

    if (weightValue > goalValue) {
      goalWeight = weightValue - goalValue;
      setGoalWeight('schudnąć ' + goalWeight + ' kg');
      burndeCalories = 300 + sport.calories + 500;
      daysToEnd = (goalWeight * 7000) / burndeCalories;
      setDays(Math.round(daysToEnd));
    } else if (weightValue < goalValue) {
      goalWeight = goalValue - weightValue;
      setGoalWeight('przytyć ' + goalWeight + ' kg');
      daysToEnd = (goalWeight * 7000) / 1200;
      setDays(Math.round(daysToEnd));
    } else {
      setGoalWeight('utrzymać wagę');
    }
  };

  const howManyCaloreis = () => {
    const weightValue = parseInt(weight);
    const heightValue = parseInt(height);
    const ageValue = parseInt(age);
    const goalValue = parseInt(goal);
    const caloriesMan = parseInt(
      10 * weightValue + 6.25 * heightValue + 5 * ageValue + 5
    );
    const caloriesWoman = parseInt(
      10 * weightValue + 6.25 * heightValue + 5 * ageValue - 161
    );
    if (sex.toString() === 'man') {
      if (weightValue > goalValue) {
        setCalories(caloriesMan - 300);
        setSteps(10000);
      } else if (weightValue < goalValue) {
        setCalories(caloriesMan + 300);
        setSteps(3000);
      } else {
        setCalories(caloriesMan);
        setSteps(5000);
      }
    } else if (sex.toString() === 'woman') {
      if (weightValue > goalValue) {
        setCalories(caloriesWoman - 300);
        setSteps(10000);
      } else if (weightValue < goalValue) {
        setCalories(caloriesWoman + 1200);
        setSteps(3000);
      } else {
        setAge(caloriesWoman);
        setSteps(5000);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8080/accounts/delete/${username}`
      );
      if (response.data === 777) {
        navigate('/login');
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Błąd podczas usuwania', error);
    }
  };

  let prevDate = lastDate;

  const handleDateChange = async (e) => {
      let obj = new Date();
      let newDate = `${obj.getUTCFullYear()}/${obj.getUTCMonth()+1}/${obj.getUTCDate()} ${obj.getHours()}:${obj.getMinutes()}`

    const formData = {
      lastDate: newDate
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/accounts/updateDate/${username}`,
        [formData]
      );
      if (response.data === 'updated') {
        console.log("Last Date Changed")
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Błąd', error);
    }
  };

  handleDateChange();

  return (
    <div>
      <div class="nav-bar">
        <div class="info-box">Imię: {username}</div>
        <div class="info-box">Wzrost: {height}</div>
        <div class="info-box">Waga: {weight}</div>
        <div class="info-box">Płeć: {sex}</div>
        <div class="info-box">Wiek: {age}</div>
        <form onSubmit={editpage}>
          <button class="button_edit">Edytuj profil</button>
        </form>
        <button onClick={handleDelete} class="button_delete">
          Usuń konto
        </button>
        <button onClick={logOut} class="button_delete">
          Wyloguj
        </button>
      </div>
      <div class="contanier">
        <div class="goal-box">Twój cel to:{goalWeight}</div>
        <div class="date-box">Ostatnia wizyta to: {prevDate}</div>
      </div>
      <div class="core-container">
        <div class="tip-box">
          <div class="tip tip-exercies">Ćwiczenie</div>
          <div class="info-tip-exercies">
            <div class=" exercies-type ">Typ ćwiczenia: {sport.name}</div>
            <div class=" how-many-time">Czas wykonywania:{sport.time} h</div>
            <div class=" burned-calories">
              Ile spalisz kcal:{sport.calories}
            </div>
          </div>
        </div>
        <div class="tip-box">
          <div class="tip tip-calories">Kalorie</div>
          <div class="info-tip">
            <div class="result ">{calories}</div>
          </div>
        </div>
        <div class="tip-box">
          <div class="tip tip-steps">Kroki</div>
          <div class="info-tip">
            <div class=" result ">{steps}</div>
          </div>
        </div>
        <div class="tip-box">
          <div class="tip tip-days">Dni do końca</div>
          <div class="info-tip">
            <div class=" result ">{days}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
