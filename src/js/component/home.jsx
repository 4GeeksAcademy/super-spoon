import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	//const [inputValue, setInputValue] = useState("");
	const [userName, setUserName] = useState([]);

	const handlechange = (e) =>{
		setUserName(e.target.value)
	}

console.log("user", userName);

	const PostData =() => {
		fetch('https://playground.4geeks.com/todo/users/CarolinaTodo', {method:POST})
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(error => console.error(error()))
	}
	return (
		<div className="Container">
			<h1>My Neobrustalistic Todo List</h1>
					<input type="text" onChange={handlechange}/>
					<button onClick={() =>PostData()}>Post</button>
		</div>
	);
};

export default Home;
