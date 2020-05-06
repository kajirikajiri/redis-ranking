import React from 'react'
import axios from 'axios'

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      value: ''
    };
    this.handleChangeKey = this.handleChangeKey.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeKey(event) {
    const {value} = event.target
    this.setState({key: value});
    console.log(this.state)
  }

  handleChangeValue(event) {
    const {value} = event.target
    this.setState({value});
    console.log(this.state)
  }
  
  handleSubmit(event){
    if (this.state.value === ""){
      const {key} = this.state
      this.get(key)
    }else{
      const {key,value} = this.state
      this.set(key,value)
      this.zadd()
    }
  }

  async get(key){
    const res = await axios.get('http://localhost:8080/get', {params: {key}})
    console.log(res)
  }

  async set(key,value){
    const res = await axios.post('http://localhost:8080/set', {key, value})
    console.log(res)
  }

  async zadd(){
    const res = await axios.post('http://localhost:8080/zadd')
    console.log(res)
  }

  componentWillMount(){

  }

  render (){
    return <form onSubmit={this.handleSubmit}>
      <div>
        key: <input value={this.state.key} onChange={this.handleChangeKey}></input>
      </div>
      <div>
        value: <input value={this.state.value} onChange={this.handleChangeValue}></input>
      </div>
      <div>
        <input type="submit" value={this.state.value===""?'get':'set'}></input>
      </div>
    </form>
  }
}


export default Forms
