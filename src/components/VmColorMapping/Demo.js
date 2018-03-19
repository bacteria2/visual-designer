import React from 'react';
import VmColorMapping from './index'

export default class VMDemo extends React.PureComponent{

    state = {
        vm:{
            type:'piecewise',
            ffggbbh:99999,
            min:0,
            max:100,
            splitNumber:5,
            inRange:{
                color:['#4575b4', '#abd9e9', '#ffffbf', '#fdae61',  '#a50026'],
                colorHue:[0,200],
                colorSaturation:[0,0.5],
                colorLightness:[0,0.5],
                opacity:[0,0.5],
            }},
    }

    render(){
        return (<div style={{width:400}}>
            <VmColorMapping data={[10,20,50]} onChange={(v)=>{console.log(v)}} vm={this.state.vm} graphic/>
        </div>)
    }

}