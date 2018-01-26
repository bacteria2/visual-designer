import React from 'react';
import { Steps, Modal, Select,Input ,Button,Divider,message} from 'antd';
import isArray from 'lodash/isArray'
import cloneDeep from 'lodash/cloneDeep'

const Step = Steps.Step;

export default  class AddAndUpdateCube extends React.PureComponent{

    constructor(props) {
        super(props);

        this.state = {
            current:0,
            category:props.isAddOperate?props.categoryList[0]._id:props.updateCube.categoryId,
            conn:props.isAddOperate?props.connList[0]._id:props.updateCube.connId,
            name:props.isAddOperate?'':props.updateCube.name
        };

        this.steps = ['分类','命名','数据源'];
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    onCategorySelect(e){
        this.setState({ category:e });
    }

    onConnSelect(e){
        this.setState({ conn:e });
    }

    onNameChange(e){
        this.setState({ name:e.target.value });
    }

    componentWillReceiveProps(nextProps){
        if(isArray(nextProps.categoryList) && nextProps.categoryList.length > 0){
            this.setState({
                category:nextProps.categoryList[0]._id,
                conn:nextProps.connList[0]._id,
                current:nextProps.current
            });
        }
    }

    onSubmit(){
        if(!this.state.name){
            message.warn("名称不能为空");
            this.setState({current:0})
        }else if(!this.state.category){
            message.warn("分类不能为空");
            this.setState({current:1})
        }else if(!this.state.conn){
            message.warn("数据库不能为空");
            this.setState({current:2})
        }else{
            if(this.props.isAddOperate){
                this.props.onAddSubmit(this.state.name,this.state.category,this.state.conn);
            }else{
                let cube = cloneDeep(this.props.updateCube);

                cube.name = this.state.name;

                //分类有修改
                if(this.state.category !== cube.categoryId){
                    cube.categoryId = this.state.category;
                    cube.category = this.props.categoryList.filter(e => e._id===this.state.category)[0];
                }

                //数据连接有修改
                if(this.state.conn !== cube.connId){
                    cube.connId = this.state.conn;
                    cube.conn = this.props.connList.filter(e=>e._id===this.state.conn)[0];
                }

                this.props.onUpdateSubmit(cube);
            }

            this.props.hide()
        }

    }


    render(){
        return ( <Modal
            title="选择分类/数据连接"
            visible={this.props.show}
            onCancel = {()=>this.props.hide()}
            footer={null}>
            <Steps current={this.state.current}>
                {this.steps.map(item => <Step key={item} title={item} />)}
            </Steps>
            <div style={{ height: '80px',padding:'20px 0 0 0' }}>
                {
                    this.state.current === 0
                    &&
                    <Select key="category"
                            value={this.state.category||this.props.categoryList[0]._id}
                            onSelect = {this.onCategorySelect.bind(this)}
                            style={{ width: 220, display: "block", margin: "0 auto" }}>
                        {this.props.categoryList.map(e => (<Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>))}
                    </Select>
                }
                {
                    this.state.current === 1
                    &&
                    <Input key="inputName"
                           value={this.state.name}
                           onChange = {this.onNameChange.bind(this)}
                           style={{ width: 220, display: "block", margin: "0 auto" }}>
                    </Input>
                }
                {
                    this.state.current === 2
                    &&
                    <Select key = "conn"
                            value = {this.state.conn||this.props.connList[0]._id}
                            onSelect = {this.onConnSelect.bind(this)}
                            style = {{ width: 220, display: "block", margin: "0 auto" }}>
                        {this.props.connList.map(e => (<Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>))}
                    </Select>

                }
            </div>
            <Divider style={{margin:'10px 0'}}/>
            <div className="steps-action" style={{textAlign:'right'}}>
                {
                    this.state.current > 0
                    &&
                    <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                        上一步
                    </Button>
                }
                {
                    this.state.current < this.steps.length - 1
                    &&
                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                }
                {
                    this.state.current === this.steps.length - 1
                    &&
                    <Button type="primary" onClick={ this.onSubmit.bind(this) }>确定</Button>
                }

            </div>
        </Modal>)
    }

}
