import React from 'react'
import MembersSort from './index'

// 动态序列数据格式：

const data = [{
        "name": "本月",
        "value": [2017, 12],
    },
        {
            "name": "上年同期",
            "value": [2016, 12],
        },
    {
        "value": [2016, 15],
    },
    {
        "value":['$ALL'],
    },
];

export default function MembersSortDemo(){
    return (<MembersSort visible={true} sort={null} data = {data} onSubmit={e=>console.log(e)}/>)
}