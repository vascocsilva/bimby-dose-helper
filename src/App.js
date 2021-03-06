import React, { Component } from 'react'
import Input from './components/Input/Input'
import Result from './components/Result/Result'
import styled from 'styled-components'
import bimbyLogo from './assets/images/bimby.jpg'

class App extends Component {
  state = {
    base: 0,
    quantity: 0,
    value: 0,
    calc: '0',
  }

  updateBase = (event) => this.setState({base: event.target.value})

  updateQuantity = (event) => this.setState({quantity: event.target.value})

  round5(calc) {
    if (calc < 5 && calc > 0) {
        calc = 5
    } else if (calc % 5 !== 0) {
      const remainder = calc % 10

      calc = remainder > 5
        ? calc + (10 - remainder)
        : calc - remainder
    }

    return calc
  }

  updateValue = (event) => {
    let calc = ((Math.round((event.target.value * this.state.quantity) / this.state.base)) * 2) / 2

    calc = isNaN(calc)
      ? 0
      : this.round5(calc)

    this.setState({
      value: event.target.value,
      calc: calc
    })
  }

  render() {
    return (
      <AppWrapper>
        <div>
          <CenterImage>
            {/* <img src={bimbyLogo} alt='bimby-logo' /> */}
            <h3>Bimby 1/2 Dose</h3>
          </CenterImage>

          <ColumnsDiv>
            <Input
              label='Quantidade Base (g)'
              inputProps={{type: 'number', onBlur: this.updateBase, placeholder: 'ex: 500'}}
            />

            <Input
              label='Quantidade Pretendida (g)'
              inputProps={{type: 'number', onBlur: this.updateQuantity, placeholder: 'ex: 200'}}
            />
          </ColumnsDiv>

          <ColumnsDiv>
            <Input
              label='Valor a Calcular (g)'
              inputProps={{type: 'number', onChange: this.updateValue, placeholder: 'ex: 100'}}
            />
            <Result result={this.state.calc} />
          </ColumnsDiv>
        </div>
      </AppWrapper>
    )
  }
}

const AppWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  h3 {
    color: #248c2f;
    font-size: 35px;
  }
`

const CenterImage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const ColumnsDiv = styled.div`
  align-items: center;
  display: flex;
  padding: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 0 20px;
  }

  > * {
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;

    @media (max-width: 800px) {
      width: 100%;
      padding: 10px;
    }
  }
`

export default App
