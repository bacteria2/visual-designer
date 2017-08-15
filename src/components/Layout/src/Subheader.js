export default{
  functional: true,
  name: 'Subheader',
  render(h,{props}){
    return (<div class="subheader">
      <mu-sub-header>{props.text?props.text:'子标题'}</mu-sub-header>
    </div>)
  }
}

