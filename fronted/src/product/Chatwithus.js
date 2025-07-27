import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import './Chatwithus.css';

const Chatwithus = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    goal_weight: '',
    time: '',
    veg_nonveg: ''
  });
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
        method: 'GET',
        mode: 'cors',
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/diet-plan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setDietPlan(data);
      } else {
        console.error("Failed to fetch diet plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const closeDietPlan = () => {
    setShowForm(false)
    setDietPlan(null);
  };

  const [showCalForm, setShowCalForm] = useState(false);
  const [mealFormData, setMealFormData] = useState({
    protein: '',
    carbs: '',
    fat: '',
    suger: '',
    fiber: '',
    calory: ''
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [loadingMeal, setLoadingMeal] = useState(false);

  const handleMealInputChange = (e) => {
    const { name, value } = e.target;
    setMealFormData({
      ...mealFormData,
      [name]: value
    });
  };

  const handleMealFormSubmit = async (e) => {
    e.preventDefault();
    setLoadingMeal(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/get-meal-by-cal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(mealFormData),
      });

      if (response.ok) {
        const data = await response.json();
        setMealPlan(data);
      } else {
        console.error("Failed to fetch meal plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoadingMeal(false);
  };

  const closeMealPlan = () => {
    setShowCalForm(false);
    setMealPlan(null);
  };

  const [showForm23, setShowForm23] = useState(false);
  const [mealFormData23, setMealFormData23] = useState({
    ingredient1: '',
    ingredient2: '',
    ingredient3: '',
  });
  const [mealPlan23, setMealPlan23] = useState(null);
  const [loading23, setLoading23] = useState(false);

  const handleInputChange23 = (e) => {
    const { name, value } = e.target;
    setMealFormData23({
      ...mealFormData23,
      [name]: value
    });
  };

  const handleFormSubmit23 = async (e) => {
    e.preventDefault();
    setLoading23(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/get-meal-by-ingredient/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(mealFormData23),
      });

      if (response.ok) {
        const data = await response.json();
        setMealPlan23(data);
      } else {
        console.error("Failed to fetch meal plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading23(false);
  };

  const closeMealPlan23 = () => {
    setShowForm23(false);
    setMealPlan23(null);
  };


  return (
    <>
      <Nav />
      <div className="centered-container" style={{ marginTop: '200px' }}>
        <button onClick={() => setShowForm(true)}>Get Diet Plan</button>

        {showForm && (
          <form className="diet-form" onSubmit={handleFormSubmit}>
            <label>Height(cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              min="0"
              required
            />

            <label>Weight(kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              min="0"
              required
            />

            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="0"
              required
            />

            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label>Veg or Nonveg:</label>
            <select
              name="veg_nonveg"
              value={formData.veg_nonveg}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Veg">Veg</option>
              <option value="Nonveg">Nonveg</option>
            </select>

            <label>Goal Weight(kg):</label>
            <input
              type="number"
              name="goal_weight"
              value={formData.goal_weight}
              onChange={handleInputChange}
              min="0"
              required
            />

            <label>Time (in weeks):</label>
            <input
              type="number"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              min="0"
              required
            />

            <input type="submit" value={loading ? "Loading..." : "Submit"} />
          </form>
        )}

        {dietPlan && (
          <div className="diet-plan">
            <h3>Your Weekly Diet Plan</h3>
            <table style={{ marginTop: '50px' }}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dietPlan).map((day, index) => (
                  <tr key={index}>
                    <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                    <td>{dietPlan[day][0].breakfast}</td>
                    <td>{dietPlan[day][0].lunch}</td>
                    <td>{dietPlan[day][0].dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={closeDietPlan}>Close</button>
          </div>
        )}
      </div>

      <div className="centered-container" style={{ marginTop: '50px' }}>
        <button onClick={() => setShowCalForm(true)}>Get Meal by Calory</button>

        {showCalForm && (
          <form className="diet-form" onSubmit={handleMealFormSubmit}>
            <label>Protein (in gram):</label>
            <input
              type="number"
              name="protein"
              value={mealFormData.protein}
              onChange={handleMealInputChange}
              min="0"
              required
            />

            <label>Carbs (in gram):</label>
            <input
              type="number"
              name="carbs"
              value={mealFormData.carbs}
              onChange={handleMealInputChange}
              min="0"
              required
            />

            <label>Fat (in gram):</label>
            <input
              type="number"
              name="fat"
              value={mealFormData.fat}
              onChange={handleMealInputChange}
              min="0"
              required
            />

            <label>Suger (in gram):</label>
            <input
              type="number"
              name="suger"
              value={mealFormData.suger}
              onChange={handleMealInputChange}
              min="0"
              required
            />

            <label>Fiber (in gram):</label>
            <input
              type="number"
              name="fiber"
              value={mealFormData.fiber}
              onChange={handleMealInputChange}
              min="0"
              required
            />

            <label>Calory (in gram):</label>
            <input
              type="number"
              name="calory"
              value={mealFormData.calory}
              onChange={handleMealInputChange}
              min="0"
              required
            />

            <input type="submit" value={loadingMeal ? "Loading..." : "Submit"} />
          </form>
        )}

        {mealPlan && (
          <div className="diet-plan">
            <h3>Your Suggested Meal Plan</h3>
            <table style={{ marginTop: '50px' }}>
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Breakfast</td>
                  <td>{mealPlan.breakfast_meal}</td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>{mealPlan.lunch_meal}</td>
                </tr>
                <tr>
                  <td>Dinner</td>
                  <td>{mealPlan.dinner_meal}</td>
                </tr>
              </tbody>
            </table>
            <button className="close-btn" onClick={closeMealPlan}>Close</button>
          </div>
        )}
      </div>

      <div className="centered-container">
        <button onClick={() => setShowForm23(true)}>Get Meal by Ingredient</button>

        {showForm23 && (
          <form className="meal-form" onSubmit={handleFormSubmit23}>
            <label>Ingredient 1:</label>
            <input
              type="text"
              name="ingredient1"
              value={mealFormData23.ingredient1}
              onChange={handleInputChange23}
              required
            />

            <label>Ingredient 2:</label>
            <input
              type="text"
              name="ingredient2"
              value={mealFormData23.ingredient2}
              onChange={handleInputChange23}
              required
            />

            <label>Ingredient 3:</label>
            <input
              type="text"
              name="ingredient3"
              value={mealFormData23.ingredient3}
              onChange={handleInputChange23}
              required
            />

            <input type="submit" value={loading23 ? "Loading..." : "Submit"} />
          </form>
        )}

        {mealPlan23 && (
          <div className="meal-plan">
            <h3>Your Meal Plan</h3>
            <table>
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mealPlan23.meal}</td>
                  <td>{mealPlan23.meal_instructions}</td>
                </tr>
              </tbody>
            </table>
            <button className="close-btn" onClick={closeMealPlan23}>Close</button>
          </div>
        )}
      </div>

      <footer className="footer" style={{ marginTop: '200px' }}>
        <div className="footer-container">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>
              Heaven diet doesn't over lesser days appear creeping seasons so behold bearing days open.
            </p>
            <div className="logo">
              <h2>Diet Fit</h2>
              <p>HOME SOLUTION</p>
            </div>
          </div>

          <div className="footer-column">
            <h3>Contact Info</h3>
            <p>Savvy Starata,Ahmedabad,Gujarat</p>
            <p>Phone: +8880 44338899</p>
            <p>Email: dietfit@gmail.com</p>
          </div>

          <div className="footer-column">
            <h3>Important Link</h3>
            <ul>
              <li><a href="#whmcs">Sign in</a></li>
              <li><a href="#domain">Search Domain</a></li>
              <li><a href="#account">My Account</a></li>
              <li><a href="#cart">View Cart</a></li>
              <li><a href="#shop">Our Shop</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>
              Heaven diet doesn't over lesser in days. Appear creeping seasons deve behold bearing days open.
            </p>
            <form>
              <input type="email" placeholder="Email Address" />
              <button type="submit" style={{ width: '100px' }}>Send</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright ©2022 All rights reserved </p>
          <div className="social-icons">
            <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#twitter"><i className="fab fa-twitter"></i></a>
            <a href="#globe"><i className="fas fa-globe"></i></a>
            <a href="#behance"><i className="fab fa-behance"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Chatwithus;
