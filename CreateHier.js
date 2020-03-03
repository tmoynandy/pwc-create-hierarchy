import React, { Component } from 'react'

export default class CreateHier extends Component {

  state = {
    total: 0,
    totalInput: '',
    show: false,
  }

  add = () => {
    this.setState({
      total: this.state.totalInput
    })
  }

  showValues = () => {
    this.setState({
      show: true
    })
  }

  onChange = (event) => {
    let obj = {
      value : '',
      children : [],
      childCount : 0,
    }
    obj.value = event.target.value
    this.setState({
      [event.target.name]: obj
    })
  }

  onSelectChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  buttonClick = (event) => {
    let str = event.target.id+"-type"
    if(this.state[str] === "fixed"){
      let newTotal = parseInt(this.state.total) + 1
      this.setState({total : newTotal})
      this.generateInput("")
    }
    if(this.state[str]==="dynamic"){
      let hierObj = this.state[event.target.id]
      hierObj.childCount = hierObj.childCount + 1
      console.log("new hierobj", hierObj)
      this.setState({
        [event.target.id] : hierObj
      })
      let childrenStr = event.target.id+"-child-"+hierObj.childCount
      this.generateInput(childrenStr)
    }
    console.log("button clicked with id", event.target.id)
    console.log("hier value", this.state[event.target.id])
    console.log("hier type", this.state[str])
  }

  generateInput = (children) =>{
    const inputs = [];
    if(children === ""){
      for (let i = 1; i <= this.state.total; i++) {
        inputs.push(
          <div className = "row">
            <div className = "col">
            
            <input type="text" name={`hier-${i}`} onChange={this.onChange} />

            <button id = {`hier-${i}`} onClick = {this.buttonClick}>Add</button>

            <select id="type" name={`hier-${i}-type`} onChange = {this.onSelectChange}>
              <option value = "">Select</option>
              <option value="fixed">Fixed</option>
              <option value="dynamic">Dynamic</option>
            </select>
            
            </div>
            <br />
          </div>
        )
      }
    }
    else{
      inputs.push(
         <div className = "row">
            <div className = "col">
            
            <input type="text" name={children}  />

            <select id="type" name={`${children}-type`}>
              <option value = "">Select</option>
              <option value="fixed">Fixed</option>
              <option value="dynamic">Dynamic</option>
            </select>
            
            </div>
            <br />
          </div>
      )
    }
      
      return inputs

  }


  render() {

    const inputs1 = this.generateInput("")
    

    return (
      <React.Fragment>
        <div>
          <input onChange={(e) => this.setState({ totalInput: e.target.value })} value={this.state.totalInput} placeholder="Enter Number" />
          <button onClick={this.add}>Create</button>
          <br />
          {inputs1}
          <br />
          <button onClick={this.showValues}>Show Inputs values</button>
          {this.state.show &&
            <pre>{JSON.stringify(this.state, null, 4)}</pre>
          }
        </div>
      </React.Fragment>
    )
  }
}