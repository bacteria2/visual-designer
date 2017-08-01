

export default{
  functional: true,
  name: 'PropertyGroup',
  render(h, {props,data,children}){
    console.log(children)
    return (
    <div>
      {children}
    </div>)
  }
}
