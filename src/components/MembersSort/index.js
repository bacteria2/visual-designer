import React from 'react';
import { Modal,Divider,Radio} from 'antd';
import styles from './membersSort.css'
import DnDRow from './DnDRow'
const {Group:RadioGroup} = Radio;
const {Button:RadioButton } = Radio;

const BASIS_SOURCE = 'source';  //数据源排序
const BASIS_WORD = 'word'; //首字符排序
const BASIS_CUSTOM = 'custom'; //自定义排序

export default class MembersSort extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            order:'desc',
            basis:BASIS_SOURCE,  //排序依据：
        };
    }

    submitData = () => {

    };

    handleOrderChange = (event)=>{
        const order = event.target.value;
        this.setState({order});
    };

    handleBasisChange = (event) => {
        const basis = event.target.value ;
        this.setState({basis});
    };

    render(){

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (<Modal title = {'排序'}
                       width = {500}
                       visible = {this.props.visible}
                       bodyStyle = {{padding:'10px 0 0 0',height:'500px',backgroundColor:'#fafafa'}}
                       onOk = {this.submitData}
                       onCancel = {this.props.onCancel}
                       okText = "保存"
                       maskClosable = {false}
                       cancelText = "取消">
            <div className={styles.contentWrap}>
                <h1 className={styles.modalTitle}>排序规则</h1>
                <div className={styles.sortRule}>
                    <RadioGroup disabled={this.state.basis === BASIS_CUSTOM} size="small" onChange={this.handleOrderChange} value={this.state.order}>
                        <RadioButton   value='asc'>升序</RadioButton >
                        <RadioButton   value='desc'>降序</RadioButton >
                    </RadioGroup>
                </div>
                <Divider style={{margin:0}}/>
                <h1 className={styles.modalTitle}>排序依据</h1>
                <div className={styles.sortBasis}>
                    <RadioGroup style={{height:'100px'}} onChange={this.handleBasisChange} value={this.state.basis}>
                        <Radio style={radioStyle} value={BASIS_SOURCE}>数据源顺序</Radio>
                        <Radio style={radioStyle} value={BASIS_WORD}>首字符</Radio>
                        <Radio style={radioStyle} value={BASIS_CUSTOM}>自定义排序</Radio>
                    </RadioGroup>
                    <div className={this.state.basis === BASIS_CUSTOM ?styles.customSort:styles.customSort_disabled}>
                        <p>自定义数据排序</p>
                    </div>
                </div>
            </div>
        </Modal>)
    }
}