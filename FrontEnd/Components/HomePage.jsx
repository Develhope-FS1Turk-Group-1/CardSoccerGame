import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function HomePage() {
  const [hello, setHello] = useState();
  const [taha, setTaha] = useState();
  //Create own state
  const [alp,setAlp] = useState();
  const [omercan,setOmercan] = useState();
  const [okkes,setOkkes]=useState();
  //http://localhost:3050/sayHello
  //useEffect get request
  //keep result ad state
  //print result to screen

  const [formData, setFormData] = useState({
    model: '',
    year: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    axios
      .post("http://localhost:3050/cars",formData)//BaseURL +Endpoint = API
      .then((response) => {
        console.log("Data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setFormData({
        model: '',
        year: '',
        price: ''
      });

  };

  

  useEffect(() => {
    // Make a GET request
    axios
      .get("http://localhost:3050/sayHello")//BaseURL +Endpoint = API
      .then((response) => {
        console.log("Data:", response.data);
        setHello(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    
    

    //Taha => http://localhost:3050/taha
    // Make a GET request
    axios
        .get("http://localhost:3050/taha")//BaseURL +Endpoint = API
        .then((response) => {
        console.log("Data:", response.data);
        setTaha(response.data.result);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
        
    //Alp => http://localhost:3050/alp
    axios
    .get("http://localhost:3050/alp")
    .then((response) => {
      console.log("Data:", response.data);
      setAlp(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    //Omer=> http://localhost:3050/omer
    // Make a GET request
    axios
        .get("http://localhost:3050/omercan")//BaseURL +Endpoint = API
        .then((response) => {
        console.log("Data:", response.data);
        setOmercan(response.data.result);
        })
        .catch((error) => {
        console.error("Error:", error);
        });

    //Okkes=> http://localhost:3050/okkes
    axios.get("http://localhost:3050/okkes")
    .then((response) => {
      console.log("Data:", response.data);
      setOkkes(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  }, []);

  return (
    <div>
      <b
        style={{
          backgroundColor: "tomato",
          borderRadius: "10px",
          fontSize: "30px",
          fontFamily: "Arial",
        }}
      >
        <br/>
        {omercan}
        <br/>

        {okkes}
        <br/>

        {alp}
        <br/>

        {taha}
      </b>





      <form onSubmit={handleSubmit} action="/cars" method="POST">
      <div>
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Car</button>
      <button onClick={(e)=>{
        e.preventDefault();
        axios
            .get("http://localhost:3050/cars")//BaseURL +Endpoint = API
            .then((response) => {
            console.log("Data:", response.data);
            })
            .catch((error) => {
            console.error("Error:", error);
            });

      }}>Display all Cars</button>
    </form> 

      
    </div>
  );
}

export default HomePage;
