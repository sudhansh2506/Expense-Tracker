import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');


 const [searchTerm, setSearchTerm] = useState('');

  const total=expenses.reduce((sum,exp)=>sum+Number(exp.amount),0);
  // Fetch all expenses on page load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/expenses');
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
   
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/expenses/${id}`);
    fetchExpenses(); // Refresh the list after deleting
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};



const handleClearAll = async () => {
  if (!window.confirm("Are you sure you want to delete all expenses?")) return;
  try {
    await axios.delete('http://localhost:8000/api/expenses');
    fetchExpenses();
  } catch (error) {
    console.error('Error clearing all expenses:', error);
  }
};






  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form from refreshing the page
    try {
      const newExpense = {
        title,
        amount,
        category
      };

      await axios.post('http://localhost:8000/api/expenses', newExpense);

      // Clear form
      setTitle('');
      setAmount('');
      setCategory('');

      // Refresh the list
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

                         
const filteredExpenses = expenses
  .filter(exp => {
    return selectedCategory === 'All' || exp.category === selectedCategory;
  })
  .filter(exp => {
    return exp.title.toLowerCase().includes(searchTerm.toLowerCase());
  });




  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
   <h2>total:{total}</h2>


   <input
  type="text"
  placeholder="Search by title"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>





 <label>Filter by Category: </label>
<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="All">All</option>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Rent">Rent</option>
  <option value="Utilities">Utilities</option>
</select>



<button onClick={handleClearAll}>
  🧹 Clear All Expenses
</button>




      <ul>
  {filteredExpenses.map((exp) => (
    <li key={exp._id}>
      <strong>{exp.title}</strong> - ₹{exp.amount} ({exp.category})
      <button onClick={() => handleDelete(exp._id)}>❌ Delete</button>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
