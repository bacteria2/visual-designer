import React from 'react';
import {Modal,Divider,Tabs,Checkbox,Icon,message,Switch,Spin,Select,Button,Radio} from 'antd';
import isArray from 'lodash/isArray'
import findIndex from 'lodash/findIndex'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import styles from './dynamicSeries.css'
import update from 'immutability-helper'
import PivotSchema from '../../routes/DataSource/Cube/PivotSchema'
import SplitListContainer from './SplitListContainer'
import  FieldsType from '../../routes/DataSource/Cube/FieldsType'
import {queryMembers,queryExpression} from '../../service/CubeService';
import GroupDynamicEditor from './GroupDynamicEditor';
import uuid from 'uuid/v1'
import MembersSort from '../../components/MembersSort'

const TabPane = Tabs.TabPane;

const recursionTree = (data,key) => {
    if(isObject(data)){
        data.key = key + "";
        if(isArray(data.children)){
            data.children.forEach(e => {
                recursionTree(e,key + '-' + e.value);
            });
        }
    }
};

const allModel = (values) => {
    let flag = false;
    if(isArray(values) && values.length > 0){
        if(isObject(values[0])){
            if(values.some(e=>e.value.some(value=>(value === '$ALL')))) flag = true
        }
    }
    return flag
};

export default class DynamicSeriesEditorModal extends React.PureComponent {

    constructor(props){
        super(props);
        this.editDataCache = {};
        this.state = {
            loading:false,
            dimension:this.props.dimension,
            activeKey:'1',
            data:{},
            editSplit:null,
            all:false,
            listValue:[],
            ExpList:[],
            customValue:[],
            count:0,
            search:{
                listValue:'',
                customValue:'',
            },
            group:{
              dataMapping:{},
              dataList:[],
            },
            setting:{
                showSettingModal:false,
                sort:{},
                currentFieldId:'',
                splitData:[],
                groupFields:null,
            },
        }
    }

    async componentWillMount(){
        this.setState({loading:true});
        try {
            const {dimension,dsInfo} = this.props;
            //获取表达式
            const ExpList = await queryExpression();

            if(dimension && dsInfo){
                //获取数据
                const data = await DynamicSeriesEditorModal.fetchData(dimension,dsInfo);
                //设置data状态
                this.setState(update(this.state,{
                    data:{$set:data},
                    ExpList:{$set:ExpList},
                }));
            }else{
                this.setState(update(this.state,{
                    ExpList:{$set:ExpList},
                }));
            }
        }catch (e){
            console.error(e)
        }finally {
            this.setState({loading:false});
        }

    }

    async componentWillReceiveProps(nextProps){

        //获取数据
        let data = [];
        const {dimension,dsInfo} = nextProps;
        if(nextProps.visible){
            if(dimension && dsInfo) data = await DynamicSeriesEditorModal.fetchData(dimension,dsInfo);
            this.editSplitId = null;
            this.setState(update(this.state,{
                dimension:{$set:nextProps.dimension},
                data:{$set:data},
                editSplit:{$set:null},
            }));
        }
    }

    //请求获取数据
    static  async fetchData({split},dsInfo){
        //1. 获取所有拆分的维度 dimArr
        if(isArray(split) && split.length > 0) {
            const dimArr = split.map(e=>(e.groupName?e.groupName:e.alias));
            //2. 获取维度成员数据，保存到 State
            const memResp = await queryMembers(dsInfo,dimArr);
            if(memResp && memResp.ok){
                return memResp.other;
            }else{
                message.error("数据请求失败，检查数据服务器是否启动")
            }
        }else{
            return {}
        }

    }

    getFilterData(filterData,searchValue){

        if(searchValue && isArray(filterData) && filterData.length > 0){
            filterData = filterData.filter(e=>((e.value[0].value + '').indexOf(searchValue) !== -1));
        }
        return filterData;
    };

