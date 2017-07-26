/**
 * Created by lenovo on 2017/7/21.
 */
import createjs from 'createjs-cmd'

export function loadDependencies(dependency,renderClass,fun) {
  let queue = new createjs.LoadQueue();
   function handleComplete(event) {
     fun();
  }

  function handleError(event) {
    console.log('error',event)
  }

  queue.on("complete", handleComplete, this);
  queue.on("error", handleError, this);
  queue.loadManifest(dependency);
}
