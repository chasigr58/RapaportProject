
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux/action';
import axios from "axios";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import NumberFormat from 'react-number-format';
// import InputFormat from 'react-input-format';



// function mapDispatchToProps = (dispatch)=>{
// return{setArray:(diamonds)=>{dispatch(actions.setArray())}}

// }
const mapStateToProps = (state) => ({
  diamonds: state.diamondsReducer.diamonds
}
)

const mapDispatchToProps = (dispatch) => ({
  setArray: (diamonds) => dispatch(actions.setArray(diamonds))
}
)


// eslint-disable-next-line no-undef
export default connect(mapStateToProps)(function ShowAllDiamonds(props) {

  const [diamonds, setdiamonds] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    getdiamonds()
  }, [])

  useEffect(() => {
    calculateStats()
  }, [props, diamonds])
  debugger;
  function getdiamonds() {
    axios.get(`http://localhost:59030/Diamond`).then(res => {
      setdiamonds(res.data);

      // calculateStats();
      console.log(res.data)
    }).catch(err => {
      alert("failed to load diamonds")
    })
  }
  function AddDiamond(addDiamond) {
    axios.post(`http://localhost:59030/Diamond`, addDiamond).then(res => {
      // calculateStats();
      console.log(res.data)
    }).catch(err => {
      alert("failed to add diamond", err)
    })
  }
  function calculateStats() {
    debugger;
    if (diamonds.length == 0)
      return;
    const stats = {
      total: diamonds.length,
      avgPrice: diamonds.map(a => a.price).reduce((a, b) => a + b) / diamonds.length,
      avgDiscount: diamonds.map(a => 1 - ((a.price / a.listPrice) < 1 ? a.price / a.listPrice : 1).toFixed(2)).reduce((a, b) => a + b) / diamonds.length * 100
    };

    setStats(stats);
    console.log(stats);

  }


  const { control, handleSubmit, register } = useForm();



  function onSubmit(data) {
    console.log(data);

    var diamond = { ...data, shape: data.shape.value, color: data.color.value, clarity: data.clarity.value }
    console.log(diamond);
    AddDiamond(diamond);
  }

  return (

    <>

      <br></br>
      <div style={{ textAlign: 'center', borderStyle: "groove", bordedColor: "red" }}>
        <label style={{ textAlign: 'center', color: "red" }}> Statistics:</label>
        <br></br>
        <label>Total:</label>
        <NumberFormat
          value={stats.total}
          displayType="text"
          thousandSeparator={true}
        // prefix="$"
        />
        <br></br>
        <label fontSize="s">Average Price:</label>
        <NumberFormat
          value={stats.avgPrice}
          displayType="text"
          thousandSeparator={true}
        // prefix="$"
        />
        <br></br>
        <label>Average Discount:</label>
        <NumberFormat
          value={stats.avgDiscount}
          displayType="text"
          thousandSeparator={true}
          prefix="%"

        />
        <br></br>
      </div>
      <Container style={{}} className="Container">

        <div className="justify-content-md-center ">
          <h1 style={{ textAlign: 'center', fontSize: "15px", color: "" }}>View Diamonds</h1>

          <Table style={{ width: "100%", borderStyle: "ridge", bordedColor: "red" }} striped bordered hover >


            <thead>
              <tr>

                <td >shape</td>
                <td>size</td>
                <td>color</td>
                <td>clarity</td>
                <td>price</td>
                <td>listprice</td>

              </tr>
            </thead>

            <tbody>
              {

                diamonds.map((diamond, i) => (

                  <tr key={i} style={{ backgroundtdor: i % 2 ? "" : "white" }}>

                    <td>{diamond.shape}</td>
                    <td>{diamond.size}</td>
                    <td>{diamond.color}</td>
                    <td>{diamond.clarity}</td>
                    <td>
                      {new Intl.NumberFormat("en-GB", {

                        currency: "GBP",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(diamond.price)}</td>
                    <td>{new Intl.NumberFormat("en-GB", {

                      currency: "GBP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(diamond.price)}</td>

                  </tr>
                ))}
            </tbody>

          </Table>

        </div>

        <section>
          <br></br>

          <form onSubmit={handleSubmit(onSubmit)} required={true} style={{ borderStyle: "ridge", bordedColor: "red", fontSize: "S" }}>
            <h2 style={{ fontSize: "15px", color: "red", textAlign: 'center' }}>Add New Diamond</h2>

            <label style={{ fontSize: "10px", fontFamily: "fantasy" }}> Select A Shape:</label>
            <Controller
              name="shape"
              required={true}
              control={control}
              render={({ field }) => <Select
                {...field}
                options={[
                  { value: "Round", label: "Round" },
                  { value: "Pear", label: "Pear" },
                  { value: "Heart", label: "Heart" },
                  { value: "Oval", label: "Oval" },
                  { value: "Triangle", label: "Triangle" },
                  { value: "Asscher", label: "Asscher" },
                  { value: "Marquise", label: "Marquise" },
                  { value: "Emerald", label: "Emerald" },

                ]}
              />}
            /><br></br>
            <input type="number" style={{ fontSize: "10px", fontFamily: "revert" }} placeholder="type a size " required={true} {...register("size", { min: 0.01, max: 99 })} /><br></br>
            <br></br>
            <label style={{ fontSize: "10px", fontFamily: "fantasy" }}> Select A Color:</label>
            <Controller

              name="color"
              required={true}
              control={control}
              render={({ field }) => <Select
                {...field}
                options={[
                  { value: "D", label: "D" },
                  { value: "E", label: "E" },
                  { value: "F", label: "F" },
                  { value: "G", label: "G" },
                  { value: "H", label: "H" },
                  { value: "I", label: "I" },
                  { value: "J", label: "J" },
                  { value: "K", label: "K" },
                  { value: "L", label: "L" },
                  { value: "M", label: "M" },
                  { value: "N", label: "N" },
                  { value: "O", label: "O" },
                  { value: "P", label: "P" },
                  { value: "Q", label: "Q" },
                  { value: "R", label: "R" },
                  { value: "S", label: "S" },
                  { value: "T", label: "T" },
                  { value: "U", label: "U" },
                  { value: "V", label: "V" },
                  { value: "W", label: "W" },
                  { value: "X", label: "X" },
                  { value: "Y", label: "Y" },
                  { value: "Z", label: "Z" },



                ]}
              />}
            />
            <label style={{ fontSize: "10px", fontFamily: "fantasy" }}> Select A Clarity:</label>

            <Controller
              name="clarity"
              required={true}
              control={control}
              render={({ field }) => <Select
                {...field}
                options={[
                  { value: "FL", label: "FL" },
                  { value: "IF", label: "IF" },
                  { value: "VVS1", label: "VVS1" },
                  { value: "VVS1", label: "VVS2" },
                  { value: "VS1", label: "VS1" },
                  { value: "VS2", label: "VS2" },
                  { value: "SI2", label: "SI2" },
                  { value: "SI1", label: "SI1" },
                  { value: "I3", label: "I1" },
                  { value: "I3", label: "I2" },
                  { value: "I3", label: "I3" }


                ]}
              />}
            />
            <input type="number" style={{ fontSize: "10px", fontFamily: "revert" }} placeholder="type a price" step="0.01" required={true} {...register("price", { min: 0.01, max: 1000000 })} /><br></br>
            <br></br>
            <input type="number" placeholder="type a list price" step="0.01" required={true} {...register("listPrice", { min: 0.01, max: 1000000 })} />

            <input type="submit" value="Add" />
          </form>

        </section>
      </Container>


    </>
  )



})