    handleClickSplitItem = (e) => {
        //获取数据
        let {data} = this.state,dataMapping = [];
        this.dataList = data?data[e.groupName?e.groupName:e.alias]:[];

        /** 拆分维度是分组的情况
         *  1. 处理数据，添加树控件所需的Key
         *  2. 搜索优化：提取树形数据，生成key:value 结构数据
         */
        if(e.groupName){
            const generateList = (data,parentKey) => {
                for (let i = 0; i < data.length; i++) {
                    let node = data[i];
                    if(!isObject(node)) node = {key:parentKey + '-' + node,value:node};
                    const {key,value,name} = node;
                    dataMapping.push({title:key,value,key,name});
                    if (node.children) {
                        generateList(node.children,node.key)
                    }
                }
            };
            if(isArray(this.dataList)){
                //递归，赋值Key
                this.dataList.forEach(e=>{
                    recursionTree(e,e.value);
                });
                // 生成dataMapping
                generateList(this.dataList,'');
            }
        }

        if(this.editSplitId){
            //缓存已经编辑的值
            const {listValue,customValue,all,activeKey} = this.state;
            if(!this.editDataCache[this.editSplitId])this.editDataCache[this.editSplitId] = {};
            this.editDataCache[this.editSplitId].all = all;
            this.editDataCache[this.editSplitId].activeKey = activeKey;
            this.editDataCache[this.editSplitId].listValue = listValue;
            this.editDataCache[this.editSplitId].customValue = customValue;
        }

        if(!this.editSplitId || this.editSplitId !== e.fieldId){
            //赋值当前ID 为编辑中
            this.editSplitId = e.fieldId;
            let listValue,customValue,all,activeKey = 'custom';
            //如果缓存中存在编辑值，则直接从缓存中取
            if(this.editDataCache[e.fieldId]){
                ({listValue,customValue,all,activeKey} = this.editDataCache[e.fieldId])
            }else{
                if(e.groupName){
                    //根据选择的拆分维度计算 编辑默认值
                    ({listValue,customValue,all} = this.analysisGroupValue(e))
                }else{
                    //根据选择的拆分维度计算 编辑默认值
                    ({listValue,customValue,all} = this.analysisValue(e))
                }
            }

            if(isArray(listValue) && listValue.length > 0) activeKey = 'list';

            this.setState(update(this.state,{
                editSplit:{$set:e},
                activeKey:{$set:activeKey},
                all:{$set:all},
                listValue:{$set:listValue},
                customValue:{$set:customValue},
                group:{
                    dataMapping:{$set:dataMapping},
                    dataList:{$set:this.dataList},
                },
            }));
        }
    };

    deleteHandle = (i) => {
        const deleteSplit = this.state.dimension.split[i];

        if(this.state.editSplit && deleteSplit && this.state.editSplit && deleteSplit.fieldId === this.state.editSplit.fieldId){
            this.editSplitId = null;
            this.setState(update(this.state,{
                editSplit:{$set:null},
                dimension:{
                    split:{
                        $splice:[[i,1]],
                    },
                },
            }));
        }else{
            this.setState(update(this.state,{dimension:{split:{
                $splice:[[i,1]],
            }}}));
        }
    };

    //添加自定义值
    handleAddCustomValue = () => {
        if(this.state.search.customValue){
            //判断是否存在相同的值
            const customFilter = this.state.customValue.filter(e=>(e.value[0] === this.state.search.customValue));
            if(customFilter.length === 0){
                const listFilter = this.state.listValue.filter(e=>(e.value[0] === this.state.search.customValue));
                if(listFilter.length > 0) {
                    message.warn("添加失败，该值已存在");
                    return
                }
            }else{
                message.warn("添加失败，该值已存在");
                return
            }

            const {search:{customValue}} = this.state,
            //如果是表达式，则赋值别名
            exp = this.state.ExpList.filter(e=>e===customValue),
            id = uuid();

            if(exp.length > 0){
                const name = exp.desc;
                this.setState(update(this.state,{
                    customValue:{
                        $push:[{value:[customValue],name,id}],
                    },
                    search:{
                        customValue:{$set:''},
                    },
                }));
            }else{
                this.setState(update(this.state,{
                    customValue:{
                        $push:[{value:[customValue],id}],
                    },
                    search:{
                        customValue:{$set:''},
                    },
                }));
            }

        }else{
            message.warn("添加失败，空值无法添加");
        }

    };

    handleListValueChange = (v,event) => {
        const checked = event.target.checked;
        if(checked){
            this.setState(update(this.state,{
                listValue:{
                    $push:[{value:[v + ''],id:uuid()}],
                },
            }));
        }else{
            let index = -1;
            this.state.listValue.forEach((e,i)=>{if(e.value[0] === (v + '') ) index = i});
            this.setState(update(this.state,{
                listValue:{
                    $splice:[[index,1]],
                },
            }));
        }
    };

