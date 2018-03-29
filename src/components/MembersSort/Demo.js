import React from 'react'
import MembersSort from './index'

export default function MembersSortDemo(){
    return (<MembersSort visible={true} sort={null} data = {null} onSubmit={e=>console.log(e)}/>)
}