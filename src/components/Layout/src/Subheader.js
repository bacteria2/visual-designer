export default{
  functional: true,
  name: 'Subheader',
  render(h,{props}){
    return (<div class="subheader">
      <v-subheader>{props.text?props.text:'子标题'}</v-subheader>
    </div>)
  }
}

