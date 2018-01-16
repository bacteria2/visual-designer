import cubeList from '../routes/DataSource/Cube/CubeList/demoData/cubeList.json'
import cubeCategory from '../routes/DataSource/Cube/CubeList/demoData/cubeCategory.json'
/**
 * 查询所有Cube
 * @returns {Promise}
 */
export async function queryCubeList(){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:cubeList})
        },500);
    })
}

/**
 * 添加Cube
 * @returns {Promise}
 */
export async function addCube(cube){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'添加成功'})
        },500);
    })
}

/**
 * 修改Cube
 * @returns {Promise}
 */
export async function updateCube(cube){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'修改成功'})
        },500);
    })
}

/**
 * 删除Cube
 * @returns {Promise}
 */
export async function deleteCubeById(cubeId){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'删除成功'})
        },500);
    })
}

/**
 * 根据ID查找Cube
 * @returns {Promise}
 */
export async function seleteCubeById(cubeId){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:cubeList.filter(e=>e.id===cubeId)[0]})
        },500);
    })
}

/**
 * 重命名Cube
 * @returns {Promise}
 */
export async function renameCubeById(cubeId,name){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'重命名成功'})
        },500);
    })
}

/**
 * 查询Cube分类
 * @returns {Promise}
 */
export async function queryCubeCategory(){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:cubeCategory})
        },500);
    })
}

/**
 * 添加Cube分类
 * @returns {Promise}
 */
export async function addCubeCategory(category){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:"添加成功"})
        },500);
    })
}

/**
 * 修改Cube分类
 * @returns {Promise}
 */
export async function updateCubeCategory(category){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:"修改成功"})
        },500);
    })
}

/**
 * 删除Cube分类
 * @returns {Promise}
 */
export async function deleteCubeCategory(categoryId){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:"修改成功"})
        },500);
    })
}

/**
 * 删除Cube分类
 * @returns {Promise}
 */
export async function queryCubesByCategory(categoryId){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            let data = cubeList.filter(e=>e.category.id === categoryId);
            resolve({success:true,data})
        },500);
    })
}