    handleRemoveCustomValue = (index) => {
        this.setState(update(this.state,{
            customValue:{
                $splice:[[index,1]],
            },
        }));

    };

    checkAll = () => {
        if(!isArray(this.dataList) || this.dataList.length === 0) return;
        this.setState({
            listValue:this.dataList.map(e=>({value:[e+'']})),
        });
    };

    cancelCheckAll = () => {
        this.setState({
            listValue:[],
        });
    };

    reverseCheck = () => {
        if(!isArray(this.dataList) || this.dataList.length === 0) return;
        let newValue = [];
        this.dataList.forEach(e=>{
            const index = findIndex(this.state.listValue,data=>((data.value[0]) === e + ''));
            if(index === -1) {
                newValue.push({value:[e+'']});
            }
        });

        this.setState({
            listValue:newValue,
        });
    };

    customSearchValueChange = (value) => {
        // const value = event.target.value;
        this.setState(update(this.state,{
            search:{
                customValue:{$set:value},
            },
        }));
    };

    listSearchValueChange = (event) => {
        const value = event.target.value;
        this.setState(update(this.state,{
            search:{
                listValue:{$set:value},
            },
        }));
    };

    analysisGroupValue(splitDimension){

        let {values,groupFields} = splitDimension,all = false,dataList = this.state.group;

        // [{年:2018,月:12,日:10}]
        let listValue = [],customValue = [];

        if(isArray(values) && values.length > 0){
            if(values[0].value === '$ALL') {
                all = true
            }else{
                values.forEach(valueObj=>{
                    //valueObj:{
                    //          "name": "本月",
                    //         "value": [2017, 12]
                    //      }
                    const {value:filterValue,name} = valueObj,id = uuid();
                    let item = {};
                    if(isArray(filterValue)){
                        if(isArray(dataList) && dataList.length > 0){
                            let childrenData = dataList,inDataList = true;

                            //解析数据，分析是自定义值，还是数据列表中的值
                            /* 循环判断当前值是否存在子集，直到最后一位数存在子集中，则可以认为是数据列表中的值 */
                            for(let i = 0 ;i < filterValue.length;i++){
                                const v = filterValue[i];
                                if(i < filterValue.length -1){
                                    if(childrenData){
                                        childrenData = getChildren(childrenData,v);
                                    }else{
                                        //未查询到子集则不是数据列表中的值
                                        inDataList = false;
                                        break;
                                    }
                                }else{
                                    const index = findIndex(childrenData,e=>v==e);
                                    if(index === -1) inDataList = false;
                                }
                            }

                            if(inDataList){
                                //在数据列表中
                                listValue.push({value:filterValue.join('-'),id,name});
                            }else{
                                //自定义
                                filterValue.forEach((v,i)=>{
                                    const levelField = groupFields[i];
                                    item[levelField] = v;
                                    item.key = uuid();
                                });
                                //将自定义参数设置到数组
                                customValue.push({value:item,id,name});
                            }

                        }else{
                            //自定义值
                            filterValue.forEach((v,i)=>{
                                const levelField = groupFields[i];
                                item[levelField] = v;
                                item.key =  uuid();
                            });
                            //将自定义参数设置到数组
                            customValue.push({value:item,id,name});
                        }
                    }
                });
            }
        }

        return {listValue,customValue,all};

        //循坏数据树
        function getChildren(treeArr,value){
            let children = null;
            treeArr.forEach(e=>{
                if(e.value == value){
                    children = e.children;
                }
            });
            return children
        }
    }

    analysisValue(splitDimension){
        let {values:split} = splitDimension,all = false;
        let listValue = [],customValue = [];
        if(isArray(split) && split.length > 0){
            if(split[0] === '$ALL') {
                all = true
            }else{
                split.forEach(e => {
                    const index = findIndex(this.dataList,data=>((data + '') === e.value[0]));
                    //记录原始数据的排序
                    e.id = uuid() ;
                    if(index !== -1) {
                        //过滤值在数据中，则为数据列表中选择的数据
                        listValue.push(e);
                    }else{
                        //自定义过滤值
                        customValue.push(e);
                    }
                });
            }
        }
        return {listValue,customValue,all}
    }

