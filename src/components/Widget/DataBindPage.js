import React from 'react'
import DropBox from  './DropBox'

function DataBindPage(props) {
    let {dataBindItems,...rest} = props;
    let dropBoxs = dataBindItems.map(item => {
        const Comp=item.isMeasure?DropBox.Measure:DropBox.Dimension;
        return <Comp  {...item}  key = {item.uniqueId}  {...rest}/>
    })
    return (<React.Fragment>{dropBoxs}</React.Fragment>)
}

export default DataBindPage;


