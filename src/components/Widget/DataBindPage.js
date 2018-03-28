import React from 'react'
import DropBox from  './DropBox'

function DataBindPage(props) {
    let {dataBindItems,...rest} = props;
    let dropBoxs = dataBindItems.map(item => {
        const Comp=DropBox[item.olapDataType];
        return <Comp  {...item}  key = {item.uniqueId}  {...rest}/>
    })
    return (<React.Fragment>{dropBoxs}</React.Fragment>)
}

export default DataBindPage;