    //数据中选择的过滤值
    getDataCheckBoxPanel(){
        const {search:{listValue:searchValue}} = this.state;
        let  filterData = this.dataList;
        if(searchValue && isArray(this.dataList) && this.dataList.length > 0){
            filterData = this.dataList.filter(e=>((e +'').indexOf(searchValue) !== -1));
        }
        // const filterData = this.getFilterData(this.dataList,this.state.search.listValue);

        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                <input disabled={this.state.all} className={this.state.all?styles.input_disabled:''}  placeholder="输入搜索文本" onChange={this.listSearchValueChange}/>
            </div>
            <Divider style={{margin:0}}/>
            <div className={styles.listValueContent}>
                {
                    isArray(filterData) && filterData.length > 0? filterData.filter(e=>(e!=='' &&e!=='#null')).map((e,i) => {
                        let defaultChecked = false;
                        const index = findIndex(this.state.listValue,data=>(data.value[0] === (e +'')));
                        if(index !== -1) defaultChecked = true;
                        return (<div  key={i} className={this.state.all?styles.listFilterItem_disabled:styles.listFilterItem}>
                            <Checkbox disabled={this.state.all} style={{width:'100%'}} onChange={this.handleListValueChange.bind(null,e)} checked={defaultChecked} >
                                <span className={styles.contentFontSize}>{e.length>50?(e.slice(0,50) + '...'):e}</span>
                            </Checkbox></div>)
                    }):<div className={styles.noneData}>没有数据</div>
                }
            </div>
            <div className={this.state.all?styles.listValueBottomToolBar_disabled:styles.listValueBottomToolBar}>
                <span onClick={this.state.all?null:this.checkAll}><Icon type="check-square" /> 全选选中</span>
                <span onClick={this.state.all?null:this.cancelCheckAll}><Icon type="close-square" /> 全选取消</span>
                <span onClick={this.state.all?null:this.reverseCheck}><Icon type="minus-square" /> 反选</span>
            </div>
        </div>)
    }

    //自定义拆分值
    getCustomDataPanel(){

        const filterData = this.getFilterData(this.state.customValue,this.state.search.customValue);

        const children = [];
        if(this.state.ExpList){
            this.state.ExpList.forEach(e=>{
                children.push(<Select.Option key={e.name}>{e.name} ({e.desc})</Select.Option>);
            });
        }

        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                {/*<input placeholder="输入要搜索或添加的文本" value={this.state.search.customValue}*/}
                       {/*onChange={this.customSearchValueChange}/>*/}

                <Select
                    mode="combobox"
                    className={styles.searchInput}
                    size='small'
                    style={{width:'100%',border:'0',padding:'2px 10px',backgroundColor:'#f4f9fb',lineHeight:'23px'}}
                    value={this.state.search.customValue}
                    onChange={this.customSearchValueChange}>
                    {children}
                </Select>
                <Button size="small" onClick={this.handleAddCustomValue} style={{margin:'2px 5px 0 0'}}>添加</Button>
                {/*{this.state.search.customValue && <Icon type="plus" onClick={this.handleAddCustomValue}/>}*/}

            </div>
            <Divider style={{margin:0}}/>
            <div className={styles.customValueContent}>
                {
                    isArray(filterData) && filterData.length > 0 ? filterData.map((e,i) =>{
                       let value = e.value.join('-') +'';

                       //如果是表达式，则加上说明
                       if(value.indexOf('$') !== -1){
                           let desc = '';
                           this.state.ExpList.forEach(e=>{
                               if(e.name === value){
                                   desc = e.desc;
                               }
                           });
                           if(desc) value  +=  ' - ' + desc ;
                       }

                       return ( <div key={value + i} className={styles.customFilterItem}>
                            <span className={styles.contentFontSize}>{value}</span>
                            <Icon type="delete" onClick={this.handleRemoveCustomValue.bind(null,i)}/>
                        </div>) })
                        :''
                }
            </div>
        </div>)
    }

    mergeCurrentSplitData(){
        const {editSplit} = this.state;
        let splitData ;
        // if(editSplit.groupName){
        //     if(this.state.activeKey === 'list'){
        //         //合并分组的情况
        //         splitData = this.state.listValue.map(({name,value,id})=>({name,id,value:value.split('-')})).filter(({value})=>{
        //             return value.length === editSplit.groupFields.length
        //         });
        //     }else{
        //         splitData = this.state.customValue.map(({value,name,id}) => {
        //             let result = [];
        //             editSplit.groupFields.forEach(field=>{
        //                 result.push(value[field]);
        //             });
        //             return {value:result,id,name};
        //         });
        //     }
        //     // splitData = listValue.concat(customValue);
        // }else{
        if(this.state.activeKey === 'list'){
            splitData = this.state.listValue
        }else{
            splitData = this.state.customValue
        }
            //非分组的情况
            // splitData = this.state.listValue.concat(this.state.customValue);
        // }
        return splitData
    };

    submitData = ()=>{
        if(this.props.onOK){
            let newDimension = this.state.dimension;
            if(newDimension){
                //1.将当前编辑的值保存到缓存
                if(this.editSplitId){
                    //缓存已经编辑的值
                    const {listValue,customValue,count,editSplit,all} = this.state;
                    if(!this.editDataCache[editSplit.fieldId]) this.editDataCache[editSplit.fieldId] = {};
                    this.editDataCache[editSplit.fieldId].listValue = listValue;
                    this.editDataCache[editSplit.fieldId].all = all;
                    this.editDataCache[editSplit.fieldId].customValue = customValue;
                    this.editDataCache[editSplit.fieldId].count = count;
                }
                //2.将缓存中的值合并提交
                if(this.editDataCache && isArray(newDimension.split) && newDimension.split.length > 0){
                    newDimension.split =  newDimension.split.map(e => {
                        const {fieldId,groupName} = e;
                        if(this.editDataCache.hasOwnProperty(fieldId)){
                            const cache = this.editDataCache[fieldId];
                            //合并缓存值
                            if(cache.all){
                                e.values = [{value:'$ALL',name:'全部数据'}]
                            }else{
                                if(groupName){
                                    //合并分组数值
                                    if(this.state.activeKey === 'list') {
                                        e.values = cache.listValue.map(({value,name})=>({name,value:value.split('-')})).filter(({value})=>{
                                            return value.length === e.groupFields.length
                                        });
                                    }else{
                                        e.values = cache.customValue.map(({value,name}) => {
                                            let result = [];
                                            e.groupFields.forEach(field=>{
                                                result.push(value[field]);
                                            });
                                            return {value:result,name};
                                        });
                                    }
                                    // e.values = listValue.concat(customValue);
                                }else{
                                    if(this.state.activeKey === 'list') {
                                        e.values = cache.listValue
                                    }else{
                                        e.values = cache.customValue
                                    }
                                    // e.values = cache.listValue.concat(cache.customValue);
                                    //还原原始数据排序
                                }
                                // e.values.sort((preItem,nextItem) => preItem.order - nextItem.order);
                                ({sort:e.sort} = cache);
                                //处理排序和别名
                                // if(!allModel(e.values) && e.sort !== undefined){
                                //     //非 $ALL 的情况
                                //     if(isString(e.sort)){
                                //         //首字母 升序 - 降序
                                //         if(e.sort === 'asc'){
                                //             //正序
                                //             e.values.sort((i,j)=>{if(i.value>j.value){return 1}else if(i.value === j.value){return 0}else{return -1}});
                                //         }else{
                                //             //反序
                                //             e.values.sort((i,j)=>{if(i.value>j.value){return -1}else if(i.value === j.value){return 0}else{return 1}});
                                //         }
                                //     }else if(isArray(e.sort)){
                                //         const newOrderArr = [];
                                //         // 自定义排序
                                //         e.sort.forEach(sortValue=>{
                                //             const index = findIndex(e.values,arcValue=>arcValue === sortValue);
                                //             newOrderArr.push(e.values.splice(index,1)[0]);
                                //         });
                                //
                                //         e.values = newOrderArr.concat(e.values);
                                //
                                //     }
                                // }
                            }
                        }

                        return e;
                    });
                }
            }
            //清空状态
            this.editDataCache = {};
            this.editSplitId = null;

            this.props.onOK(newDimension);
            // this.state.editSplit = null;
            this.setState({editSplit:null});
        }
    };

    handleDrop = async (monitor) => {

        // console.log("handleDrop",monitor);
        this.setState({loading:true});
        try{
            let newSplit = {};
            ({field:{alias:newSplit.alias,fieldId:newSplit.fieldId}} = monitor);
            if(monitor.groupName) {
                newSplit.groupName = monitor.groupName;
                newSplit.groupFields = monitor.groupFields.map(e=>e.alias);
            }

            const split = this.state.dimension.split || [] ;
            split.push(newSplit);

            //判断成员数据中是否存在该维度
            if(!this.state.data || !this.state.data.hasOwnProperty(newSplit.alias)){
                // let fetchOption = {...newSplit};

                //没有则获取成员数据
                let data = await DynamicSeriesEditorModal.fetchData({split:[newSplit]},this.props.dsInfo);
                if(!data) {
                    data = {};
                    message.warn("获取成员数据失败");
                }
                this.setState(update(this.state,{
                    data:{$merge:data},
                    dimension:{$merge:{split}},
                }));
            }else{
                this.setState(update(this.state,{
                    dimension:{$merge:{split}},
                }));
            }
        }catch (e){
            console.error(e);
        }finally {
            this.setState({loading:false});
        }

    };

    onCheckAll = (v) =>{
        if(v){
            this.setState({
                activeKey:'list',
                all:v,
                listValue:[],
                customValue:[],
                search:{
                    listValue:'',
                    customValue:'',
                },
            })
        }else{
            this.setState({all:v})
        }

    };

    handleOnConfig = (e) => {
        //开始设置  splitData  和 sort

        // 1.判断当前编辑数据项是否是和要设置的数据项一致
        // 2.不是当前编辑项，则判断编辑缓存是否存在 Sort，否则从Props中获取
        // 3.把缓存或对象的Sort设置到 状态中
        // 4.把成员数据设置到状态中

        let {values:splitData,sort,groupFields} = e,listValue,customValue;
        //设置 splitData
        if(this.editSplitId === e.fieldId){
            //合并编辑中的拆分成员
            // splitData = this.mergeCurrentSplitData();
            ({listValue,customValue} = this.state);

            if(this.state.activeKey === 'list'){
                //默认从列表中选值
                splitData = listValue
            }else{
                splitData = customValue
            }

        }else if(this.editDataCache[e.fieldId]){
           //获取缓存中的值
           const cache =  this.editDataCache[e.fieldId];
            ({listValue,customValue} = cache);
            if(cache.activeKey === 'list'){
                //默认从列表中选值
                splitData = listValue
            }else{
                splitData = customValue
            }
        }else{
            //没有在编辑状态 也没有在缓存中，则先保存进缓存再进缓存中获取
            this.editDataCache[e.fieldId] = {};
            if(e.groupName){
                //根据选择的拆分维度计算
                ({listValue,customValue} = this.analysisGroupValue(e))
            }else{
                //根据选择的拆分维度计算
                ({listValue,customValue} = this.analysisValue(e))
            }

            this.editDataCache[e.fieldId].listValue = listValue;
            this.editDataCache[e.fieldId].customValue = customValue;

            if(isArray(listValue) && listValue.length > 0){
                this.editDataCache[e.fieldId].activeKey = 'list';
                //默认从列表中选值
                splitData = listValue
            }else{
                this.editDataCache[e.fieldId].activeKey = 'custom';
                splitData = customValue
            }
        }

        //设置 Sort
        if(this.editDataCache[e.fieldId] && this.editDataCache[e.fieldId].sort){
            sort = this.editDataCache[e.fieldId].sort
        }

        //保存到State中
        this.setState(update(this.state,{
            setting:{
                showSettingModal:{$set:true},
                fieldId:{$set:e.fieldId},
                splitData:{$set:splitData},
                sort:{$set:sort},
                groupFields:{$set:groupFields},
            },
        }));
    };

    handleSettingSave = (sort,splitData) => {
        // 1. 关闭编辑窗口
        // 2. 保存 setting状态到缓存
        // 3. 清空 setting状态
        // 4. 解析splitData ，保存重命名的值，保存进缓存或修改当前编辑的值
        console.log(sort,splitData);

        //保存重命名的值进缓存或修改当前编辑的值
        if(this.state.setting.fieldId === this.editSplitId){
            if(this.state.activeKey === 'list'){
                this.setState(update(this.state,{listValue:{$set:splitData}}));
            }else{
                this.setState(update(this.state,{customValue:{$set:splitData}}));
            }
            if(!this.editDataCache[this.state.setting.fieldId]){
                this.editDataCache[this.state.setting.fieldId] = {};
            }
        }else{

            if(this.editDataCache[this.state.setting.fieldId].activeKey === 'list'){
                this.editDataCache[this.state.setting.fieldId].listValue = splitData;
            }else{
                this.editDataCache[this.state.setting.fieldId].customValue = splitData;
            }
        }
        //保存排序规则用于回显
        this.editDataCache[this.state.setting.fieldId].sort = sort ;

        this.setState({setting:{sort:null,fieldId:null,showSettingModal:false,splitData:null}})
    };

    getContent(){
        if(this.state.editSplit.groupName){
            return (<GroupDynamicEditor
                        all={this.state.all}
                        activeKey = {this.state.activeKey}
                        onActiveKeyChange={(v)=>this.setState({activeKey:v})}
                        listValue={this.state.listValue||[]}
                        customValue = {this.state.customValue||[]}
                        ExpList = {this.state.ExpList}
                        count={this.state.count}
                        dataList = {this.state.group.dataList}
                        dataMap = {this.state.group.dataMapping}
                        groupFields = {this.state.editSplit.groupFields}
                        onListValueChange = {(v)=>this.setState(update(this.state,{listValue:{$set:v}}))}
                        onCustomValueChange = {(v)=>this.setState(update(this.state,{customValue:{$set:v}}))}
                    />)
        }else{
            return (<Tabs activeKey={this.state.activeKey} onChange={(v)=>this.setState({activeKey:v})} tabBarStyle={{margin:0}}>
                <TabPane disabled={this.state.all} style={{padding:0}} tab={<Radio disabled={this.state.all} checked={this.state.activeKey === 'list'}>数据列表</Radio>} key="list">
                    {this.getDataCheckBoxPanel()}
                </TabPane>
                <TabPane disabled={this.state.all} tab={<Radio  disabled={this.state.all} checked={this.state.activeKey === 'custom'}>自定义</Radio>}  key="custom">
                    {this.getCustomDataPanel()}
                </TabPane>
            </Tabs>)
        }
    }

    render(){
        //空白页
        const blank = (<div className={styles._blank} >请选择拆分维度</div>);

        return (<Modal title = {'动态序列编辑 - ' + (this.state.dimension?this.state.dimension.alias:'')}
                       width = {900}
                       visible = {this.props.visible}
                       bodyStyle = {{padding:'0'}}
                       onOk = {this.submitData}
                       onCancel = {this.props.onCancel}
                       okText = "保存"
                       maskClosable = {false}
                       cancelText = "取消">
            <Spin spinning={this.state.loading}>
                <div className={styles.modalBodyWrap}>
                    {this.state.editSplit && <div className={styles.selectAll}>全部数据<Switch size="small" onChange={this.onCheckAll} checked={this.state.all} style={{marginBottom:'3px',marginLeft:'5px'}} /></div>}
                    <div className={styles.modalLeft}>
                        <SplitListContainer
                            editSplit = {this.state.editSplit}
                            accepts={[FieldsType.DIMENSION,FieldsType.LEVEL]}
                            onDelete = {this.deleteHandle}
                            onDrop = {this.handleDrop}
                            onClick = {this.handleClickSplitItem}
                            onConfig = {this.handleOnConfig}
                            dimension={this.state.dimension}/>
                        <Divider style={{margin:0}}/>
                        <h1 className={styles.modalTitle}>维度列表</h1>
                        <div className={styles.modalDimensionList}>
                            {this.props.cube && this.props.cube._id &&
                                <PivotSchema data = {this.props.cube} unMenu unDrop onlyDimension noTitle/>
                            }
                        </div>
                    </div>
                    <div className={styles.modalRight}>
                        {this.editSplitId && this.state.editSplit ?
                            this.getContent():
                            blank
                        }
                    </div>
                </div>
            </Spin>
            <MembersSort visible={this.state.setting.showSettingModal}
                         onCancel={()=>this.setState(update(this.state,{setting:{
                            showSettingModal:{$set:false},
                         }}))}
                         sort={this.state.setting.sort}
                         data = {this.state.setting.splitData}
                         groupFields = {this.state.setting.groupFields}
                         onSubmit={this.handleSettingSave}/>
            </Modal>)
    }
}