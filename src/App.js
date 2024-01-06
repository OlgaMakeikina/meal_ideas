
import { useEffect, useState } from 'react';
import './App.css';
import MyList from './MyList';
import MyMealsAndIngridients from './MyMealsAndIngridients';
import uuid from 'react-uuid';

function App() { 


 const [mealPlans, setMealPlans] = useState(
 localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []
 );

const [selectedDay, setSelectedDay] = useState(false);

useEffect(() => {
 localStorage.setItem("mealPlans", JSON.stringify(mealPlans))
 }, [mealPlans])

  const addMeal = () => {
    const newMeal = {
      title: "Today is...",
      id: uuid(),
      mealForADay: "",
      ingredients: ""
    }
    setMealPlans([newMeal, ...mealPlans])
    console.log(newMeal);
  }

  const deleteDay = (mealId) => {
    setMealPlans(mealPlans.filter( ({id}) =>id !== mealId))
  }

  const updateDay = (myUpdatedMeal) => {
    const updatedMeals = mealPlans.map((mealPlans) => {
      if (mealPlans.id === myUpdatedMeal.id) {
        return myUpdatedMeal;
      }
      return mealPlans;
    })
    setMealPlans(updatedMeals)
  }

  const getActiveMeal = () => {
    return mealPlans.find(({id}) => id === selectedDay)
  }

  return (
    <div className="App">
<MyList 
addMeal={addMeal} 
mealPlans={mealPlans} 
deleteDay={deleteDay}
selectedDay={selectedDay}
setSelectedDay={setSelectedDay}
/>
<MyMealsAndIngridients
selectedDay={getActiveMeal()}
updateDay={updateDay}
/>
    </div>
  );
}

export default App;
